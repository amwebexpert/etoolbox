import { ClearOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, Upload } from "antd";
import type { RcFile } from "antd/es/upload";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface ColorPickerToolbarProps {
  hasImage: boolean;
  onClear: () => void;
  onFileSelect: (file: File) => void;
}

export const ColorPickerToolbar = ({ hasImage, onClear, onFileSelect }: ColorPickerToolbarProps) => {
  const { isMobile } = useResponsive();

  const handleBeforeUpload = (file: RcFile) => {
    onFileSelect(file);
    return false;
  };

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear image">
            <Button icon={<ClearOutlined />} disabled={!hasImage} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Upload accept="image/*" showUploadList={false} beforeUpload={handleBeforeUpload}>
            <Tooltip title="Select image from file">
              <Button type="primary" icon={<UploadOutlined />}>
                {isMobile ? "Image" : "Select Image"}
              </Button>
            </Tooltip>
          </Upload>
        </Space>
      }
    />
  );
};
