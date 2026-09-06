import { ClearOutlined, CopyOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface JsonConverterToolbarProps {
  hasContent: boolean;
  hasResult: boolean;
  isConverting: boolean;
  onConvert: () => void;
  onCopy: () => void;
  onClear: () => void;
}

export const JsonConverterToolbar = ({
  hasContent,
  hasResult,
  isConverting,
  onConvert,
  onCopy,
  onClear,
}: JsonConverterToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear all fields">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasContent && !hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy converted result to clipboard">
            <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Tooltip title="Convert source to target language">
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              disabled={!hasContent}
              loading={isConverting}
              onClick={onConvert}
            >
              Convert
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
