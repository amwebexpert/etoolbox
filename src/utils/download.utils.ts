import { mimeToExt, parseDataUri } from "@lichens-innovation/ts-common/mime";

interface DownloadBlobArgs {
  blob: Blob;
  fileName: string;
}

export const downloadBlob = ({ blob, fileName }: DownloadBlobArgs): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface DownloadDataUrlArgs {
  dataUrl: string;
  fileName: string;
}

export const downloadDataUrl = ({ dataUrl, fileName }: DownloadDataUrlArgs): void => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface DownloadTextArgs {
  content: string;
  fileName: string;
  mimeType?: string;
}

export const downloadText = ({ content, fileName, mimeType = "text/plain" }: DownloadTextArgs): void => {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob({ blob, fileName });
};

interface DownloadJsonArgs {
  content: string;
  fileName?: string;
}

export const downloadJson = ({ content, fileName = "data.json" }: DownloadJsonArgs): void => {
  downloadText({ content, fileName, mimeType: "application/json" });
};

export const getExtensionFromDataUrl = (dataUrl: string): string => {
  const parsed = parseDataUri(dataUrl);
  if (!parsed) return "bin";

  return mimeToExt(parsed.mimeType);
};
