import prettyBytes from "pretty-bytes";

import { downloadBlob } from "~/utils/download.utils";
import { base64ToBlob, getBase64ApproxSize } from "~/utils/encoding.utils";
import { readFileAsBase64 as readFileAsBase64Util, type Base64FileResult } from "~/utils/file-reader.utils";

export type { Base64FileResult };

interface DownloadBase64AsFileArgs {
  base64: string;
  mimeType: string;
  fileName: string;
}

export const downloadBase64AsFile = ({ base64, mimeType, fileName }: DownloadBase64AsFileArgs): void => {
  const blob = base64ToBlob({ base64, mimeType });
  downloadBlob({ blob, fileName });
};

export const formatBase64Size = (base64: string): string => {
  return prettyBytes(getBase64ApproxSize(base64));
};

export const readFileAsBase64 = readFileAsBase64Util;
