import { isBlank } from "@lichens-innovation/ts-common";

import type {
  PdfToMarkdownOptions,
  PdfToMarkdownRequest,
  PdfToMarkdownResponse,
  PdfToMarkdownResult,
} from "./pdf-to-markdown.types";

interface ConvertPdfToMarkdownArgs extends PdfToMarkdownOptions {
  file: Blob;
}

export const convertPdfToMarkdown = async ({
  file,
  ...options
}: ConvertPdfToMarkdownArgs): Promise<PdfToMarkdownResult> => {
  const pdf = await file.arrayBuffer();

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./pdf-to-markdown.worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (event: MessageEvent<PdfToMarkdownResponse>) => {
      worker.terminate();
      const { result, error } = event.data;
      if (result) {
        resolve(result);
        return;
      }
      reject(new Error(isBlank(error) ? "PDF conversion returned no result" : error));
    };

    worker.onerror = (event) => {
      worker.terminate();
      reject(new Error(event.message));
    };

    worker.postMessage({ pdf, ...options } satisfies PdfToMarkdownRequest, [pdf]);
  });
};

export const toMarkdownFileName = (pdfFileName: string): string => {
  const baseName = pdfFileName.replace(/\.pdf$/i, "");
  return `${isBlank(baseName) ? "document" : baseName}.md`;
};
