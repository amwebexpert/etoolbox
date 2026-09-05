import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
import { getExtensionFromDataUri } from "@lichens-innovation/ts-common/mime";
import { downloadDataUrl } from "@lichens-innovation/ts-common/web";
import QRCode from "qrcode";

import type { GenerateQRCodeContext, QRCodeOptions } from "./qrcode-generator.types";

export const generateQRCode = async ({ text, options }: GenerateQRCodeContext): Promise<string> => {
  if (isBlank(text)) {
    throw new Error("Text content is required to generate a QR code");
  }

  try {
    const dataUrl = await QRCode.toDataURL(text, options);
    return dataUrl;
  } catch (e: unknown) {
    throw new Error(`Failed to generate QR code: ${getErrorMessage(e)}`, { cause: e });
  }
};

export const generateImgTag = (dataUrl: string): string => {
  return `<img alt="QR Code" src="${dataUrl}"/>`;
};

interface DownloadQRCodeArgs {
  dataUrl: string;
  filename?: string;
}

export const downloadQRCode = ({ dataUrl, filename = "qrcode" }: DownloadQRCodeArgs): void => {
  const extension = getExtensionFromDataUri(dataUrl);
  downloadDataUrl({ dataUrl, fileName: `${filename}.${extension}` });
};

interface GetCapacityInfoArgs {
  errorCorrectionLevel: QRCodeOptions["errorCorrectionLevel"];
}

interface CapacityInfo {
  numeric: number;
  alphanumeric: number;
  bytes: number;
}

export const getCapacityInfo = ({ errorCorrectionLevel }: GetCapacityInfoArgs): CapacityInfo => {
  const capacities: Record<QRCodeOptions["errorCorrectionLevel"], CapacityInfo> = {
    L: { numeric: 7089, alphanumeric: 4296, bytes: 2953 },
    M: { numeric: 5596, alphanumeric: 3391, bytes: 2331 },
    Q: { numeric: 3993, alphanumeric: 2420, bytes: 1663 },
    H: { numeric: 3057, alphanumeric: 1852, bytes: 1273 },
  };

  return capacities[errorCorrectionLevel];
};
