import { ClearOutlined, CopyOutlined, FileTextOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { type DecodedJwt, formatJson, SAMPLE_JWT_TOKENS } from "./jwt-decoder.utils";

interface JwtDecoderToolbarProps {
  hasToken: boolean;
  decoded: DecodedJwt;
  onLoadSample: (token: string) => void;
  onClear: () => void;
}

export const JwtDecoderToolbar = ({ hasToken, decoded, onLoadSample, onClear }: JwtDecoderToolbarProps) => {
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopyHeader = () => {
    void copyTextToClipboard({
      text: formatJson(decoded.header),
      successMessage: "Header copied to clipboard!",
    });
  };

  const handleCopyPayload = () => {
    void copyTextToClipboard({
      text: formatJson(decoded.payload),
      successMessage: "Payload copied to clipboard!",
    });
  };

  const handleCopyAll = () => {
    const combined = {
      header: decoded.header,
      payload: decoded.payload,
    };
    void copyTextToClipboard({
      text: formatJson(combined),
      successMessage: "Decoded JWT copied to clipboard!",
    });
  };

  const sampleMenuItems: MenuProps["items"] = [
    {
      key: "basic",
      label: "Basic JWT (valid)",
      onClick: () => onLoadSample(SAMPLE_JWT_TOKENS.basic),
    },
    {
      key: "expired",
      label: "Expired JWT",
      onClick: () => onLoadSample(SAMPLE_JWT_TOKENS.expired),
    },
  ];

  const copyMenuItems: MenuProps["items"] = [
    {
      key: "header",
      label: "Copy Header",
      onClick: handleCopyHeader,
      disabled: !decoded.isValid,
    },
    {
      key: "payload",
      label: "Copy Payload",
      onClick: handleCopyPayload,
      disabled: !decoded.isValid,
    },
    {
      type: "divider",
    },
    {
      key: "all",
      label: "Copy All",
      onClick: handleCopyAll,
      disabled: !decoded.isValid,
    },
  ];

  return (
    <ScreenToolbar
      leading={
        <Space size="small" wrap>
          <Dropdown menu={{ items: sampleMenuItems }} placement="bottomLeft">
            <Button aria-label="Load Sample" icon={<FileTextOutlined />}>
              {!isMobile && "Load Sample"}
            </Button>
          </Dropdown>
        </Space>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear token">
            <Button aria-label="Clear" icon={<ClearOutlined />} disabled={!hasToken} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Dropdown menu={{ items: copyMenuItems }} placement="bottomRight" disabled={!decoded.isValid}>
            <Tooltip title="Copy decoded JWT">
              <Button aria-label="Copy" icon={<CopyOutlined />} disabled={!decoded.isValid}>
                {!isMobile && "Copy"}
              </Button>
            </Tooltip>
          </Dropdown>

          <Tooltip title="Token is automatically decoded as you type">
            <Button type="primary" icon={<UnlockOutlined />} disabled={!hasToken || decoded.isValid}>
              {decoded.isValid ? "Decoded" : "Decode"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
