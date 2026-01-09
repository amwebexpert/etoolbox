import type { RgbaColor } from "@lichens-innovation/ts-common";
import { rgbToString, rgbaToHex, rgbaToHexWithAlpha, rgbaToString } from "@lichens-innovation/ts-common";
import { clipboardImageToDataUrl, readFileAsDataUrl } from "~/utils/file-reader.utils";

export const rgbaColorToHex = rgbaToHex;
export const rgbaColorToHexWithAlpha = rgbaToHexWithAlpha;
export const rgbaColorToRgbString = rgbToString;
export const rgbaColorToRgbaString = rgbaToString;

interface ClickCoordinates {
  px: number;
  py: number;
  width: number;
  height: number;
}

interface ComputeImageClickCoordinatesArgs {
  event: MouseEvent;
  image: HTMLImageElement;
}

export const computeImageClickCoordinates = ({ event, image }: ComputeImageClickCoordinatesArgs): ClickCoordinates => {
  const bounds = image.getBoundingClientRect();

  // Use clientX/clientY (relative to viewport) to match getBoundingClientRect()
  // pageX/pageY includes scroll offset which causes incorrect positioning
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  const cw = image.clientWidth;
  const ch = image.clientHeight;
  const iw = image.naturalWidth;
  const ih = image.naturalHeight;

  const px = Math.round((x / cw) * iw);
  const py = Math.round((y / ch) * ih);

  return { px, py, width: iw, height: ih };
};

interface RetrieveClickedColorArgs {
  event: MouseEvent;
  image: HTMLImageElement;
}

export const retrieveClickedColor = ({ event, image }: RetrieveClickedColorArgs): RgbaColor => {
  const coordinates = computeImageClickCoordinates({ event, image });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  canvas.width = coordinates.width;
  canvas.height = coordinates.height;
  context.drawImage(image, 0, 0);

  const p = context.getImageData(coordinates.px, coordinates.py, 1, 1).data;

  return {
    r: p[0] ?? 0,
    g: p[1] ?? 0,
    b: p[2] ?? 0,
    a: 1,
  };
};

interface ClipboardToDataURLArgs {
  items: DataTransferItemList;
  onLoad: (result: string) => void;
}

export const clipboardToDataURL = ({ items, onLoad }: ClipboardToDataURLArgs): void => {
  clipboardImageToDataUrl({ items, onLoad });
};

export const fileToDataURL = readFileAsDataUrl;

export interface ColorFormat {
  label: string;
  value: string;
  backgroundColor: string;
}

export const getColorFormats = (color: RgbaColor): ColorFormat[] => {
  const hex = rgbaColorToHex(color);
  const hexWithAlpha = rgbaColorToHexWithAlpha(color);
  const rgb = rgbaColorToRgbString(color);
  const rgba = rgbaColorToRgbaString(color);

  return [
    { label: "HEX", value: hex, backgroundColor: hex },
    { label: "HEX + Alpha", value: hexWithAlpha, backgroundColor: hexWithAlpha },
    { label: "RGB", value: rgb, backgroundColor: rgb },
    { label: "RGBA", value: rgba, backgroundColor: rgba },
  ];
};
