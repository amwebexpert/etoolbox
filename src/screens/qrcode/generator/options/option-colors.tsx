import { Col, ColorPicker, Form } from "antd";
import type { Color } from "antd/es/color-picker";

import { useOptionsStyles } from "./use-options-styles";

type ColorUpdater = (color: string) => void;

interface OptionColorsProps {
  foreground: string;
  background: string;
  onForegroundChange: ColorUpdater;
  onBackgroundChange: ColorUpdater;
}

export const OptionColors = ({ foreground, background, onForegroundChange, onBackgroundChange }: OptionColorsProps) => {
  const { styles } = useOptionsStyles();

  const handleColorChange = (onChange: ColorUpdater) => (color: Color) => {
    onChange(color.toHexString());
  };

  return (
    <>
      <Col xs={12} sm={8} md={6}>
        <Form.Item label="Foreground Color" className={styles.formItem}>
          <ColorPicker
            value={foreground}
            onChange={handleColorChange(onForegroundChange)}
            showText
            format="hex"
            className={styles.colorPicker}
          />
        </Form.Item>
      </Col>

      <Col xs={12} sm={8} md={6}>
        <Form.Item label="Background Color" className={styles.formItem}>
          <ColorPicker
            value={background}
            onChange={handleColorChange(onBackgroundChange)}
            showText
            format="hex"
            className={styles.colorPicker}
          />
        </Form.Item>
      </Col>
    </>
  );
};
