import { downloadBlob } from "@lichens-innovation/ts-common/web";
import { v4 as uuidv4 } from "uuid";

import { getOpfsRoot, readBlobFromOpfs, removeOpfsEntry, writeTextFileToOpfs } from "~/utils/opfs.utils";

interface ConvertWorkerResponse {
  pdfPath?: string;
  error?: string;
}

interface ExportMarkdownAsPdfArgs {
  markdown: string;
  fileName?: string;
}

const convertMarkdownInWorker = (mdFilename: string): Promise<string> =>
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

    worker.postMessage({ mdPath: mdFilename });
  });

export const exportMarkdownAsPdf = async ({
  markdown,
  fileName = "document.pdf",
}: ExportMarkdownAsPdfArgs): Promise<void> => {
  const root = await getOpfsRoot();
  const mdFilename = `markdown-pdf-export-${uuidv4()}.md`;

  await writeTextFileToOpfs({ root, path: mdFilename, text: markdown });
  const pdfFilename = await convertMarkdownInWorker(mdFilename);
  const blob = await readBlobFromOpfs({ root, path: pdfFilename, mimeType: "application/pdf" });

  await removeOpfsEntry({ root, path: mdFilename });
  await removeOpfsEntry({ root, path: pdfFilename });

  downloadBlob({ blob, fileName });
};
