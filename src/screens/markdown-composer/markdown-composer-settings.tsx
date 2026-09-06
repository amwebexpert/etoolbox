import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Collapse, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { ENGINE_OPTIONS, getTemplateExample } from "./markdown-composer.constants";
import { useMarkdownComposerStore } from "./markdown-composer.store";

const CONFIGURATION_COLLAPSE_KEY = "configuration";

const { TextArea } = Input;
const { Text } = Typography;

interface MarkdownComposerSettingsProps {
  jsonErrorMessage?: string;
}

export const MarkdownComposerSettings = ({ jsonErrorMessage }: MarkdownComposerSettingsProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const { jsonDataText, engine, setJsonDataText, setEngine, setMarkdown } = useMarkdownComposerStore();

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonDataText(event.target.value ?? "");
  };

  const handleInsertTemplateExample = () => {
    setMarkdown(getTemplateExample(engine));
  };

  return (
    <Collapse
      className={styles.collapse}
      defaultActiveKey={[CONFIGURATION_COLLAPSE_KEY]}
      items={[
        {
          key: CONFIGURATION_COLLAPSE_KEY,
          label: (
            <span className={styles.collapseLabel}>
              <SettingOutlined /> Configuration
            </span>
          ),
          children: (
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Space orientation="vertical" size="small" className={styles.fullWidth}>
                  <Text strong>JSON data</Text>
                  <TextArea
                    aria-label="JSON data"
                    placeholder="Enter JSON data to bind to the template"
                    rows={isMobile ? 6 : 10}
                    autoSize={{ minRows: 6, maxRows: 16 }}
                    value={jsonDataText}
                    onChange={handleJsonChange}
                    className={styles.textArea}
                    spellCheck={false}
                  />
                  {jsonErrorMessage === undefined ? null : (
                    <Alert
                      type="error"
                      showIcon
                      aria-label="JSON data error"
                      title="Invalid JSON"
                      description={jsonErrorMessage}
                    />
                  )}
                </Space>
              </Col>

              <Col xs={24} md={12}>
                <Space orientation="vertical" size="small" className={styles.fullWidth}>
                  <Text strong>Engine</Text>
                  <Select aria-label="Template engine" value={engine} onChange={setEngine} options={ENGINE_OPTIONS} />
                  <Button
                    icon={<FileTextOutlined />}
                    aria-label="Insert template example"
                    onClick={handleInsertTemplateExample}
                  >
                    Insert template example
                  </Button>
                </Space>
              </Col>
            </Row>
          ),
        },
      ]}
    />
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  collapse: {
    width: "100%",
  },
  collapseLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
