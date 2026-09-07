import { createHandlebarsRenderer, type RenderTemplate } from "@lichens-innovation/react-markdown-composer";

import { createEtaRenderer } from "./composer.eta-renderer";
import { createLiquidjsRenderer } from "./composer.liquidjs-renderer";
import type { MarkdownComposerEngine } from "./composer.store";

const handlebarsRenderer = createHandlebarsRenderer();
const etaRenderer = createEtaRenderer();
const liquidjsRenderer = createLiquidjsRenderer();

const renderers: Record<MarkdownComposerEngine, RenderTemplate> = {
  handlebars: handlebarsRenderer,
  eta: etaRenderer,
  liquidjs: liquidjsRenderer,
};

export const getRenderTemplate = (engine: MarkdownComposerEngine): RenderTemplate => renderers[engine];
