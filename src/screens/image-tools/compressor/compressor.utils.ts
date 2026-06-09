export const compressImage = () => {};

export const isImageFile = (file: File): boolean => file.type.startsWith("image/");

interface ClipboardLikeItem {
  kind: string;
  type: string;
  getAsFile: () => File | null;
}

export const extractImageFromClipboardItems = (items: ReadonlyArray<ClipboardLikeItem>): File | null => {
  for (const item of items) {
    if (!item.type.startsWith("image/")) continue;

    const file = item.getAsFile();
    if (file) return file;
  }

  return null;
};
