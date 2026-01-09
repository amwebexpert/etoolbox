import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile } from "antd";
import { createStyles } from "antd-style";

const { Dragger } = Upload;

interface Base64FileDropzoneProps {
  fileList: UploadFile[];
  onFileSelect: (file: File) => boolean;
  onFileListChange: (fileList: UploadFile[]) => void;
}

export const Base64FileDropzone = ({ fileList, onFileSelect, onFileListChange }: Base64FileDropzoneProps) => {
  const { styles } = useStyles();

  return (
    <Dragger
      fileList={fileList}
      beforeUpload={onFileSelect}
      onChange={({ fileList }) => onFileListChange(fileList)}
      maxCount={1}
      accept="*/*"
      className={styles.dragger}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to encode</p>
      <p className="ant-upload-hint">Supports any file type. The file will be encoded to Base64.</p>
    </Dragger>
  );
};

const useStyles = createStyles(() => ({
  dragger: {
    marginBottom: 8,
  },
}));
