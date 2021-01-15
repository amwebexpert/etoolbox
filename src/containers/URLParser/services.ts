export function parseUrl(value?: string): Map<string, string> {
    const fragments: Map<string, string> = new Map();

    if (!value) {
        return fragments;
    }

    try {
        const url = new URL(value);

        fragments.set('host', url.host);
        fragments.set('protocol', url.protocol);
        fragments.set('hash', url.hash);
        fragments.set('origin', url.origin);
        fragments.set('pathname', url.pathname);
        fragments.set('port', url.port ? url.port : '<default>');
        fragments.set('search', url.search);
    } catch (e) {
        //  do nothing user may still be typing...
    }

    return fragments;
}

export function parseUrlParams(value?: string): Map<string, string> {
    const params: Map<string, string> = new Map();

    if (!value) {
        return params;
    }

    try {
        const url = new URL(value);
        const searchParams: URLSearchParams = url.searchParams;
        searchParams.forEach((value, key) => params.set(key, value));
    } catch (e) {
        //  do nothing user may still be typing...
    }

    return params;
}
