import { getBase64ApproxSize } from "@lichens-innovation/ts-common";
import {
  type Base64FileResult,
  base64ToBlob,
  downloadBlob,
  readFileAsBase64 as readFileAsBase64Util,
} from "@lichens-innovation/ts-common/web";
import prettyBytes from "pretty-bytes";

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
