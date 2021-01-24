import mime from 'mime-types';

export function filterMimeTypes(filter: string | undefined): Map<string, any> {
    const entries: any[] = Object.entries(mime.extensions);

    if (filter) {
        const filteredEntries: any[] = entries
            .filter((mimeType: string[]) => mimeType[0].indexOf(filter) !== -1);
        return new Map(filteredEntries);
    } else {
        return new Map(entries);
    }
}
