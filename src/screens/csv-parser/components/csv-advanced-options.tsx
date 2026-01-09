import { Col, Collapse, Form, Row, Select, Switch, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import type { CsvParserOptions } from "../csv-parser.types";
import { DELIMITER_OPTIONS, PAPA_PARSE_OPTIONS_DOC_URL } from "../csv-parser.types";

interface CsvAdvancedOptionsProps {
  options: CsvParserOptions;
  onOptionsChange: (options: Partial<CsvParserOptions>) => void;
}

export const CsvAdvancedOptions = ({ options, onOptionsChange }: CsvAdvancedOptionsProps) => {
  const { styles } = useStyles();

  const handleDelimiterChange = (value: string) => {
    onOptionsChange({ delimiter: value });
  };

  const handleHeaderChange = (checked: boolean) => {
    onOptionsChange({ header: checked });
  };

  const handleDynamicTypingChange = (checked: boolean) => {
    onOptionsChange({ dynamicTyping: checked });
  };

  const handleSkipEmptyLinesChange = (checked: boolean) => {
    onOptionsChange({ skipEmptyLines: checked });
  };

  const advancedOptionsItems = [
    {
      key: "1",
      label: "Advanced Options",
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Delimiter" className={styles.formItem}>
              <Select
                value={options.delimiter ?? ""}
                onChange={handleDelimiterChange}
                options={DELIMITER_OPTIONS}
                className={styles.select}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Form.Item label="First row as header" className={styles.formItem}>
              <Switch checked={options.header ?? true} onChange={handleHeaderChange} />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Form.Item label="Auto-detect types" className={styles.formItem}>
              <Tooltip title="Automatically convert numeric values">
                <Switch checked={options.dynamicTyping ?? true} onChange={handleDynamicTypingChange} />
              </Tooltip>
            </Form.Item>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Form.Item label="Skip empty lines" className={styles.formItem}>
              <Switch checked={options.skipEmptyLines ?? true} onChange={handleSkipEmptyLinesChange} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Typography.Link href={PAPA_PARSE_OPTIONS_DOC_URL} target="_blank" rel="noreferrer">
              📚 View full PapaParse options documentation
            </Typography.Link>
          </Col>
        </Row>
      ),
    },
  ];

  return <Collapse ghost items={advancedOptionsItems} className={styles.advancedOptions} />;
};

const useStyles = createStyles(() => ({
  formItem: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  advancedOptions: {
    marginBottom: 8,
    ".ant-collapse-header": {
      padding: "8px 0 !important",
    },
    ".ant-collapse-content-box": {
      padding: "8px 0 !important",
    },
  },
}));
