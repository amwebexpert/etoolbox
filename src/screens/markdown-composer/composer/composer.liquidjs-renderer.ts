import type { RenderTemplate } from "@lichens-innovation/react-markdown-composer";
import { Liquid } from "liquidjs";

const liquid = new Liquid();

export const createLiquidjsRenderer = (): RenderTemplate => {
  return ({ template, data }) => liquid.parseAndRender(template, data as object);
};
