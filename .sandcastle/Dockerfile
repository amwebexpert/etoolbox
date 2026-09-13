FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  jq \
  unzip \
  && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get update && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

# Build-args for UID/GID alignment: sandcastle docker build-image
# defaults these to the host user's UID/GID so image-built files
# and bind-mounted files share an owner without runtime chown.
ARG AGENT_UID=1000
ARG AGENT_GID=1000

# Rename the base image's "node" user to "agent" and align UID/GID.
RUN groupmod -o -g $AGENT_GID node && usermod -o -u $AGENT_UID -g $AGENT_GID -d /home/agent -m -l agent node
USER ${AGENT_UID}:${AGENT_GID}

# Install Claude Code CLI
RUN curl -fsSL https://claude.ai/install.sh | bash

# Install Bun (pinned to packageManager / CI version)
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.4.2"

# Install uv (required for habit-hooks)
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Claude, Bun, and uv tool shims (habit-hooks) must be on PATH for non-login shells
# (git hooks run via sh and do not source .bashrc).
ENV PATH="/home/agent/.bun/bin:/home/agent/.local/bin:$PATH"

# Pre-install habit-hooks so Husky pre-commit works before the first bun install
RUN uv tool install "habit-hooks[typescript]"

# Sanity check: bun, bunx, uv, and habit-hooks are available
RUN bun --version && bunx --version && uv --version && command -v habit-hooks

WORKDIR /home/agent

# In worktree sandbox mode, Sandcastle bind-mounts the git worktree at /home/agent/workspace
# and overrides the working directory to /home/agent/workspace at container start.
# Structure your Dockerfile so that /home/agent/workspace can serve as the project root.
ENTRYPOINT ["sleep", "infinity"]
