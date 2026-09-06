import { Col, ColorPicker, Form } from "antd";

import { type ColorUpdater, createColorChangeHandler } from "./option-colors.utils";
import { useOptionsStyles } from "./use-options-styles";

interface OptionColorsProps {
  foreground: string;
  background: string;
  onForegroundChange: ColorUpdater;
  onBackgroundChange: ColorUpdater;
}

export const OptionColors = ({ foreground, background, onForegroundChange, onBackgroundChange }: OptionColorsProps) => {
  const { styles } = useOptionsStyles();

  return (
    <>
      <Col xs={12} sm={8} md={6}>
        <Form.Item label="Foreground Color" className={styles.formItem}>
          <ColorPicker
            value={foreground}
            onChange={createColorChangeHandler(onForegroundChange)}
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
            onChange={createColorChangeHandler(onBackgroundChange)}
            showText
            format="hex"
            className={styles.colorPicker}
          />
        </Form.Item>
      </Col>
    </>
  );
};
