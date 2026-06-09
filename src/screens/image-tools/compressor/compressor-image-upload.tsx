import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";

import { useToastMessage } from "~/hooks/use-toast-message";

import { extractImageFromClipboardItems, isImageFile } from "./compressor.utils";

const { Dragger } = Upload;

const INVALID_FILE_MESSAGE = "Please provide an image file.";

interface CompressorImageUploadProps {
  onFileSelect: (file: File) => void;
}

export const CompressorImageUpload = ({ onFileSelect }: CompressorImageUploadProps) => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();

  const handleFileCandidate = (file: File): void => {
    if (!isImageFile(file)) {
      messageApi.error(INVALID_FILE_MESSAGE);
      return;
    }

    onFileSelect(file);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent): void => {
      const items = event.clipboardData?.items;
      if (!items) return;

      const file = extractImageFromClipboardItems(Array.from(items));
      if (!file) {
        messageApi.error(INVALID_FILE_MESSAGE);
        return;
      }

      onFileSelect(file);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [messageApi, onFileSelect]);

  const uploadProps: UploadProps = {
    name: "image",
    multiple: false,
    accept: "image/*",
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileCandidate(file);
      return false;
    },
  };

  return (
    <Dragger {...uploadProps} className={styles.dragger}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag an image here</p>
      <p className="ant-upload-hint">You can also paste an image from the clipboard</p>
    </Dragger>
  );
};

const useStyles = createStyles(({ token }) => ({
  dragger: {
    padding: token.paddingSM,
  },
}));
