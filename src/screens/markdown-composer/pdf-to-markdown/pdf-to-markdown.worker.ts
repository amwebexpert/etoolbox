import init, { pdfToMarkdown } from "@amwebexpert/md2pdf-wasm";

import type { PdfToMarkdownRequest, PdfToMarkdownResponse } from "./pdf-to-markdown.types";

let wasmReady = false;

const ensureWasmReady = async (): Promise<void> => {
  if (wasmReady) return;
  await init();
  wasmReady = true;
};

self.onmessage = async (event: MessageEvent<PdfToMarkdownRequest>) => {
  const { pdf, firstPage, lastPage, keepHeaders } = event.data;

  try {
    await ensureWasmReady();
    const result = pdfToMarkdown(new Uint8Array(pdf), firstPage, lastPage, keepHeaders);
    const { markdown, pageCount, warnings } = result;
    result.free();
    self.postMessage({ result: { markdown, pageCount, warnings } } satisfies PdfToMarkdownResponse);
  } catch (error) {
    self.postMessage({ error: String(error) } satisfies PdfToMarkdownResponse);
  }
};
