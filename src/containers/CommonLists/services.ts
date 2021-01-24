import mime from 'mime-types';

export function filterMimeTypes(filter: string | undefined): Map<string, string> {
    const entries: any[] = Object.entries(mime.extensions);

    if (filter) {
        const filteredEntries: any[] = entries
            .filter(mimeType => matchFilter(mimeType, filter));
        return new Map(filteredEntries);
    } else {
        return new Map(entries);
    }
}

function matchFilter(mimeType: string[], filter: string): boolean {
    if (mimeType[0].indexOf(filter) !== -1) {
        return true;
    }
    if (mimeType[1].indexOf(filter) !== -1) {
        return true;
    }

    return false;
}