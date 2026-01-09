import { Col, Row, Typography } from "antd";
import { createStyles } from "antd-style";

import type { RgbaColor } from "@lichens-innovation/ts-common";
import { ColorPickerSample } from "./color-picker-sample";
import { getColorFormats } from "./color-picker.utils";

const { Text } = Typography;

interface ColorPickerSamplesProps {
  color: RgbaColor;
}

export const ColorPickerSamples = ({ color }: ColorPickerSamplesProps) => {
  const { styles } = useStyles();

  const colorFormats = getColorFormats(color);

  return (
    <div className={styles.container}>
      <Text strong className={styles.title}>
        Color Formats
      </Text>

      <Row gutter={[12, 12]}>
        {colorFormats.map((format) => (
          <Col xs={24} sm={12} key={format.label}>
            <ColorPickerSample format={format} />
          </Col>
        ))}
      </Row>

      <div className={styles.opacityInfo}>
        <Text type="secondary">
          Opacity: {Math.round(color.a * 100)}% = {color.a.toFixed(2)}
        </Text>
      </div>
    </div>
  );
};

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
  opacityInfo: {
    marginTop: 8,
    textAlign: "center",
  },
}));
