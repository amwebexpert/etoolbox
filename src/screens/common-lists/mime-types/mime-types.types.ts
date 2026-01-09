export interface MimeTypeEntry {
  mimeType: string;
  extensions: readonly string[];
  category: string;
}

export type MimeTypeCategory = "all" | string;
