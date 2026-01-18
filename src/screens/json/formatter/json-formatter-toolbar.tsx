import {
  CompressOutlined,
  CopyOutlined,
  DownloadOutlined,
  EyeOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip, Segmented } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import type { ViewMode } from "./json-formatter.types";

interface JsonFormatterToolbarProps {
  isMinified: boolean;
  hasContent: boolean;
  viewMode: ViewMode;
  onToggleFormat: () => void;
  onCopy: () => void;
  onSaveAs: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const JsonFormatterToolbar = ({
  isMinified,
  hasContent,
  viewMode,
  onToggleFormat,
  onCopy,
  onSaveAs,
  onViewModeChange,
}: JsonFormatterToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <Tooltip title="Choose how to display the formatted JSON">
        <Segmented
          value={viewMode}
          onChange={(value) => onViewModeChange(value as ViewMode)}
          options={[
            {
              label: isMobile ? "Syntax" : "Syntax Highlight",
              value: "syntax-highlight",
              icon: <FormatPainterOutlined />,
            },
            {
              label: isMobile ? "Interactive" : "Interactive View",
              value: "react-json-view",
              icon: <EyeOutlined />,
            },
          ]}
          disabled={!hasContent}
        />
      </Tooltip>

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
