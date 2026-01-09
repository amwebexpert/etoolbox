import { isBlank } from "@lichens-innovation/ts-common";
import { jsonrepair } from "jsonrepair";

import { getResultMaxHeightPx, type ResponsiveContext } from "~/utils/responsive.utils";

export const repairJson = (input: string): string => {
  if (isBlank(input)) {
    return "";
  }

  return jsonrepair(input);
};

export const getResultMaxHeight = (ctx: ResponsiveContext): string => {
  return getResultMaxHeightPx(ctx);
};
