import { createHandlebarsRenderer, type RenderTemplate } from "@lichens-innovation/react-markdown-composer";

import { createEtaRenderer } from "./markdown-composer.eta-renderer";
import { createLiquidjsRenderer } from "./markdown-composer.liquidjs-renderer";
import type { MarkdownComposerEngine } from "./markdown-composer.store";

const handlebarsRenderer = createHandlebarsRenderer();
const etaRenderer = createEtaRenderer();
const liquidjsRenderer = createLiquidjsRenderer();

const renderers: Record<MarkdownComposerEngine, RenderTemplate> = {
  handlebars: handlebarsRenderer,
  eta: etaRenderer,
  liquidjs: liquidjsRenderer,
};

export const getRenderTemplate = (engine: MarkdownComposerEngine): RenderTemplate => renderers[engine];
