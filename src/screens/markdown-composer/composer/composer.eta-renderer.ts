import type { RenderTemplate } from "@lichens-innovation/react-markdown-composer";
import { Eta } from "eta";

const eta = new Eta({ autoEscape: false });

export const createEtaRenderer = (): RenderTemplate => {
  return ({ template, data }) => eta.renderString(template, data as object);
};
