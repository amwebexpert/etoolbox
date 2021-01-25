import mime from 'mime-types';

const MIME_TYPES_ARRAY: any[] = Object.entries(mime.extensions);
const MIME_TYPES_MAP = new Map<string, string[]>(MIME_TYPES_ARRAY);

export function filterMimeTypes(filter: string | undefined): Map<string, string[]> {
    if (filter) {
        const filteredEntries: any[] = MIME_TYPES_ARRAY
            .filter(mimeType => matchFilter(mimeType, filter));
        return new Map(filteredEntries);
    } else {
        return MIME_TYPES_MAP;
    }
}

function matchFilter(mimeType: any[], filter: string): boolean {
    if (mimeType[0].indexOf(filter) !== -1) {
        return true;
    }

    const extensions: string[] = mimeType[1];
    for (let i = 0; i < extensions.length; i++) {
        const extension = extensions[i];
        if (extension.indexOf(filter) !== -1) {
            return true;
        }
    }

    return false;
}