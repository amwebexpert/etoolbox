import { SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, InputNumber, Select, Space } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { JsonFormatterConfigOption } from "./json-formatter-config-option";
import { useJsonFormatterStore } from "./json-formatter.store";
import type { ReactJsonViewConfig } from "./json-formatter.types";
import { ICON_STYLE_OPTIONS, PRESET_OPTIONS, THEME_OPTIONS } from "./json-formatter.utils";

export const JsonFormatterConfigPanel = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const { reactJsonConfig, setReactJsonConfig, resetReactJsonConfig } = useJsonFormatterStore();

  const handleConfigChange = (key: keyof ReactJsonViewConfig, value: unknown) => {
    setReactJsonConfig({ ...reactJsonConfig, [key]: value });
  };

  return (
    <Collapse
      className={styles.collapse}
      bordered={false}
      items={[
        {
          key: "config",
          label: (
            <Space>
              <SettingOutlined />
              <span>ReactJson View Configuration</span>
            </Space>
          ),
          children: (
            <div className={styles.configPanel}>
              <Form layout="vertical" size={isMobile ? "small" : "middle"}>
                {/* Preset Selection */}
                <Form.Item label="Configuration Presets" tooltip="Load predefined configuration presets">
                  <Space orientation="vertical" className={styles.fullWidth}>
                    <Select
                      placeholder="Select a preset configuration"
                      onChange={(value) => {
                        const preset = PRESET_OPTIONS.find((p) => p.value === value);
                        if (preset) setReactJsonConfig(preset.config);
                      }}
                      options={PRESET_OPTIONS.map((p) => ({ label: p.label, value: p.value }))}
                      allowClear
                    />
                  </Space>
                </Form.Item>

                {/* Theme Selection */}
                <Form.Item label="Theme" tooltip="Select the color theme for the JSON viewer">
                  <Select
                    value={reactJsonConfig.theme}
                    onChange={(value) => handleConfigChange("theme", value)}
                    options={THEME_OPTIONS}
                    showSearch
                  />
                </Form.Item>

                {/* Icon Style */}
                <Form.Item label="Icon Style" tooltip="Style of expand/collapse icons">
                  <Select
                    value={reactJsonConfig.iconStyle}
                    onChange={(value) => handleConfigChange("iconStyle", value)}
                    options={ICON_STYLE_OPTIONS}
                  />
                </Form.Item>

                {/* Indentation */}
                <Form.Item label="Indentation Width" tooltip="Number of spaces for each indentation level">
                  <InputNumber
                    min={1}
                    max={8}
                    value={reactJsonConfig.indentWidth}
                    onChange={(value) => handleConfigChange("indentWidth", value ?? 4)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Collapsed Depth */}
                <Form.Item label="Initial Collapsed Depth" tooltip="Set to -1 to expand all nodes by default">
                  <InputNumber
                    min={-1}
                    max={10}
                    value={typeof reactJsonConfig.collapsed === "number" ? reactJsonConfig.collapsed : 1}
                    onChange={(value) => handleConfigChange("collapsed", value ?? 1)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Display Options */}
                <div className={styles.switchGroup}>
                  <Form.Item label="Display Options" className={styles.fullWidth}>
                    <Space orientation="vertical" className={styles.fullWidth}>
                      <JsonFormatterConfigOption
                        label="Display Data Types"
                        tooltip="Show data types next to values"
                        checked={reactJsonConfig.displayDataTypes}
                        onChange={(value) => handleConfigChange("displayDataTypes", value)}
                      />

                      <JsonFormatterConfigOption
                        label="Display Object Size"
                        tooltip="Show object size (number of keys)"
                        checked={reactJsonConfig.displayObjectSize}
                        onChange={(value) => handleConfigChange("displayObjectSize", value)}
                      />

                      <JsonFormatterConfigOption
                        label="Enable Clipboard"
                        tooltip="Enable click-to-copy for values"
                        checked={reactJsonConfig.enableClipboard}
                        onChange={(value) => handleConfigChange("enableClipboard", value)}
                      />

                      <JsonFormatterConfigOption
                        label="Quoted Keys"
                        tooltip="Quote object keys"
                        checked={reactJsonConfig.quotesOnKeys}
                        onChange={(value) => handleConfigChange("quotesOnKeys", value)}
                      />

                      <JsonFormatterConfigOption
                        label="Collapse Long Strings"
                        tooltip="Collapse long strings (0 = disabled)"
                        checked={reactJsonConfig.collapseStringsAfterLength > 0}
                        onChange={(value) => handleConfigChange("collapseStringsAfterLength", value ? 50 : 0)}
                      />

                      <JsonFormatterConfigOption
                        label="Group Large Arrays"
                        tooltip="Group large arrays (>100 items) for better performance"
                        checked={reactJsonConfig.groupArraysAfterLength > 0}
                        onChange={(value) => handleConfigChange("groupArraysAfterLength", value ? 100 : 0)}
                      />

                      <JsonFormatterConfigOption
                        label="Sort Keys"
                        tooltip="Sort object keys alphabetically"
                        checked={reactJsonConfig.sortKeys}
                        onChange={(value) => handleConfigChange("sortKeys", value)}
                      />
                    </Space>
                  </Form.Item>
                </div>

                {/* Reset Button */}
                <Form.Item>
                  <Button onClick={resetReactJsonConfig} block>
                    Reset to Defaults
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ),
        },
      ]}
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  collapse: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
  configPanel: {
    maxHeight: "500px",
    overflowY: "auto",
    paddingRight: 8,
  },
  fullWidth: {
    width: "100%",
  },
  switchGroup: {
    marginBottom: 16,
  },
}));
