import type { RgbaColor } from "@lichens-innovation/ts-common";

export const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp"];

export const isValidImageFile = (file: File): boolean => {
  return VALID_IMAGE_TYPES.includes(file.type);
};

export const fileToImageData = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(imageData);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};

export const dataUrlToPngBlob = (dataUrl: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert to PNG"));
          }
        },
        "image/png",
        1
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
};

export const imageToCanvas = (img: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0);
  }
  return canvas;
};

interface GetPixelColorArgs {
  img: HTMLImageElement;
  x: number;
  y: number;
}

export const getPixelColor = ({ img, x, y }: GetPixelColorArgs): RgbaColor => {
  const canvas = imageToCanvas(img);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  const p = ctx.getImageData(x, y, 1, 1).data;
  return {
    r: p[0] ?? 0,
    g: p[1] ?? 0,
    b: p[2] ?? 0,
    a: 1,
  };
};
