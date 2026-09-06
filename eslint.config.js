import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import codingGuide, { configs as codingGuideConfigs } from "@lichens-innovation/eslint-plugin-coding-guide";
import { globalIgnores } from "eslint/config";

const testFiles = ["**/__tests__/**", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"];
const unitTestFiles = ["src/**/__tests__/**", "src/**/*.test.{ts,tsx}"];

export default tseslint.config(
  globalIgnores(["dist", "docs/**", "src/api/generated/**", ".yarn/**"]),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Tooling scripts live outside tsconfig.app.json's "src" include, so they can't use
  // type-aware linting (projectService). Keep them on plain recommended + node globals.
  {
    files: ["ai-orchestrator/**/*.ts", ".claude/hooks/**/*.ts", "scripts/**/*.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000"], ["^@?\\w"], ["^~"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "testing-library": testingLibrary,
      sonarjs,
      unicorn,
      "coding-guide": codingGuide,
    },
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    settings: {
      // eslint-plugin-react@7.37.5's "detect" path crashes under ESLint 10 flat config
      // (TypeError: contextOrFilename.getFilename is not a function) on a JSXFragment node —
      // pin explicitly to sidestep that code path (see patches/eslint-plugin-react+7.37.5.patch).
      react: { version: "19.2.7" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "prefer-const": "error",
      "no-var": "error",
      "no-duplicate-imports": "error",
      "no-warning-comments": ["warn", { terms: ["fixme", "xxx", "hack"], location: "anywhere" }],
      "no-console": "error",
      eqeqeq: ["error", "always"],
      "no-nested-ternary": "error",
      "no-empty": ["error", { allowEmptyCatch: false }],
      "no-useless-catch": "error",
      "max-depth": ["error", 2],
      complexity: ["error", 15],
      "sonarjs/cognitive-complexity": ["error", 15],
      ...codingGuideConfigs.recommended.rules,
      "@typescript-eslint/max-params": ["error", { max: 2 }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
      "react/no-array-index-key": "error",
      "react/jsx-fragments": ["error", "syntax"],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "func-style": ["error", "expression"],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lodash",
              message:
                "Use a named import from 'lodash-es' instead (tree-shakeable), e.g. import { groupBy } from 'lodash-es'.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            ":matches(MemberExpression[object.type='MetaProperty'][property.name='env'], MemberExpression[object.object.type='MetaProperty'][object.property.name='env'])",
          message:
            "Don't read import.meta.env directly — add a validated getter in src/utils/environment.utils.ts and import that instead.",
        },
      ],
      "react/destructuring-assignment": ["error", "always"],
      "react/jsx-curly-brace-presence": "error",
      // coding-guide/prefer-jsx-short-circuit@1.0.3 misfires on `{cond && "text"}` — it flags the
      // plain-string *render content* on the right of && as needing `!!()` too, and its autofix
      // wraps the string in `!!(...)`, turning it into the literal `true` (so React renders
      // nothing instead of the label). Disabled in favor of the standard, narrower rule below.
      "coding-guide/prefer-jsx-short-circuit": "off",
      "react/jsx-no-leaked-render": "error",
      "no-eval": "error",
      "no-new-func": "error",
      "react/no-danger": "error",
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
    },
  },
  {
    files: ["src/utils/environment.utils.ts"],
    rules: { "no-restricted-syntax": "off" },
  },
  {
    // Node.js `util` polyfill — signatures must match the real util.inherits(ctor, superCtor)
    // / util.isDeepStrictEqual(a, b) API consumed positionally by stream-browserify and friends.
    files: ["src/stubs/util.ts"],
    rules: { "coding-guide/max-params-project": "off", "@typescript-eslint/max-params": "off" },
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "max-lines": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: unitTestFiles,
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      "testing-library/prefer-screen-queries": "error",
    },
  },
  {
    files: testFiles,
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
    },
  },
  {
    files: ["src/**/*.ts"],
    ignores: testFiles,
    rules: {
      "max-lines": ["error", { max: 400, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["error", { max: 90, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    // Pure data tables, not logic — splitting them for line-count adds no value.
    files: ["src/**/*.constants.ts", "src/screens/colors/named/named-colors.utils.ts"],
    rules: { "max-lines": "off", "max-lines-per-function": "off" },
  },
  {
    // ~45 repetitive createRoute() declarations — data, not logic.
    files: ["src/routes/router.tsx"],
    rules: { "max-lines": "off" },
  },
);
