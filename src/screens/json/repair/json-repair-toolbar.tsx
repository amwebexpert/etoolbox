import { ClearOutlined, CopyOutlined, DownloadOutlined, ToolOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

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
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear input and result">
          <Button icon={<ClearOutlined />} disabled={!hasInput && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy repaired JSON to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopy}>
            {!isMobile && "Copy"}
          </Button>
        </Tooltip>

        <Tooltip title="Save repaired JSON to file">
          <Button icon={<DownloadOutlined />} disabled={!hasResult} onClick={onSaveAs}>
            {isMobile ? "Save" : "Save As…"}
          </Button>
        </Tooltip>

        <Tooltip title="Attempt to repair malformed JSON">
          <Button type="primary" icon={<ToolOutlined />} disabled={!hasInput} loading={isRepairing} onClick={onRepair}>
            Repair
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
