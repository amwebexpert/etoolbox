import { DiffOutlined } from "@ant-design/icons";
import { Col, Input, Row, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";

import { useDiffViewerStore } from "./diff-viewer.store";

const { TextArea } = Input;
const { Text } = Typography;

export const DiffViewer = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { originalText, modifiedText, setOriginalText, setModifiedText } = useDiffViewerStore();

  const deferredOriginal = useDeferredValue(originalText);
  const deferredModified = useDeferredValue(modifiedText);

  const handleOriginalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalText(event.target.value ?? "");
  };

  const handleModifiedChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifiedText(event.target.value ?? "");
  };

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<DiffOutlined />}
          title="Diff Viewer"
          description="Compare two texts side by side"
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size="small" className={styles.fullWidth}>
              <Text strong>Original</Text>
              <TextArea
                aria-label="Original"
                placeholder="Paste the original text here"
                autoFocus={isDesktop}
                rows={isMobile ? 4 : 8}
                autoSize={{ minRows: 4, maxRows: isDesktop ? 16 : 6 }}
                value={originalText}
                onChange={handleOriginalChange}
                className={styles.textArea}
              />
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Space orientation="vertical" size="small" className={styles.fullWidth}>
              <Text strong>Modified</Text>
              <TextArea
                aria-label="Modified"
                placeholder="Paste the modified text here"
                rows={isMobile ? 4 : 8}
                autoSize={{ minRows: 4, maxRows: isDesktop ? 16 : 6 }}
                value={modifiedText}
                onChange={handleModifiedChange}
                className={styles.textArea}
              />
            </Space>
          </Col>
        </Row>

        <div className={styles.diffContainer}>
          <ReactDiffViewer
            oldValue={deferredOriginal}
            newValue={deferredModified}
            splitView
            leftTitle="Original"
            rightTitle="Modified"
          />
        </div>
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
  diffContainer: {
    width: "100%",
    overflow: "auto",
  },
}));
