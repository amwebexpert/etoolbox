// Types
export type SourceType = "json" | "jsObject";

export interface ConversionContext {
  source: string;
  sourceType: SourceType;
  targetLanguage: string;
  rootClassName: string;
}

// Constants
export const DEFAULT_ROOT_CLASS_NAME = "RootClass";
export const DEFAULT_SOURCE_TEXT = '{ "firstName": "Chuck", "lastName": "Norris" }';
export const DEFAULT_SOURCE_TYPE: SourceType = "json";
export const DEFAULT_TARGET_LANGUAGE = "typescript";

// Language mapping: [key, display name]
export const LANGUAGES: Map<string, string> = new Map([
  ["csharp", "C#"],
  ["cpp", "C++"],
  ["dart", "Dart"],
  ["elm", "Elm"],
  ["flow", "Flow"],
  ["go", "Go"],
  ["haskell", "Haskell"],
  ["java", "Java"],
  ["javascript", "Javascript object"],
  ["json-schema", "JSON Schema"],
  ["kotlin", "Kotlin"],
  ["objectivec", "Objective C"],
  ["pike", "Pike"],
  ["python", "Python"],
  ["rust", "Rust"],
  ["swift", "Swift"],
  ["typescript", "TypeScript"],
  ["json", "JSON"],
]);

export const TARGET_LANGUAGES = [...LANGUAGES.entries()];

export const SYNTAX_HIGHLIGHTER_LANGUAGE_MAP: Record<string, string> = {
  csharp: "csharp",
  cpp: "cpp",
  dart: "dart",
  elm: "elm",
  flow: "javascript",
  go: "go",
  haskell: "haskell",
  java: "java",
  javascript: "javascript",
  "json-schema": "json",
  kotlin: "kotlin",
  objectivec: "objectivec",
  pike: "cpp",
  python: "python",
  rust: "rust",
  swift: "swift",
  typescript: "typescript",
  json: "json",
};
