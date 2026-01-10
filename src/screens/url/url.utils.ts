/**
 * Parse a URL string into its component fragments.
 * @param value - The URL string to parse
 * @returns A Map containing URL components (host, protocol, hash, origin, pathname, port, search)
 */
export const parseUrl = (value?: string): Map<string, string> => {
  const fragments: Map<string, string> = new Map();

  if (!value) {
    return fragments;
  }

  try {
    const url = new URL(value);

    fragments.set("host", url.host);
    fragments.set("protocol", url.protocol);
    fragments.set("hash", url.hash);
    fragments.set("origin", url.origin);
    fragments.set("pathname", url.pathname);
    fragments.set("port", url.port ? url.port : "<default>");
    fragments.set("search", url.search);
  } catch {
    // Invalid URL, return empty fragments
  }

  return fragments;
};

/**
 * Parse URL query parameters into a Map.
 * @param value - The URL string to parse
 * @returns A Map of parameter names to values
 */
export const parseUrlParams = (value?: string): Map<string, string> => {
  const params: Map<string, string> = new Map();

  if (!value) {
    return params;
  }

  try {
    const url = new URL(value);
    const searchParams: URLSearchParams = url.searchParams;
    searchParams.forEach((paramValue, key) => params.set(key, paramValue));
  } catch {
    // Invalid URL, return empty params
  }

  return params;
};

/**
 * Build a query string from an object of key-value pairs.
 * @param params - Object with string key-value pairs
 * @returns Query string without the leading "?"
 */
export const buildQueryString = (params: Record<string, string>): string => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, value);
    }
  }
  return searchParams.toString();
};

/**
 * Check if a string is a valid URL.
 * @param value - The string to validate
 * @returns True if the string is a valid URL
 */
export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extract the domain from a URL string.
 * @param value - The URL string
 * @returns The hostname/domain, or empty string if invalid
 */
export const extractDomain = (value: string): string => {
  try {
    const url = new URL(value);
    return url.hostname;
  } catch {
    return "";
  }
};
