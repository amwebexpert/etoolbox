import { CodeOutlined, CopyOutlined, SwapOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface EncodeDecodeToolbarArgs {
  hasInput: boolean;
  hasOutput: boolean;
  onSwap: () => void;
  onCopy: () => void;
  onEncode: () => void;
  onDecode: () => void;
}

export const EncodeDecodeToolbar = ({
  hasInput,
  hasOutput,
  onSwap,
  onCopy,
  onEncode,
  onDecode,
}: EncodeDecodeToolbarArgs) => {
  const { isMobile } = useResponsive();

  return (
    <ScreenToolbar
      leading={
        <Tooltip title="Swap: put result into input">
          <Button icon={<SwapOutlined />} disabled={!hasOutput} onClick={onSwap} />
        </Tooltip>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Copy result to clipboard">
            <Button icon={<CopyOutlined />} disabled={!hasOutput} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Button type="primary" icon={<CodeOutlined />} disabled={!hasInput} onClick={onEncode}>
            {isMobile ? "Enc." : "Encode"}
          </Button>

          <Button type="primary" icon={<UnlockOutlined />} disabled={!hasInput} onClick={onDecode}>
            {isMobile ? "Dec." : "Decode"}
          </Button>
        </Space>
      }
    />
  );
};
