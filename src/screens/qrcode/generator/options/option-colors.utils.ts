import type { Color } from "antd/es/color-picker";

export type ColorUpdater = (color: string) => void;

export const createColorChangeHandler = (onChange: ColorUpdater) => (color: Color) => {
  onChange(color.toHexString());
};
