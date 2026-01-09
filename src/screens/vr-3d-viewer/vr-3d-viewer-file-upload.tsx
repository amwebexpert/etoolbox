import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Typography, Upload } from "antd";
import type { UploadProps } from "antd";
import { createStyles } from "antd-style";
import { useRef } from "react";

import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";

import type { ModelFileInfo } from "./vr-3d-viewer.types";
import { ACCEPT_3D_FILES, SUPPORTED_EXTENSIONS } from "./vr-3d-viewer.types";
import { createModelFileInfo, formatModelInfo, isSupportedFormat } from "./vr-3d-viewer.utils";

const { Dragger } = Upload;

interface Vr3dViewerFileUploadProps {
  modelFile: ModelFileInfo | null;
  onFileLoaded: (fileInfo: ModelFileInfo) => void;
}

export const Vr3dViewerFileUpload = ({ modelFile, onFileLoaded }: Vr3dViewerFileUploadProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!isSupportedFormat(file.name)) {
      messageApi.error(`Unsupported file format. Supported: ${SUPPORTED_EXTENSIONS.join(", ")}`);
      return;
    }

    const fileInfo = createModelFileInfo(file);
    onFileLoaded(fileInfo);
    messageApi.success(`Loaded: ${file.name}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
    // Reset input to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadProps: UploadProps = {
    name: "model",
    multiple: false,
    accept: ACCEPT_3D_FILES,
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileChange(file);
      return false; // Prevent auto upload
    },
  };

  const fileInfoText = formatModelInfo(modelFile);

  // Use simple button on mobile for better UX
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_3D_FILES}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
        <Button icon={<UploadOutlined />} onClick={() => fileInputRef.current?.click()} className={styles.uploadButton}>
          Select 3D Model
        </Button>
        {fileInfoText && (
          <Typography.Text type="secondary" className={styles.fileInfo}>
            {fileInfoText}
          </Typography.Text>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Dragger {...uploadProps} className={styles.dragger}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag a 3D model file here</p>
        <p className="ant-upload-hint">Supports: {SUPPORTED_EXTENSIONS.join(", ")}</p>
      </Dragger>
      {fileInfoText && (
        <Typography.Text type="secondary" className={styles.fileInfoDesktop}>
          Current: {fileInfoText}
        </Typography.Text>
      )}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
  },
  dragger: {
    padding: token.paddingSM,
    "& .ant-upload-drag-icon": {
      marginBottom: 8,
    },
    "& .ant-upload-text": {
      fontSize: 14,
    },
    "& .ant-upload-hint": {
      fontSize: 12,
    },
  },
  uploadButton: {
    marginRight: 12,
  },
  fileInfo: {
    fontSize: 12,
  },
  fileInfoDesktop: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
  },
}));
