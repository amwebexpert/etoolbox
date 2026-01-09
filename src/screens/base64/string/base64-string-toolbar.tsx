import { CodeOutlined, CopyOutlined, SwapOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

interface Base64StringToolbarProps {
  hasInput: boolean;
  hasOutput: boolean;
  onSwap: () => void;
  onCopy: () => void;
  onEncode: () => void;
  onDecode: () => void;
}

export const Base64StringToolbar = ({
  hasInput,
  hasOutput,
  onSwap,
  onCopy,
  onEncode,
  onDecode,
}: Base64StringToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  return (
    <div className={styles.toolbar}>
      <Tooltip title="Swap: put result into input">
        <Button icon={<SwapOutlined />} disabled={!hasOutput} onClick={onSwap} />
      </Tooltip>

      <div className={styles.spacer} />

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
