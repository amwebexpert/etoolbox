import { Form, Space } from "antd";

import type { ReactJsonViewConfig } from "./json-formatter.types";
import { JsonFormatterConfigOption } from "./json-formatter-config-option";
import { useStyles } from "./json-formatter-config-panel.styles";

interface OnConfigChangeArgs {
  key: keyof ReactJsonViewConfig;
  value: unknown;
}

interface JsonFormatterDisplayOptionsProps {
  reactJsonConfig: ReactJsonViewConfig;
  onConfigChange: (args: OnConfigChangeArgs) => void;
}

export const JsonFormatterDisplayOptions = ({ reactJsonConfig, onConfigChange }: JsonFormatterDisplayOptionsProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.switchGroup}>
      <Form.Item label="Display Options" className={styles.fullWidth}>
        <Space orientation="vertical" className={styles.fullWidth}>
          <JsonFormatterConfigOption
            label="Display Data Types"
            tooltip="Show data types next to values"
            checked={reactJsonConfig.displayDataTypes}
            onChange={(value) => onConfigChange({ key: "displayDataTypes", value })}
          />

          <JsonFormatterConfigOption
            label="Display Object Size"
            tooltip="Show object size (number of keys)"
            checked={reactJsonConfig.displayObjectSize}
            onChange={(value) => onConfigChange({ key: "displayObjectSize", value })}
          />

          <JsonFormatterConfigOption
            label="Enable Clipboard"
            tooltip="Enable click-to-copy for values"
            checked={reactJsonConfig.enableClipboard}
            onChange={(value) => onConfigChange({ key: "enableClipboard", value })}
          />

          <JsonFormatterConfigOption
            label="Quoted Keys"
            tooltip="Quote object keys"
            checked={reactJsonConfig.quotesOnKeys}
            onChange={(value) => onConfigChange({ key: "quotesOnKeys", value })}
          />

          <JsonFormatterConfigOption
            label="Collapse Long Strings"
            tooltip="Collapse long strings (0 = disabled)"
            checked={reactJsonConfig.collapseStringsAfterLength > 0}
            onChange={(value) => onConfigChange({ key: "collapseStringsAfterLength", value: value ? 50 : 0 })}
          />

          <JsonFormatterConfigOption
            label="Group Large Arrays"
            tooltip="Group large arrays (>100 items) for better performance"
            checked={reactJsonConfig.groupArraysAfterLength > 0}
            onChange={(value) => onConfigChange({ key: "groupArraysAfterLength", value: value ? 100 : 0 })}
          />

          <JsonFormatterConfigOption
            label="Sort Keys"
            tooltip="Sort object keys alphabetically"
            checked={reactJsonConfig.sortKeys}
            onChange={(value) => onConfigChange({ key: "sortKeys", value })}
          />
        </Space>
      </Form.Item>
    </div>
  );
};
