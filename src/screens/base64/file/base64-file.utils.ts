import { getBase64ApproxSize } from "@lichens-innovation/ts-common";
import {
  base64ToBlob,
  readFileAsBase64 as readFileAsBase64Util,
  type SaveBlobResult,
  saveBlobWithPicker,
} from "@lichens-innovation/ts-common/web";
import prettyBytes from "pretty-bytes";

interface SaveBase64AsFileArgs {
  base64: string;
  mimeType: string;
  fileName: string;
}

export const saveBase64AsFile = ({
  base64,
  mimeType,
  fileName,
}: SaveBase64AsFileArgs): Promise<SaveBlobResult | null> => {
  const blob = base64ToBlob({ base64, mimeType });
  return saveBlobWithPicker({ blob, fileName });
};

export const formatBase64Size = (base64: string): string => {
  return prettyBytes(getBase64ApproxSize(base64));
};

export const readFileAsBase64 = readFileAsBase64Util;
