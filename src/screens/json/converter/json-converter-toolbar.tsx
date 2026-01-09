import { ClearOutlined, CopyOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

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
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear all fields">
          <Button icon={<ClearOutlined />} disabled={!hasContent && !hasResult} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy converted result to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopy}>
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
