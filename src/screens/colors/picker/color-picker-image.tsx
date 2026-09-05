import type { RgbaColor } from "@lichens-innovation/ts-common";
import { Typography } from "antd";
import { createStyles } from "antd-style";
import { type ComponentRef, type MouseEvent, useRef } from "react";

import { ResizableImage } from "~/components/ui/resizable-image";

import { retrieveClickedColor } from "./color-picker.utils";

const { Text } = Typography;

interface ColorPickerImageProps {
  imageDataUrl: string;
  onColorPicked: (color: RgbaColor) => void;
}

export const ColorPickerImage = ({ imageDataUrl, onColorPicked }: ColorPickerImageProps) => {
  const { styles } = useStyles();
  const imageRef = useRef<ComponentRef<"img">>(null);

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const image = imageRef.current;
    if (image) {
      const color = retrieveClickedColor({ event: event.nativeEvent, image });
      onColorPicked(color);
    }
  };

  if (!imageDataUrl) {
    return (
      <div className={styles.placeholder}>
        <Text type="secondary">Paste an image (Ctrl+V / Cmd+V) or select a file</Text>
      </div>
    );
  }

  return (
    <ResizableImage
      src={imageDataUrl}
      alt="Source for color picking"
      bordered
      imageRef={imageRef}
      onImageClick={handleImageClick}
      imageClassName={styles.image}
      footer={
        <Text type="secondary" className={styles.hint}>
          Click on the image to pick a color • Drag corners to resize
        </Text>
      }
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  placeholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgContainer,
    minHeight: 150,
  },
  image: {
    cursor: "crosshair",
  },
  hint: {
    fontSize: 12,
  },
}));
