export interface JsonDataParseResult {
  data?: unknown;
  errorMessage?: string;
}

export const parseJsonDataText = (text: string): JsonDataParseResult => {
  if (text.trim() === "") {
    return { data: undefined };
  }

  try {
    return { data: JSON.parse(text) as unknown };
  } catch (error) {
    return { errorMessage: error instanceof Error ? error.message : String(error) };
  }
};
