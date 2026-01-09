import { CodeOutlined, FileTextOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Descriptions, Input, Tabs, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import type { QRCodeDecodeResult } from "./qrcode-decoder.types";

const { TextArea } = Input;

interface QRCodeDecoderResultProps {
  result: QRCodeDecodeResult | null;
  previewUrl: string | null;
}

export const QRCodeDecoderResult = ({ result, previewUrl }: QRCodeDecoderResultProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  if (!result) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">
          {previewUrl ? "Click 'Decode' to read the QR code" : "Select an image containing a QR code to decode"}
        </Typography.Text>
      </div>
    );
  }

  const tabItems = [
    {
      key: "text",
      label: (
        <span>
          <FileTextOutlined /> Decoded Text
        </span>
      ),
      children: (
        <div className={styles.textContainer}>
          <TextArea
            value={result.text}
            readOnly
            autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isMobile ? 12 : 20 }}
            className={styles.monospace}
            spellCheck={false}
          />
        </div>
      ),
    },
    {
      key: "details",
      label: (
        <span>
          <InfoCircleOutlined /> Details
        </span>
      ),
      children: (
        <Descriptions bordered size="small" column={1} className={styles.descriptions}>
          <Descriptions.Item label="Format">{result.format}</Descriptions.Item>
          <Descriptions.Item label="Content Length">{result.text.length} characters</Descriptions.Item>
          <Descriptions.Item label="Decoded At">{result.timestamp.toLocaleString()}</Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "json",
      label: (
        <span>
          <CodeOutlined /> JSON
        </span>
      ),
      children: (
        <div className={styles.textContainer}>
          <Typography.Text type="secondary" className={styles.label}>
            Full decode result as JSON:
          </Typography.Text>
          <TextArea
            value={JSON.stringify(
              {
                text: result.text,
                format: result.format,
                timestamp: result.timestamp.toISOString(),
              },
              null,
              2,
            )}
            readOnly
            autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isMobile ? 10 : 14 }}
            className={styles.monospace}
            spellCheck={false}
          />
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.resultCard}>
      <Tabs items={tabItems} defaultActiveKey="text" size={isMobile ? "small" : "middle"} />
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  resultCard: {
    width: "100%",
  },
  textContainer: {
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
  descriptions: {
    ".ant-descriptions-item-label": {
      width: 140,
      fontWeight: 500,
    },
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
