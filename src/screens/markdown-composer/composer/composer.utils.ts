import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
export interface JsonDataParseResult {
  data?: unknown;
  errorMessage?: string;
}

export const parseJsonDataText = (text: string): JsonDataParseResult => {
  if (isBlank(text)) {
    return { data: undefined };
  }

  try {
    return { data: JSON.parse(text) as unknown };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
