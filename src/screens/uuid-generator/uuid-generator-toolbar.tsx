import { ClearOutlined, CopyOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { useGeneratedUuids } from "./uuid-generator.store";

interface UuidGeneratorToolbarProps {
  hasResult: boolean;
  onGenerate: () => void;
  onClear: () => void;
}

export const UuidGeneratorToolbar = ({ hasResult, onGenerate, onClear }: UuidGeneratorToolbarProps) => {
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();
  const generated = useGeneratedUuids();

  const handleCopy = () => {
    void copyTextToClipboard({ text: generated, successMessage: "UUIDs copied to clipboard!" });
  };

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear generated UUIDs">
            <Button icon={<ClearOutlined />} disabled={!hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy UUIDs to clipboard">
            <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={handleCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Tooltip title="Generate new UUIDs">
            <Button type="primary" icon={<ThunderboltOutlined />} onClick={onGenerate}>
              Generate
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
