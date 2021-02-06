import mime from 'mime-types';
import { HtmlEntity, HTML_ENTITIES } from './html-entities';

const MIME_TYPES_ARRAY: any[] = Object.entries(mime.extensions);
const MIME_TYPES_MAP = new Map<string, string[]>(MIME_TYPES_ARRAY);

export function filterMimeTypes(filter: string | undefined): Map<string, string[]> {
    if (filter) {
        const filteredEntries: any[] = MIME_TYPES_ARRAY
            .filter(mimeType => isMimeTypeMatchFilter(mimeType, filter));
        return new Map(filteredEntries);
    } else {
        return MIME_TYPES_MAP;
    }
}

function isMimeTypeMatchFilter(mimeType: any[], filter: string): boolean {
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

export function htmlEntitiesTypes(filter: string | undefined): HtmlEntity[] {
    if (filter) {
        return HTML_ENTITIES
            .filter(htmlEntity => isHtmlEntityMatchFilter(htmlEntity, filter));
    } else {
        return [];
    }
}

function isHtmlEntityMatchFilter(htmlEntity: HtmlEntity, filter: string) {
    if (htmlEntity.description.indexOf(filter) !== -1) {
        return true;
    }

    if (htmlEntity.entityName.indexOf(filter) !== -1) {
        return true;
    }

    if (htmlEntity.entityNumber.indexOf(filter) !== -1) {
        return true;
    }

    return false;
}
