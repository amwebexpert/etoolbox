import { Col, Form, Select } from "antd";

import { ERROR_CORRECTION_LEVELS, type QRCodeErrorCorrectionLevel } from "../qrcode-generator.types";

import { useOptionsStyles } from "./use-options-styles";

interface OptionErrorCorrectionProps {
  value: QRCodeErrorCorrectionLevel;
  onChange: (value: QRCodeErrorCorrectionLevel) => void;
}

export const OptionErrorCorrection = ({ value, onChange }: OptionErrorCorrectionProps) => {
  const { styles } = useOptionsStyles();

  return (
    <Col xs={12} sm={8} md={6}>
      <Form.Item label="Error Correction" className={styles.formItem}>
        <Select
          value={value}
          onChange={onChange}
          options={ERROR_CORRECTION_LEVELS.map((level) => ({
            value: level.value,
            label: level.label,
          }))}
          className={styles.fullWidth}
        />
      </Form.Item>
    </Col>
  );
};
