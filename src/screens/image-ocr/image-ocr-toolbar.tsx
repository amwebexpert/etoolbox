import { ClearOutlined, CopyOutlined, DownloadOutlined, ScanOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";

import { downloadTextFile } from "./image-ocr.utils";

interface ImageOcrToolbarProps {
  hasImage: boolean;
  resultText: string | undefined;
  isProcessing: boolean;
  onProcess: () => void;
  onClear: () => void;
}

export const ImageOcrToolbar = ({ hasImage, resultText, isProcessing, onProcess, onClear }: ImageOcrToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();
  const messageApi = useToastMessage();

  const hasResult = !!resultText;

  const handleCopy = () => {
    copyTextToClipboard({
      text: resultText,
      successMessage: "Extracted text copied to clipboard!",
    });
  };

  const handleDownload = () => {
    if (resultText) {
      downloadTextFile(resultText, "extracted-text.txt");
      messageApi.success("Text file downloaded!");
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear image and result">
          <Button icon={<ClearOutlined />} disabled={!hasImage && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy extracted text to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={handleCopy}>
            {!isMobile && "Copy"}
          </Button>
        </Tooltip>

        <Tooltip title="Download extracted text as file">
          <Button icon={<DownloadOutlined />} disabled={!hasResult} onClick={handleDownload}>
            {!isMobile && "Download"}
          </Button>
        </Tooltip>

        <Tooltip title="Run OCR to extract text from image">
          <Button
            type="primary"
            icon={<ScanOutlined />}
            disabled={!hasImage}
            loading={isProcessing}
            onClick={onProcess}
          >
            {isMobile ? "OCR" : "Run OCR"}
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
