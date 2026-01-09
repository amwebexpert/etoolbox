import { Col, Form, Select } from "antd";

import { IMAGE_TYPES, type QRCodeImgMimeType } from "../qrcode-generator.types";

import { useOptionsStyles } from "./use-options-styles";

interface OptionImageFormatProps {
  value: QRCodeImgMimeType;
  onChange: (value: QRCodeImgMimeType) => void;
}

export const OptionImageFormat = ({ value, onChange }: OptionImageFormatProps) => {
  const { styles } = useOptionsStyles();

  return (
    <Col xs={12} sm={8} md={6}>
      <Form.Item label="Image Format" className={styles.formItem}>
        <Select
          value={value}
          onChange={onChange}
          options={IMAGE_TYPES.map((type) => ({
            value: type.value,
            label: type.label,
          }))}
          className={styles.fullWidth}
        />
      </Form.Item>
    </Col>
  );
};
