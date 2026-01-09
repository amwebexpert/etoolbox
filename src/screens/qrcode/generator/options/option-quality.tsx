import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Slider, Tooltip } from "antd";

import { useOptionsStyles } from "./use-options-styles";

interface OptionQualityProps {
  value: number;
  onChange: (value: number) => void;
}

export const OptionQuality = ({ value, onChange }: OptionQualityProps) => {
  const { styles } = useOptionsStyles();

  return (
    <Col xs={12} sm={8} md={6}>
      <Form.Item
        label={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            Quality
            <Tooltip title="Image quality (0-1). Only applies to JPEG and WebP formats.">
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
        className={styles.formItem}
      >
        <Slider
          min={0.1}
          max={1}
          step={0.1}
          value={value}
          onChange={onChange}
          marks={{ 0.1: "Low", 0.5: "Med", 1: "High" }}
        />
      </Form.Item>
    </Col>
  );
};
