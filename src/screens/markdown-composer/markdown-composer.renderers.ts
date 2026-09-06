import { createHandlebarsRenderer, type RenderTemplate } from "@lichens-innovation/react-markdown-composer";

import { createEtaRenderer } from "./markdown-composer.eta-renderer";
import type { MarkdownComposerEngine } from "./markdown-composer.store";

const handlebarsRenderer = createHandlebarsRenderer();
const etaRenderer = createEtaRenderer();

const renderers: Record<MarkdownComposerEngine, RenderTemplate> = {
  handlebars: handlebarsRenderer,
  eta: etaRenderer,
};

export const getRenderTemplate = (engine: MarkdownComposerEngine): RenderTemplate => renderers[engine];
