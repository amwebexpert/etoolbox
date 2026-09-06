import {
  CompressOutlined,
  CopyOutlined,
  DownloadOutlined,
  EyeOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Button, Segmented, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
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

  return (
    <ScreenToolbar
      leading={
        <Tooltip title="Choose how to display the formatted JSON" trigger={isMobile ? [] : ["hover"]}>
          <Segmented
            value={viewMode}
            onChange={(value) => onViewModeChange(value as ViewMode)}
            options={[
              {
                label: "Syntax Highlight",
                value: "syntax-highlight",
                icon: <FormatPainterOutlined />,
              },
              {
                label: "Interactive View",
                value: "react-json-view",
                icon: <EyeOutlined />,
              },
            ]}
            disabled={!hasContent}
          />
        </Tooltip>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip
            title={isMinified ? "Format JSON with indentation" : "Minify JSON (remove whitespace)"}
            trigger={isMobile ? [] : ["hover"]}
          >
            <Button
              type="primary"
              icon={isMinified ? <FormatPainterOutlined /> : <CompressOutlined />}
              disabled={!hasContent}
              onClick={onToggleFormat}
            >
              {isMinified ? "Format" : "Minify"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy formatted JSON to clipboard" trigger={isMobile ? [] : ["hover"]}>
            <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!hasContent} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Tooltip title="Save JSON to file" trigger={isMobile ? [] : ["hover"]}>
            <Button aria-label="Save As…" icon={<DownloadOutlined />} disabled={!hasContent} onClick={onSaveAs}>
              {isMobile ? "Save" : "Save As…"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
