import { getErrorMessage } from "@lichens-innovation/ts-common";
import { isValidImageFile as isValidImage } from "@lichens-innovation/ts-common/mime";
import { fileToImageData } from "@lichens-innovation/ts-common/web";
import jsQR from "jsqr";

import type { DecodeFromFileContext, QRCodeDecodeResult } from "./qrcode-decoder.types";

const decodeFromImageData = (imageData: ImageData): QRCodeDecodeResult => {
  const { data, width, height } = imageData;
  const result = jsQR(data, width, height, { inversionAttempts: "attemptBoth" });

  if (!result) {
    throw new Error("No QR code found in the image");
  }

  return {
    text: result.data,
    format: "QR_CODE",
    timestamp: new Date(),
  };
};

export const decodeFromFile = async ({ file }: DecodeFromFileContext): Promise<QRCodeDecodeResult> => {
  try {
    const imageData = await fileToImageData(file);
    return decodeFromImageData(imageData);
  } catch (e: unknown) {
    throw new Error(`Failed to decode QR code: ${getErrorMessage(e)}`, { cause: e });
  }
};

export const formatDecodeResult = (result: QRCodeDecodeResult): string => {
  const { text, format, timestamp } = result;
  return JSON.stringify({ text, format, timestamp: timestamp.toISOString() }, null, 2);
};

export const isValidImageFile = isValidImage;
