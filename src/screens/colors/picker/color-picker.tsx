import { BgColorsOutlined } from "@ant-design/icons";
import { ColorPicker as AntColorPicker, Col, Flex, Row, Typography } from "antd";
import { createStyles } from "antd-style";
import type { Color } from "antd/es/color-picker";
import { useEffect } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { ColorPickerImage } from "./color-picker-image";
import { ColorPickerSamples } from "./color-picker-samples";
import { ColorPickerToolbar } from "./color-picker-toolbar";
import { useColorPickerStore } from "./color-picker.store";
import { clipboardToDataURL, fileToDataURL, rgbaColorToRgbaString } from "./color-picker.utils";

const { Text } = Typography;

export const ColorPicker = () => {
  const { styles } = useStyles();
  const { isMobile, isDesktop } = useResponsive();

  const { imageDataUrl, color, setImageDataUrl, setColor, clearImage } = useColorPickerStore();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const { items } = e.clipboardData ?? {};
      if (!items) return;
      clipboardToDataURL({ items, onLoad: setImageDataUrl });
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [setImageDataUrl]);

  const handleFileSelect = async (file: File) => {
    try {
      const dataUrl = await fileToDataURL(file);
      setImageDataUrl(dataUrl);
    } catch {
      // Silently ignore file read errors
    }
  };

  const handleColorPickerChange = (antColor: Color) => {
    const { r, g, b, a } = antColor.toRgb();
    setColor({ r, g, b, a: a ?? 1 });
  };

  const antColorValue = rgbaColorToRgbaString(color);

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<BgColorsOutlined />}
          title="Color Picker"
          description="Pick colors from images or use the color picker. Click on any color format to copy."
        />

        <ColorPickerToolbar hasImage={!!imageDataUrl} onClear={clearImage} onFileSelect={handleFileSelect} />

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Flex vertical gap="middle">
              <ColorPickerImage imageDataUrl={imageDataUrl} onColorPicked={setColor} />

              <div className={styles.pickerSection}>
                <Text type="secondary" className={styles.sectionLabel}>
                  Or pick a color:
                </Text>
                <AntColorPicker
                  value={antColorValue}
                  onChange={handleColorPickerChange}
                  showText
                  size={isMobile ? "middle" : "large"}
                  format="rgb"
                  className={styles.colorPicker}
                />
              </div>
            </Flex>
          </Col>

          <Col xs={24} lg={10}>
            <ColorPickerSamples color={color} />
          </Col>
        </Row>

        {isDesktop && <div className={styles.spacer} />}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  fullWidth: {
    width: "100%",
  },
  pickerSection: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
  sectionLabel: {
    whiteSpace: "nowrap",
  },
  colorPicker: {
    flexGrow: 0,
  },
  spacer: {
    height: 24,
  },
}));
