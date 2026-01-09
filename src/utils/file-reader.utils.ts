export const readFileAsDataUrl = (file: File): Promise<string> => {
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

export interface Base64FileResult {
  base64: string;
  mimeType: string;
}

export const readFileAsBase64 = (file: File): Promise<Base64FileResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] || result;
      const mimeType = file.type || "application/octet-stream";
      resolve({ base64, mimeType });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as text"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result instanceof ArrayBuffer) {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as ArrayBuffer"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Extracts an image file from clipboard items.
 * Returns the first valid image file found, or null if none.
 */
export const getImageFileFromClipboard = (items: DataTransferItemList): File | null => {
  if (!items) return null;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.type.startsWith("image")) continue;

    const file = item.getAsFile();
    if (file) return file;
  }

  return null;
};

interface ClipboardImageCallbackArgs {
  items: DataTransferItemList;
  onFile: (file: File) => void;
}

/**
 * Extracts an image file from clipboard items and calls the callback with it.
 */
export const clipboardImageToFile = ({ items, onFile }: ClipboardImageCallbackArgs): void => {
  const file = getImageFileFromClipboard(items);
  if (file) onFile(file);
};

interface ClipboardToDataUrlArgs {
  items: DataTransferItemList;
  onLoad: (result: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Extracts an image file from clipboard items and converts it to a data URL.
 */
export const clipboardImageToDataUrl = ({ items, onLoad, onError }: ClipboardToDataUrlArgs): void => {
  const file = getImageFileFromClipboard(items);
  if (!file) return;

  readFileAsDataUrl(file)
    .then(onLoad)
    .catch((error) => onError?.(error instanceof Error ? error : new Error(String(error))));
};
