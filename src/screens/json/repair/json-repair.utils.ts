import { isBlank } from "@lichens-innovation/ts-common";
import { jsonrepair } from "jsonrepair";

export const repairJson = (input: string): string => {
  if (isBlank(input)) {
    return "";
  }

  return jsonrepair(input);
};
