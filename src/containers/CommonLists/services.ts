import mimeTypesDatabase, {MimeEntry} from 'mime-db';
import {HtmlEntity} from '../../actions/html-entitie-actions';
import {HTML_ENTITIES} from './html-entities';

export const MIME_TYPES_MAP: Map<string, readonly string[]> = initMimeTypes();

function initMimeTypes() {
  const types: Map<string, readonly string[]> = new Map();

  for (const [key, value] of Object.entries(mimeTypesDatabase)) {
    types.set(key, value.extensions ?? []);
  }

  return types;
}

export function filterMimeTypes(filter: string | undefined): Map<string, readonly string[]> {
  if (!filter || filter.length === 0) {
    return MIME_TYPES_MAP;
  }

  const results = new Map<string, readonly string[]>();
  for (const [key, value] of Object.entries(mimeTypesDatabase)) {
    if (isMimeTypeMatchFilter(key, value, filter)) {
      results.set(key, value.extensions ?? []);
    }
  }

  return results;
}

function isMimeTypeMatchFilter(mimeTypeKey: string, mimeEntry: MimeEntry, filter: string): boolean {
  if (mimeTypeKey.includes(filter)) {
    return true;
  }

  const extensions: readonly string[] = mimeEntry.extensions ?? [];
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    if (extension.indexOf(filter) !== -1) {
      return true;
    }
  }

  return false;
}

export function filterHtmlEntities(filter: string | undefined): HtmlEntity[] {
  if (filter && filter.length > 0) {
    return HTML_ENTITIES.filter(htmlEntity => isHtmlEntityMatchFilter(htmlEntity, filter));
  } else {
    return HTML_ENTITIES;
  }
}

function isHtmlEntityMatchFilter(htmlEntity: HtmlEntity, filter: string) {
  if (htmlEntity.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
    return true;
  }

  if (htmlEntity.entityName.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
    return true;
  }

  if (htmlEntity.entityNumber.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
    return true;
  }

  return false;
}
