import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Typography, Upload } from "antd";
import { createStyles } from "antd-style";

import { ResizableImage } from "~/components/ui/resizable-image";

const { Dragger } = Upload;
const { Text } = Typography;

interface OcrImageProps {
  imageDataUrl: string;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export const OcrImage = ({ imageDataUrl, onFileSelect, onClear }: OcrImageProps) => {
  const { styles } = useStyles();

  const handleBeforeUpload = (file: File) => {
    onFileSelect(file);
    return false;
  };

  const hasImage = isNotBlank(imageDataUrl);

  if (hasImage) {
    return (
      <div className={styles.imageContainer}>
        <ResizableImage
          src={imageDataUrl}
          alt="Image to process with OCR"
          footer={
            <div className={styles.imageActions}>
              <Button icon={<DeleteOutlined />} danger size="small" onClick={onClear}>
                Remove image
              </Button>
              <Text type="secondary" className={styles.hint}>
                Drag corners to resize
              </Text>
            </div>
          }
        />
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
