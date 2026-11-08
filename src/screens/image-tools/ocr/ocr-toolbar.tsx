import { ClearOutlined, CopyOutlined, DownloadOutlined, ScanOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useSavedFileToast } from "~/hooks/use-saved-file-toast";
import { saveTextWithPicker } from "~/utils/save-file.utils";

interface OcrToolbarProps {
  hasImage: boolean;
  resultText?: string;
  isProcessing: boolean;
  onProcess: () => void;
  onClear: () => void;
}

export const OcrToolbar = ({ hasImage, resultText, isProcessing, onProcess, onClear }: OcrToolbarProps) => {
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();
  const { notifySavedFile } = useSavedFileToast();

  const hasResult = isNotBlank(resultText);

  const handleCopy = () => {
    void copyTextToClipboard({
      text: resultText,
      successMessage: "Extracted text copied to clipboard!",
    });
  };

  const handleDownload = async () => {
    if (isBlank(resultText)) return;

    const result = await saveTextWithPicker({
      content: resultText,
      fileName: "extracted-text.txt",
      mimeType: "text/plain;charset=utf-8",
    });
    notifySavedFile(result);
  };

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear image and result">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasImage && !hasResult} onClick={onClear}>
              {!isMobile && <>Clear</>}
            </Button>
          </Tooltip>

          <Tooltip title="Copy extracted text to clipboard">
            <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!hasResult} onClick={handleCopy}>
              {!isMobile && <>Copy</>}
            </Button>
          </Tooltip>

          <Tooltip title="Download extracted text as file">
            <Button
              aria-label="Download"
              icon={<DownloadOutlined />}
              disabled={!hasResult}
              onClick={() => void handleDownload()}
            >
              {!isMobile && <>Download</>}
            </Button>
          </Tooltip>

          <Tooltip title="Run OCR to extract text from image">
            <Button
              type="primary"
              aria-label="Run OCR"
              icon={<ScanOutlined />}
              disabled={!hasImage}
              loading={isProcessing}
              onClick={onProcess}
            >
              {isMobile ? "OCR" : "Run OCR"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
