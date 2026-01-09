import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Typography, Upload } from "antd";
import { createStyles } from "antd-style";
import { Resizable } from "re-resizable";

import { useResponsive } from "~/hooks/use-responsive";

const { Dragger } = Upload;
const { Text } = Typography;

interface ImageOcrImageProps {
  imageDataUrl: string;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export const ImageOcrImage = ({ imageDataUrl, onFileSelect, onClear }: ImageOcrImageProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const handleBeforeUpload = (file: File) => {
    onFileSelect(file);
    return false; // Prevent automatic upload
  };

  const hasImage = isNotBlank(imageDataUrl);
  const defaultWidth = isMobile ? 280 : 400;

  if (hasImage) {
    return (
      <div className={styles.imageContainer}>
        <Resizable
          defaultSize={{ width: defaultWidth, height: "auto" }}
          minWidth={150}
          maxWidth="100%"
          lockAspectRatio
          enable={{
            top: false,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            right: { cursor: "ew-resize" },
            bottom: { cursor: "ns-resize" },
            bottomRight: { cursor: "nwse-resize" },
          }}
          className={styles.resizable}
        >
          <img src={imageDataUrl} alt="Image to process with OCR" className={styles.image} />
        </Resizable>

        <div className={styles.imageActions}>
          <Button icon={<DeleteOutlined />} danger size="small" onClick={onClear}>
            Remove image
          </Button>
          <Text type="secondary" className={styles.hint}>
            Drag corners to resize
          </Text>
        </div>
      </div>
    );
  }

  return (
    <Dragger
      name="image"
      accept="image/*"
      multiple={false}
      maxCount={1}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      className={styles.dragger}
    >
      <div className={styles.uploadContent}>
        <p className="ant-upload-drag-icon">
          <CameraOutlined className={styles.uploadIcon} />
        </p>
        <p className="ant-upload-text">Click or drag an image to this area</p>
        <p className="ant-upload-hint">You can also paste an image from clipboard (Ctrl+V / Cmd+V)</p>
      </div>
    </Dragger>
  );
};

const useStyles = createStyles(({ token }) => ({
  dragger: {
    ".ant-upload-drag": {
      padding: 0,
    },
  },
  uploadContent: {
    padding: 24,
  },
  uploadIcon: {
    fontSize: 48,
    color: token.colorPrimary,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 16,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgContainer,
  },
  resizable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: token.borderRadiusSM,
    display: "block",
  },
  imageActions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  hint: {
    fontSize: 12,
  },
}));
