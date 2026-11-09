export interface PdfToMarkdownOptions {
  firstPage?: number | null;
  lastPage?: number | null;
  keepHeaders: boolean;
}

export interface PdfToMarkdownRequest extends PdfToMarkdownOptions {
  pdf: ArrayBuffer;
}

export interface PdfToMarkdownResult {
  markdown: string;
  pageCount: number;
  warnings: string[];
}

export interface PdfToMarkdownResponse {
  result?: PdfToMarkdownResult;
  error?: string;
}
