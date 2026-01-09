import { Typography } from "antd";
import { createStyles } from "antd-style";
import { Resizable } from "re-resizable";
import type { MouseEvent } from "react";
import { useRef } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import type { RgbaColor } from "@lichens-innovation/ts-common";
import { retrieveClickedColor } from "./color-picker.utils";

const { Text } = Typography;

interface ColorPickerImageProps {
  imageDataUrl: string;
  onColorPicked: (color: RgbaColor) => void;
}

export const ColorPickerImage = ({ imageDataUrl, onColorPicked }: ColorPickerImageProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const imageRef = useRef<HTMLImageElement>(null);

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

  const defaultWidth = isMobile ? 280 : 400;

  return (
    <div className={styles.imageWrapper}>
      <Resizable
        defaultSize={{ width: defaultWidth, height: "auto" }}
        minWidth={150}
        maxWidth="100%"
        lockAspectRatio
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        handleStyles={{
          right: { cursor: "ew-resize" },
          bottom: { cursor: "ns-resize" },
          bottomRight: { cursor: "nwse-resize" },
        }}
        className={styles.resizable}
      >
        <img
          ref={imageRef}
          src={imageDataUrl}
          alt="Source for color picking"
          className={styles.image}
          onClick={handleImageClick}
        />
      </Resizable>

      <Text type="secondary" className={styles.hint}>
        Click on the image to pick a color • Drag corners to resize
      </Text>
    </div>
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
  imageWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  resizable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${token.colorPrimary}`,
    borderRadius: token.borderRadius,
    padding: 4,
    backgroundColor: token.colorBgContainer,
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    cursor: "crosshair",
    borderRadius: token.borderRadiusSM,
    display: "block",
  },
  hint: {
    fontSize: 12,
  },
}));
