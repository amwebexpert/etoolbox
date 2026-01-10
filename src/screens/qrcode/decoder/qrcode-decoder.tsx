import { InboxOutlined, ScanOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { Card, Flex, Typography, Upload } from "antd";
import { createStyles } from "antd-style";
import { useCallback, useEffect, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useToastMessage } from "~/providers/toast-message-provider";
import { clipboardImageToFile } from "~/utils/file-reader.utils";

import { QRCodeDecoderResult } from "./qrcode-decoder-result";
import { QRCodeDecoderToolbar } from "./qrcode-decoder-toolbar";
import { isValidImageFile } from "./qrcode-decoder.utils";
import { useQRCodeDecode } from "./use-qrcode-decode";

const { Dragger } = Upload;

export const QrcodeDecoder = () => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();
  const { copyTextToClipboard } = useClipboardCopy();

  // Local state for file handling (File objects don't serialize well in Zustand)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { decodeResult, decode, isDecoding, resetDecode } = useQRCodeDecode();

  const processFile = useCallback(
    (file: File) => {
      if (!isValidImageFile(file)) {
        messageApi.error("Please select a valid image file (PNG, JPG, GIF, WebP, or BMP)");
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Clean up previous preview URL
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(newPreviewUrl);
      setFileList([{ uid: "-1", name: file.name, status: "done", url: newPreviewUrl }]);
      resetDecode();
    },
    [messageApi, previewUrl, resetDecode]
  );

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const { items } = e.clipboardData ?? {};
      if (!items) return;
      clipboardImageToFile({ items, onFile: processFile });
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [processFile]);

  const handleFileSelect = (file: File) => {
    processFile(file);
    return false;
  };

  const handleDecode = () => {
    if (!selectedFile) {
      messageApi.warning("Please select an image file first");
      return;
    }

    decode({ file: selectedFile });
  };

  const handleCopyResult = () => {
    if (decodeResult) {
      copyTextToClipboard({ text: decodeResult.text, successMessage: "Decoded text copied to clipboard!" });
    }
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up preview URL
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setFileList([]);
    resetDecode();
  };

  const hasImage = !!selectedFile;
  const hasResult = !!decodeResult;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<ScanOutlined />}
          title="QR Code Decoder"
          description="Decode QR codes from images. Upload an image or paste from clipboard to extract the encoded data."
        />

        <Card className={styles.uploadCard}>
          <Dragger
            name="qrcode"
            accept="image/*"
            multiple={false}
            maxCount={1}
            showUploadList={false}
            fileList={fileList}
            beforeUpload={handleFileSelect}
            className={styles.dragger}
          >
            {previewUrl ? (
              <div className={styles.previewContainer}>
                <img src={previewUrl} alt="QR Code preview" className={styles.previewImage} />
                <Typography.Text type="secondary" className={styles.fileName}>
                  {selectedFile?.name}
                </Typography.Text>
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag image to this area</p>
                <p className="ant-upload-hint">Supports PNG, JPG, GIF, WebP, and BMP formats</p>
              </div>
            )}
          </Dragger>
        </Card>

        <QRCodeDecoderToolbar
          hasImage={hasImage}
          hasResult={hasResult}
          isDecoding={isDecoding}
          onDecode={handleDecode}
          onCopyResult={handleCopyResult}
          onClear={handleClear}
        />

        <QRCodeDecoderResult result={decodeResult} previewUrl={previewUrl} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  fullWidth: {
    width: "100%",
  },
  uploadCard: {
    width: "100%",
  },
  dragger: {
    ".ant-upload-drag": {
      padding: 0,
    },
  },
  uploadPlaceholder: {
    padding: 24,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: 300,
    objectFit: "contain",
    borderRadius: token.borderRadius,
  },
  fileName: {
    fontSize: 12,
    fontFamily: "monospace",
  },
}));
