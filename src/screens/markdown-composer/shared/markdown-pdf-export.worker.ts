import init, { convert } from "@amwebexpert/md2pdf-wasm";

interface ConvertRequest {
  mdPath: string;
}

interface ConvertResponse {
  pdfPath?: string;
  error?: string;
}

let wasmReady = false;

const ensureWasmReady = async (): Promise<void> => {
  if (wasmReady) return;
  await init();
  wasmReady = true;
};

self.onmessage = async (event: MessageEvent<ConvertRequest>) => {
  const { mdPath } = event.data;

  try {
    await ensureWasmReady();
    const pdfPath = await convert(mdPath);
    self.postMessage({ pdfPath } satisfies ConvertResponse);
  } catch (error) {
    self.postMessage({ error: String(error) } satisfies ConvertResponse);
  }
};
