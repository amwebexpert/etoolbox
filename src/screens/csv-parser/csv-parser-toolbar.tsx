import { ClearOutlined, CopyOutlined, DownloadOutlined, PlayCircleOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Segmented, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

import type { ViewMode } from "./csv-parser.types";

interface CsvParserToolbarProps {
  hasContent: boolean;
  hasResult: boolean;
  isParsing: boolean;
  viewMode: ViewMode;
  onParse: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const VIEW_MODE_OPTIONS = [
  { value: "json", label: "JSON", icon: <CopyOutlined /> },
  { value: "table", label: "Table", icon: <TableOutlined /> },
];

export const CsvParserToolbar = ({
  hasContent,
  hasResult,
  isParsing,
  viewMode,
  onParse,
  onCopy,
  onDownload,
  onClear,
  onViewModeChange,
}: CsvParserToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      leading={
        hasResult ? (
          <Segmented
            value={viewMode}
            onChange={(value) => onViewModeChange(value as ViewMode)}
            options={VIEW_MODE_OPTIONS}
            size="middle"
          />
        ) : undefined
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear all fields">
            <Button icon={<ClearOutlined />} disabled={!hasContent && !hasResult} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy parsed result to clipboard">
            <Button icon={<CopyOutlined />} disabled={!hasResult} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Tooltip title="Download as JSON file">
            <Button icon={<DownloadOutlined />} disabled={!hasResult} onClick={onDownload}>
              {!isMobile && "Save"}
            </Button>
          </Tooltip>

          <Tooltip title="Parse CSV content">
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              disabled={!hasContent}
              loading={isParsing}
              onClick={onParse}
            >
              {isParsing ? "Parsing..." : "Parse"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
