export const safeJsonParse = <T>(value: string, fallback?: T): T | undefined => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const safeJsonStringify = (obj: unknown, space: number = 2): string => {
  if (!obj) return "";
  try {
    return JSON.stringify(obj, null, space);
  } catch {
    return "";
  }
};

export const sortObjectKeys = (_key: string, value: unknown): unknown =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value as Record<string, unknown>)
        .sort()
        .reduce(
          (sorted, key) => {
            sorted[key] = (value as Record<string, unknown>)[key];
            return sorted;
          },
          {} as Record<string, unknown>,
        )
    : value;

interface FormatJsonArgs {
  value?: string;
  space?: number;
  sortKeys?: boolean;
}

export const formatJson = ({ value, space = 2, sortKeys = false }: FormatJsonArgs): string => {
  if (!value) return "";

  try {
    const obj: unknown = JSON.parse(value);
    return JSON.stringify(obj, sortKeys ? sortObjectKeys : undefined, space);
  } catch {
    return value;
  }
};

export const prettifyJson = (value?: string): string => {
  return formatJson({ value, space: 4, sortKeys: true });
};

export const minifyJson = (value?: string): string => {
  return formatJson({ value, space: 0, sortKeys: true });
};

export const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const isMinifiedJson = (value: string): boolean => {
  return value === minifyJson(value);
};
