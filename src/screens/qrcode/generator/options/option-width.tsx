import { isNullish } from "@lichens-innovation/ts-common";
import { Col, Form, InputNumber, Select } from "antd";

import { WIDTH_PRESETS } from "../qrcode-generator.types";

import { useOptionsStyles } from "./use-options-styles";

interface OptionWidthProps {
  value: number;
  onChange: (value: number) => void;
}

export const OptionWidth = ({ value, onChange }: OptionWidthProps) => {
  const { styles } = useOptionsStyles();

  const handleCustomWidthChange = (val?: number | null) => {
    if (isNullish(val)) return;
    onChange(val);
  };

  return (
    <Col xs={12} sm={8} md={6}>
      <Form.Item label="Width (px)" className={styles.formItem}>
        <Select
          value={value}
          onChange={onChange}
          options={WIDTH_PRESETS.map((preset) => ({
            value: preset.value,
            label: preset.label,
          }))}
          className={styles.fullWidth}
          showSearch
          popupRender={(menu) => (
            <>
              {menu}
              <div className={styles.customWidthInput}>
                <InputNumber
                  placeholder="Custom..."
                  min={50}
                  max={1000}
                  className={styles.fullWidth}
                  onChange={handleCustomWidthChange}
                />
              </div>
            </>
          )}
        />
      </Form.Item>
    </Col>
  );
};
