import { Buffer } from "buffer";

import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
import Tesseract from "tesseract.js";

import { formatDuration } from "~/utils/number-format.utils";
import { countWords } from "~/utils/string.utils";

import type { OcrContext, OcrResult, WorkerStatus } from "./image-ocr.types";

interface ProcessOcrArgs {
  context: OcrContext;
  onProgress?: (status: WorkerStatus) => void;
}

export const processOcr = async ({ context, onProgress }: ProcessOcrArgs): Promise<OcrResult> => {
  const { imageDataUrl, language } = context;

  if (isBlank(imageDataUrl)) {
    throw new Error("No image provided for OCR processing");
  }

  const startTime = performance.now();

  try {
    // Extract base64 data from data URL
    const base64Data = imageDataUrl.split(",")[1];
    if (!base64Data) {
      throw new Error("Invalid image data URL format");
    }

    const imageBuffer = Buffer.from(base64Data, "base64");

    const result = await Tesseract.recognize(imageBuffer, language, {
      logger: (log) => {
        if (onProgress) {
          onProgress({
            workerId: log.workerId ?? "",
            jobId: log.jobId ?? "",
            status: log.status ?? "",
            progress: log.progress ?? 0,
          });
        }
      },
    });

    const text = result.data.text.trim();
    const confidence = result.data.confidence;
    const endTime = performance.now();

    return {
      text,
      confidence,
      wordCount: countWords(text),
      characterCount: text.length,
      processingTime: Math.round(endTime - startTime),
    };
  } catch (e: unknown) {
    throw new Error(`OCR processing failed: ${getErrorMessage(e)}`);
  }
};

export const formatProcessingTime = formatDuration;

export const getProgressStatus = (progress: number, status: string): string => {
  const percentage = Math.round(progress * 100);
  if (status === "recognizing text") {
    return `Recognizing text... ${percentage}%`;
  }
  if (status === "loading language traineddata") {
    return "Loading language data...";
  }
  if (status === "initializing api") {
    return "Initializing OCR engine...";
  }
  return status ? `${status}... ${percentage}%` : `Processing... ${percentage}%`;
};

interface ClipboardToDataUrlArgs {
  items: DataTransferItemList;
  onLoad: (dataUrl: string) => void;
  onError?: (error: Error) => void;
}

export const clipboardToDataUrl = ({ items, onLoad, onError }: ClipboardToDataUrlArgs): void => {
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.type.startsWith("image")) continue;

    const file = item.getAsFile();
    if (!file) continue;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        onLoad(result);
      }
    };
    reader.onerror = () => {
      onError?.(new Error("Failed to read clipboard image"));
    };
    reader.readAsDataURL(file);
    break;
  }
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const isValidImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

export const downloadTextFile = (text: string, filename = "extracted-text.txt"): void => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
