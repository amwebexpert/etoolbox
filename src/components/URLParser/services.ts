export function parseUrl(value: string) {
    const parts: Map<string, string> = new Map();

    try {
        const newUrl = new URL(value);

        parts.set('host', newUrl.host);
        parts.set('protocol', newUrl.protocol);
        parts.set('hash', newUrl.hash);
        parts.set('origin', newUrl.origin);
        parts.set('pathname', newUrl.pathname);
        parts.set('port', newUrl.port ? newUrl.port : '<default>');
        parts.set('search', newUrl.search);

        const searchParams: URLSearchParams = newUrl.searchParams;
        searchParams.forEach((value, key) => {
            parts.set(`searchParam.${key}`, value);
        });

    } catch (e) {
        //  do nothing user may still be typing...
    }

    return parts;
}
