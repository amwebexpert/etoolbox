export const AVOID_PREFER_PREFIXES = ["❌ prefer", "✅ avoid"] as const;

// Query keys for TanStack Query cache (guidelines markdown)
export const GuidelinesQueryKey = {
  all: ["guidelines"] as const,
  markdown: (sourceUrls: string[]) => [...GuidelinesQueryKey.all, "markdown", sourceUrls] as const,
} as const;
