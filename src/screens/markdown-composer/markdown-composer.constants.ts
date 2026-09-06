import type { MarkdownComposerEngine } from "./markdown-composer.store";

export const TEMPLATE_EXAMPLES: Record<MarkdownComposerEngine, string> = {
  handlebars: `# Hello {{name}}

Welcome to the Markdown Composer.`,
  eta: `# Hello <%= it.name %>

Welcome to the Markdown Composer.`,
  liquidjs: `# Hello {{ name | capitalize }}

Welcome to the Markdown Composer.`,
};

export const getTemplateExample = (engine: MarkdownComposerEngine): string => TEMPLATE_EXAMPLES[engine];
