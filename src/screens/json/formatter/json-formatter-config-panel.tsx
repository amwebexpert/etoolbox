import { SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, InputNumber, Select, Space } from "antd";

import { useResponsive } from "~/hooks/use-responsive";
import { smallSizeOnMobile } from "~/utils/responsive.utils";

import { useJsonFormatterStore } from "./json-formatter.store";
import type { ReactJsonViewConfig } from "./json-formatter.types";
import { ICON_STYLE_OPTIONS, PRESET_OPTIONS, THEME_OPTIONS } from "./json-formatter.utils";
import { useStyles } from "./json-formatter-config-panel.styles";
import { JsonFormatterDisplayOptions } from "./json-formatter-display-options";

interface HandleConfigChangeArgs {
  key: keyof ReactJsonViewConfig;
  value: unknown;
}

export const JsonFormatterConfigPanel = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const { reactJsonConfig, setReactJsonConfig, resetReactJsonConfig } = useJsonFormatterStore();

  const handleConfigChange = ({ key, value }: HandleConfigChangeArgs) => {
    setReactJsonConfig((current) => ({ ...current, [key]: value }));
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
              <Form layout="vertical" size={smallSizeOnMobile(isMobile)}>
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
                    onChange={(value) => handleConfigChange({ key: "theme", value })}
                    options={THEME_OPTIONS}
                    showSearch
                  />
                </Form.Item>

                {/* Icon Style */}
                <Form.Item label="Icon Style" tooltip="Style of expand/collapse icons">
                  <Select
                    value={reactJsonConfig.iconStyle}
                    onChange={(value) => handleConfigChange({ key: "iconStyle", value })}
                    options={ICON_STYLE_OPTIONS}
                  />
                </Form.Item>

                {/* Indentation */}
                <Form.Item label="Indentation Width" tooltip="Number of spaces for each indentation level">
                  <InputNumber
                    min={1}
                    max={8}
                    value={reactJsonConfig.indentWidth}
                    onChange={(value) => handleConfigChange({ key: "indentWidth", value: value ?? 4 })}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Collapsed Depth */}
                <Form.Item label="Initial Collapsed Depth" tooltip="Set to -1 to expand all nodes by default">
                  <InputNumber
                    min={-1}
                    max={10}
                    value={typeof reactJsonConfig.collapsed === "number" ? reactJsonConfig.collapsed : 1}
                    onChange={(value) => handleConfigChange({ key: "collapsed", value: value ?? 1 })}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* Display Options */}
                <JsonFormatterDisplayOptions reactJsonConfig={reactJsonConfig} onConfigChange={handleConfigChange} />

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
