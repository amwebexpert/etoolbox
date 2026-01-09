import { CodeOutlined, FileImageOutlined } from "@ant-design/icons";
import { Card, Input, Tabs, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { generateImgTag } from "./qrcode-generator.utils";

const { TextArea } = Input;

interface QRCodeGeneratorResultProps {
  dataUrl: string;
}

export const QRCodeGeneratorResult = ({ dataUrl }: QRCodeGeneratorResultProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  if (!dataUrl) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Generated QR code will appear here</Typography.Text>
      </div>
    );
  }

  const imgTag = generateImgTag(dataUrl);

  const tabItems = [
    {
      key: "preview",
      label: (
        <span>
          <FileImageOutlined /> Preview
        </span>
      ),
      children: (
        <div className={styles.previewContainer}>
          <img src={dataUrl} alt="Generated QR Code" className={styles.qrImage} />
        </div>
      ),
    },
    {
      key: "imgTag",
      label: (
        <span>
          <CodeOutlined /> HTML Tag
        </span>
      ),
      children: (
        <div className={styles.codeContainer}>
          <Typography.Text type="secondary" className={styles.label}>
            Copy this HTML img tag to embed the QR code:
          </Typography.Text>
          <TextArea
            value={imgTag}
            readOnly
            autoSize={{ minRows: 2, maxRows: 4 }}
            className={styles.monospace}
            spellCheck={false}
          />
        </div>
      ),
    },
    {
      key: "dataUrl",
      label: (
        <span>
          <CodeOutlined /> Data URL
        </span>
      ),
      children: (
        <div className={styles.codeContainer}>
          <Typography.Text type="secondary" className={styles.label}>
            Base64 encoded data URL (use as src attribute):
          </Typography.Text>
          <TextArea
            value={dataUrl}
            readOnly
            autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isMobile ? 8 : 12 }}
            className={styles.monospace}
            spellCheck={false}
          />
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.resultCard}>
      <Tabs items={tabItems} defaultActiveKey="preview" size={isMobile ? "small" : "middle"} />
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  resultCard: {
    width: "100%",
  },
  previewContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadius,
  },
  qrImage: {
    maxWidth: "100%",
    height: "auto",
    imageRendering: "pixelated",
  },
  codeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 12,
  },
  monospace: {
    fontFamily: "monospace",
    fontSize: 12,
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
