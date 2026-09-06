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
          <Button aria-label="Swap" icon={<SwapOutlined />} disabled={!hasOutput} onClick={onSwap} />
        </Tooltip>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Copy result to clipboard">
            <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!hasOutput} onClick={onCopy}>
              {!isMobile && "Copy"}
            </Button>
          </Tooltip>

          <Button type="primary" aria-label="Encode" icon={<CodeOutlined />} disabled={!hasInput} onClick={onEncode}>
            {isMobile ? "Enc." : "Encode"}
          </Button>

          <Button type="primary" aria-label="Decode" icon={<UnlockOutlined />} disabled={!hasInput} onClick={onDecode}>
            {isMobile ? "Dec." : "Decode"}
          </Button>
        </Space>
      }
    />
  );
};
