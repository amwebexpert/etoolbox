import type { GuidelineSource } from "./coding-standards.types";

export const AVOID_PREFER_PREFIXES = ["❌ prefer", "✅ avoid"] as const;

export const DEFAULT_GUIDELINE_SOURCES: GuidelineSource[] = [
  {
    id: "react-patterns",
    name: "React Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-react-patterns.md",
    enabled: true,
  },
  {
    id: "typescript-patterns",
    name: "TypeScript Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-coding-patterns.md",
    enabled: true,
  },
  {
    id: "testing-patterns",
    name: "Testing Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-unit-testing.md",
    enabled: true,
  },
  {
    id: "naming-patterns",
    name: "Naming Patterns",
    url: "https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-naming-patterns.md",
    enabled: true,
  },
];

// Query keys for TanStack Query cache (guidelines markdown)
export const GuidelinesQueryKey = {
  all: ["guidelines"] as const,
  markdown: (sourceUrls: string[]) => [...GuidelinesQueryKey.all, "markdown", sourceUrls] as const,
} as const;
