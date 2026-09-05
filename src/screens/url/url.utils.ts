export const parseUrl = (value?: string): Map<string, string> => {
  const fragments: Map<string, string> = new Map();

  if (!value) {
    return fragments;
  }

  const url = tryParseUrl(value);
  if (!url) {
    return fragments;
  }

  fragments.set("host", url.host);
  fragments.set("protocol", url.protocol);
  fragments.set("hash", url.hash);
  fragments.set("origin", url.origin);
  fragments.set("pathname", url.pathname);
  fragments.set("port", url.port ? url.port : "<default>");
  fragments.set("search", url.search);

  return fragments;
};

export const parseUrlParams = (value?: string): Map<string, string> => {
  const params: Map<string, string> = new Map();

  if (!value) {
    return params;
  }

  const url = tryParseUrl(value);
  if (!url) {
    return params;
  }

  url.searchParams.forEach((paramValue, key) => params.set(key, paramValue));

  return params;
};

const tryParseUrl = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};
