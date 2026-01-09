import { Col, Form, Slider } from "antd";

import { useOptionsStyles } from "./use-options-styles";

interface OptionMarginProps {
  value: number;
  onChange: (value: number) => void;
}

export const OptionMargin = ({ value, onChange }: OptionMarginProps) => {
  const { styles } = useOptionsStyles();

  return (
    <Col xs={12} sm={8} md={6}>
      <Form.Item label="Margin" className={styles.formItem}>
        <Slider min={0} max={10} value={value} onChange={onChange} marks={{ 0: "0", 5: "5", 10: "10" }} />
      </Form.Item>
    </Col>
  );
};
