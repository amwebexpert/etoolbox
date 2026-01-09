import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { createStyles } from "antd-style";
import { useRef } from "react";

import { FILE_ENCODING_OPTIONS } from "../csv-parser.types";
import { formatFileInfo, readFileAsTextWithEncoding } from "../csv-parser.utils";
import type { FileInfo } from "../csv-parser.types";

interface CsvFileUploadProps {
  fileEncoding: string;
  fileInfo: FileInfo | null;
  onEncodingChange: (encoding: string) => void;
  onFileLoaded: (content: string, fileInfo: FileInfo) => void;
}

export const CsvFileUpload = ({ fileEncoding, fileInfo, onEncodingChange, onFileLoaded }: CsvFileUploadProps) => {
  const { styles } = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await readFileAsTextWithEncoding({
        file,
        encoding: fileEncoding,
      });
      onFileLoaded(content, { name: file.name, size: file.size });
    } catch (error) {
      console.error("Failed to read file:", error);
    }

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileInfoText = formatFileInfo(fileInfo);

  return (
    <Row gutter={[16, 0]} align="bottom">
      <Col xs={24} sm={12} md={8}>
        <Form.Item label="File encoding" className={styles.formItem}>
          <Select
            value={fileEncoding}
            onChange={onEncodingChange}
            options={FILE_ENCODING_OPTIONS.map((enc) => ({
              value: enc.name,
              label: `${enc.label} (${enc.name})`,
            }))}
            showSearch={{ optionFilterProp: "label" }}
            className={styles.select}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item className={styles.formItem}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv,application/csv"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <Button
            icon={<UploadOutlined />}
            onClick={() => fileInputRef.current?.click()}
            className={styles.uploadButton}
          >
            Select CSV File
          </Button>
          {fileInfoText && (
            <Typography.Text type="secondary" className={styles.fileInfo}>
              {fileInfoText}
            </Typography.Text>
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};

const useStyles = createStyles(() => ({
  formItem: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  uploadButton: {
    marginRight: 12,
  },
  fileInfo: {
    fontSize: 12,
  },
}));
