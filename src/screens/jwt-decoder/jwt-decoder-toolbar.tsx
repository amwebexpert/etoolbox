import { ClearOutlined, CopyOutlined, FileTextOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { formatJson, SAMPLE_JWT_TOKENS } from "./jwt-decoder.utils";
import type { DecodedJwt } from "./jwt-decoder.utils";

interface JwtDecoderToolbarProps {
  hasToken: boolean;
  decoded: DecodedJwt;
  onLoadSample: (token: string) => void;
  onClear: () => void;
}

export const JwtDecoderToolbar = ({ hasToken, decoded, onLoadSample, onClear }: JwtDecoderToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopyHeader = () => {
    copyTextToClipboard({
      text: formatJson(decoded.header),
      successMessage: "Header copied to clipboard!",
    });
  };

  const handleCopyPayload = () => {
    copyTextToClipboard({
      text: formatJson(decoded.payload),
      successMessage: "Payload copied to clipboard!",
    });
  };

  const handleCopyAll = () => {
    const combined = {
      header: decoded.header,
      payload: decoded.payload,
    };
    copyTextToClipboard({
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
    <div className={styles.toolbar}>
      <Space size="small" wrap>
        <Dropdown menu={{ items: sampleMenuItems }} placement="bottomLeft">
          <Button icon={<FileTextOutlined />}>{!isMobile && "Load Sample"}</Button>
        </Dropdown>
      </Space>

      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear token">
          <Button icon={<ClearOutlined />} disabled={!hasToken} onClick={onClear}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Dropdown menu={{ items: copyMenuItems }} placement="bottomRight" disabled={!decoded.isValid}>
          <Tooltip title="Copy decoded JWT">
            <Button icon={<CopyOutlined />} disabled={!decoded.isValid}>
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
