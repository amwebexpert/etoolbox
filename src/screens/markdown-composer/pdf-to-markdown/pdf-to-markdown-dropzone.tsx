import { InboxOutlined } from "@ant-design/icons";
import { Upload, type UploadFile } from "antd";

const { Dragger } = Upload;

interface PdfToMarkdownDropzoneProps {
  fileList: UploadFile[];
  onFileSelect: (file: File) => boolean;
  onFileListChange: (fileList: UploadFile[]) => void;
}

export const PdfToMarkdownDropzone = ({ fileList, onFileSelect, onFileListChange }: PdfToMarkdownDropzoneProps) => (
  <Dragger
    fileList={fileList}
    beforeUpload={onFileSelect}
    onChange={({ fileList }) => onFileListChange(fileList)}
    maxCount={1}
    accept=".pdf,application/pdf"
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag a PDF file to this area</p>
    <p className="ant-upload-hint">
      Text-based PDFs only (scanned documents have no text layer). The file never leaves your browser.
    </p>
  </Dragger>
);
