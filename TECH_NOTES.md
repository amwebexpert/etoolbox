- [Technical notes](#technical-notes)
  - [Open Source LLM vs Claude CLI](#open-source-llm-vs-claude-cli)
    - [CLI Integration](#cli-integration)
    - [VS Code / Cursor integration](#vs-code--cursor-integration)

# Technical notes

Additional technical documentation for this project will be collected here.

## Open Source LLM vs Claude CLI

**Prerequisites (LM Studio):** Install [LM Studio](https://lmstudio.ai/), download a model you want to use, **load it in the app**, and **start the local server** (with that model active) before you run the Claude CLI or the VS Code / Cursor integration. The Anthropic-compatible endpoint only answers requests once the server is running and a model is loaded; the `--model` value (or extension model choice) must match the identifier LM Studio exposes for that loaded model.

To run the [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI against that **local** stack, set environment variables so the client talks to `localhost` instead of Anthropic’s cloud, then pass the model id your server serves. Other local proxies that implement the same API can be used instead of LM Studio, but you still need a running server and a loaded model behind whatever port you set in `ANTHROPIC_BASE_URL`.

### CLI Integration

Example:

```bash
ANTHROPIC_BASE_URL=http://localhost:1234 ANTHROPIC_AUTH_TOKEN=lmstudio CLAUDE_CODE_EFFORT_LEVEL=high claude --model qwen/qwen3.5-9b
```

| Piece                                      | Role                                                                                                                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_BASE_URL=http://localhost:1234` | Base URL for API requests. `1234` is the port where your local server listens (change it if yours differs). The CLI/SDK uses this instead of the default Anthropic endpoint. |
| `ANTHROPIC_AUTH_TOKEN=lmstudio`            | Value sent as the API key header. Local proxies often accept any non-empty string; `lmstudio` is a common placeholder when there is no real secret.                          |
| `CLAUDE_CODE_EFFORT_LEVEL=high`            | Claude Code–specific hint for agent “effort” / thoroughness (when the tool honors this variable).                                                                            |
| `claude`                                   | The Claude Code command-line entrypoint.                                                                                                                                     |
| `--model qwen/qwen3.5-9b`                  | Model identifier passed to the API. It must match a model your local stack actually serves (e.g. the id LM Studio shows for the loaded Qwen 3.5 9B variant).                 |

**Note:** Compatibility depends on your local server faithfully implementing the endpoints and behavior Claude Code expects; open-weights models may not match cloud Claude’s capabilities or tool use.

### VS Code / Cursor integration

The [Claude Code](https://marketplace.visualstudio.com/items?itemName=Anthropic.claude-code) extension can pick up environment variables from your editor **User** or **Workspace** `settings.json`, so Claude Code launched from the IDE (chat, commands, tasks) uses the same local endpoint without you prefixing every shell invocation.

Use the `claudeCode.environmentVariables` array: each entry is an object with `name` and `value`, equivalent to exporting those variables for the integration’s process.

Example (adjust host/port and model choice to match your setup; model selection may still be done in the extension or CLI):

```jsonc
"claudeCode.environmentVariables": [
  {
    "name": "ANTHROPIC_BASE_URL",
    "value": "http://localhost:1234"
  },
  {
    "name": "ANTHROPIC_AUTH_TOKEN",
    "value": "lmstudio"
  },
  {
    "name": "CLAUDE_CODE_EFFORT_LEVEL",
    "value": "high"
  }
]
```

In **Cursor**, this lives in the user settings file under `Application Support/Cursor/User/settings.json` (same shape as VS Code’s `settings.json`). Workspace-level `.vscode/settings.json` can override or add entries for a single repo.
