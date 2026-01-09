import { CompressOutlined, CopyOutlined, DownloadOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface JsonFormatterToolbarProps {
  isMinified: boolean;
  hasContent: boolean;
  onToggleFormat: () => void;
  onCopy: () => void;
  onSaveAs: () => void;
}

export const JsonFormatterToolbar = ({
  isMinified,
  hasContent,
  onToggleFormat,
  onCopy,
  onSaveAs,
}: JsonFormatterToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title={isMinified ? "Format JSON with indentation" : "Minify JSON (remove whitespace)"}>
          <Button
            type="primary"
            icon={isMinified ? <FormatPainterOutlined /> : <CompressOutlined />}
            disabled={!hasContent}
            onClick={onToggleFormat}
          >
            {isMinified ? (isMobile ? "Format" : "Format") : isMobile ? "Minify" : "Minify"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy formatted JSON to clipboard">
          <Button icon={<CopyOutlined />} disabled={!hasContent} onClick={onCopy}>
            {!isMobile && "Copy"}
          </Button>
        </Tooltip>

        <Tooltip title="Save JSON to file">
          <Button icon={<DownloadOutlined />} disabled={!hasContent} onClick={onSaveAs}>
            {isMobile ? "Save" : "Save As…"}
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
