import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface DataUriToolbarProps {
  hasContent: boolean;
  canDownload: boolean;
  onClear: () => void;
  onDownload: () => void;
}

export const DataUriToolbar = ({ hasContent, canDownload, onClear, onDownload }: DataUriToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      leading={
        <Button onClick={onClear} disabled={!hasContent}>
          Clear
        </Button>
      }
      actions={
        <Tooltip title="Download the decoded image">
          <Button
            type="primary"
            aria-label="Download"
            icon={<DownloadOutlined />}
            disabled={!canDownload}
            onClick={onDownload}
          >
            {isMobile ? "DL" : "Download"}
          </Button>
        </Tooltip>
      }
    />
  );
};
