import { downloadBlob } from "@lichens-innovation/ts-common/web";

import { getOpfsRoot, readBlobFromOpfs, removeOpfsEntry, writeTextFileToOpfs } from "~/utils/opfs.utils";

const MARKDOWN_OPFS_PATH = "document.md";

interface ConvertWorkerResponse {
  pdfPath?: string;
  error?: string;
}

interface ExportMarkdownAsPdfArgs {
  markdown: string;
  fileName?: string;
}

const convertMarkdownInWorker = (mdPath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./markdown-pdf-export.worker.ts", import.meta.url), { type: "module" });

    worker.onmessage = (event: MessageEvent<ConvertWorkerResponse>) => {
      worker.terminate();
      if (event.data.error) {
        reject(new Error(event.data.error));
        return;
      }
      resolve(event.data.pdfPath as string);
    };

    worker.onerror = (event) => {
      worker.terminate();
      reject(new Error(event.message));
    };

    worker.postMessage({ mdPath });
  });

export const exportMarkdownAsPdf = async ({
  markdown,
  fileName = "document.pdf",
}: ExportMarkdownAsPdfArgs): Promise<void> => {
  const root = await getOpfsRoot();

  await writeTextFileToOpfs({ root, path: MARKDOWN_OPFS_PATH, text: markdown });
  const pdfPath = await convertMarkdownInWorker(MARKDOWN_OPFS_PATH);
  const blob = await readBlobFromOpfs({ root, path: pdfPath, mimeType: "application/pdf" });

  await removeOpfsEntry({ root, path: MARKDOWN_OPFS_PATH });
  await removeOpfsEntry({ root, path: pdfPath });

  downloadBlob({ blob, fileName });
};
