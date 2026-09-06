import { ClearOutlined, CopyOutlined, DownloadOutlined, ToolOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface JsonRepairToolbarProps {
  hasInput: boolean;
  hasResult: boolean;
  isRepairing: boolean;
  onRepair: () => void;
  onCopy: () => void;
  onSaveAs: () => void;
  onClear: () => void;
}

export const JsonRepairToolbar = ({
  hasInput,
  hasResult,
  isRepairing,
  onRepair,
  onCopy,
  onSaveAs,
  onClear,
}: JsonRepairToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear input and result">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasInput && !hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy repaired JSON to clipboard">
            <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Tooltip title="Save repaired JSON to file">
            <Button aria-label="Save As…" icon={<DownloadOutlined />} disabled={!hasResult} onClick={onSaveAs}>
              {isMobile ? "Save" : "Save As…"}
            </Button>
          </Tooltip>

          <Tooltip title="Attempt to repair malformed JSON">
            <Button
              type="primary"
              icon={<ToolOutlined />}
              disabled={!hasInput}
              loading={isRepairing}
              onClick={onRepair}
            >
              Repair
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
