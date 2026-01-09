import { getErrorMessage, isBlank, isNullish } from "@lichens-innovation/ts-common";
import QRCode from "qrcode";

import { downloadDataUrl, getExtensionFromDataUrl } from "~/utils/download.utils";
import { safeJsonParse, safeJsonStringify } from "~/utils/json.utils";

import type { GenerateQRCodeContext, QRCodeOptions } from "./qrcode-generator.types";

export const generateQRCode = async ({ text, options }: GenerateQRCodeContext): Promise<string> => {
  if (isBlank(text)) {
    throw new Error("Text content is required to generate a QR code");
  }

  try {
    const dataUrl = await QRCode.toDataURL(text, options);
    return dataUrl;
  } catch (e: unknown) {
    throw new Error(`Failed to generate QR code: ${getErrorMessage(e)}`);
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
  const extension = getExtensionFromDataUrl(dataUrl);
  downloadDataUrl({ dataUrl, fileName: `${filename}.${extension}` });
};

export const formatOptionsAsJson = (options: QRCodeOptions): string => {
  return safeJsonStringify(options);
};

export const parseOptionsFromJson = (json: string): QRCodeOptions => {
  const result = safeJsonParse<QRCodeOptions>(json);
  if (isNullish(result)) {
    throw new Error("Invalid JSON format for QR code options");
  }
  return result;
};

export const validateOptions = (options: QRCodeOptions): string[] => {
  const errors: string[] = [];

  if (options.width < 50 || options.width > 1000) {
    errors.push("Width must be between 50 and 1000 pixels");
  }

  if (options.margin < 0 || options.margin > 10) {
    errors.push("Margin must be between 0 and 10");
  }

  if (options.quality < 0 || options.quality > 1) {
    errors.push("Quality must be between 0 and 1");
  }

  return errors;
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
