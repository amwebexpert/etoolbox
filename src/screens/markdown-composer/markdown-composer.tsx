import { FileMarkdownOutlined } from "@ant-design/icons";
import { MarkdownComposer } from "@lichens-innovation/react-markdown-composer";
import { Alert, Col, Input, Row, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { useMarkdownComposerStore } from "./markdown-composer.store";
import { parseJsonDataText } from "./markdown-composer.utils";

const { TextArea } = Input;
const { Text } = Typography;

export const MarkdownComposerScreen = () => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const { markdown, jsonDataText, setMarkdown, setJsonDataText } = useMarkdownComposerStore();

  const parseResult = parseJsonDataText(jsonDataText);
  const jsonErrorMessage = parseResult.errorMessage;

  const [trackedJsonDataText, setTrackedJsonDataText] = useState(jsonDataText);
  const [lastValidData, setLastValidData] = useState<unknown>(() =>
    parseResult.errorMessage === undefined ? parseResult.data : undefined
  );

  if (trackedJsonDataText !== jsonDataText) {
    setTrackedJsonDataText(jsonDataText);
    if (parseResult.errorMessage === undefined) {
      setLastValidData(parseResult.data);
    }
  }

  const inputData = jsonErrorMessage === undefined ? parseResult.data : lastValidData;

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonDataText(event.target.value ?? "");
  };

  return (
    <ScreenContainer className={styles.screen}>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileMarkdownOutlined />}
          title="Markdown Composer"
          description="Compose Handlebars-powered markdown templates with a live JSON data preview"
        />

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
                  message="Invalid JSON"
                  description={jsonErrorMessage}
                />
              )}
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Space orientation="vertical" size="small" className={styles.fullWidth}>
              <Text strong>Engine</Text>
              <Text type="secondary" aria-label="Template engine">
                Handlebars
              </Text>
            </Space>
          </Col>
        </Row>

        <div className={styles.composerContainer}>
          <MarkdownComposer inputData={inputData} markdown={markdown} onMarkdownChange={setMarkdown} />
        </div>
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  screen: {
    maxWidth: "none",
  },
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
  composerContainer: {
    width: "100%",
    height: 600,
  },
}));
