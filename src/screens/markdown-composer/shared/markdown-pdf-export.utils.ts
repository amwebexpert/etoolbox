import { downloadBlob } from "@lichens-innovation/ts-common/web";

const MARKDOWN_OPFS_PATH = "document.md";

interface ConvertWorkerResponse {
  pdfPath?: string;
  error?: string;
}

interface WriteMarkdownToOpfsArgs {
  root: FileSystemDirectoryHandle;
  path: string;
  content: string;
}

interface ReadPdfBlobFromOpfsArgs {
  root: FileSystemDirectoryHandle;
  pdfPath: string;
}

interface RemoveOpfsEntryArgs {
  root: FileSystemDirectoryHandle;
  path: string;
}

interface ExportMarkdownAsPdfArgs {
  markdown: string;
  fileName?: string;
}

const getOpfsRoot = async (): Promise<FileSystemDirectoryHandle> => {
  if (!navigator.storage?.getDirectory) {
    throw new Error("PDF export requires a browser with Origin Private File System support.");
  }
  return navigator.storage.getDirectory();
};

const writeMarkdownToOpfs = async ({ root, path, content }: WriteMarkdownToOpfsArgs): Promise<void> => {
  const fileHandle = await root.getFileHandle(path, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

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

const readPdfBlobFromOpfs = async ({ root, pdfPath }: ReadPdfBlobFromOpfsArgs): Promise<Blob> => {
  const fileHandle = await root.getFileHandle(pdfPath);
  const file = await fileHandle.getFile();
  return new Blob([await file.arrayBuffer()], { type: "application/pdf" });
};

const removeOpfsEntry = async ({ root, path }: RemoveOpfsEntryArgs): Promise<void> => {
  await root.removeEntry(path).catch(() => undefined);
};

export const exportMarkdownAsPdf = async ({
  markdown,
  fileName = "document.pdf",
}: ExportMarkdownAsPdfArgs): Promise<void> => {
  const root = await getOpfsRoot();

  await writeMarkdownToOpfs({ root, path: MARKDOWN_OPFS_PATH, content: markdown });
  const pdfPath = await convertMarkdownInWorker(MARKDOWN_OPFS_PATH);
  const blob = await readPdfBlobFromOpfs({ root, pdfPath });

  await removeOpfsEntry({ root, path: MARKDOWN_OPFS_PATH });
  await removeOpfsEntry({ root, path: pdfPath });

  downloadBlob({ blob, fileName });
};
