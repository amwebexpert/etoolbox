import { ClearOutlined, ExpandOutlined, ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface Vr3dViewerToolbarProps {
  hasModel: boolean;
  isLoading: boolean;
  showSettings: boolean;
  onToggleSettings: () => void;
  onResetCamera: () => void;
  onFullscreen: () => void;
  onClear: () => void;
}

export const Vr3dViewerToolbar = ({
  hasModel,
  isLoading,
  showSettings,
  onToggleSettings,
  onResetCamera,
  onFullscreen,
  onClear,
}: Vr3dViewerToolbarProps) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      actions={
        <Space size="small" wrap>
          <Tooltip title="Toggle settings panel">
            <Button icon={<SettingOutlined />} type={showSettings ? "primary" : "default"} onClick={onToggleSettings}>
              {!isMobile && "Settings"}
            </Button>
          </Tooltip>

          <Tooltip title="Reset camera view">
            <Button icon={<ReloadOutlined />} disabled={!hasModel || isLoading} onClick={onResetCamera}>
              {!isMobile && "Reset View"}
            </Button>
          </Tooltip>

          <Tooltip title="Toggle fullscreen">
            <Button icon={<ExpandOutlined />} disabled={!hasModel || isLoading} onClick={onFullscreen}>
              {!isMobile && "Fullscreen"}
            </Button>
          </Tooltip>

          <Tooltip title="Clear current model">
            <Button icon={<ClearOutlined />} disabled={!hasModel || isLoading} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
