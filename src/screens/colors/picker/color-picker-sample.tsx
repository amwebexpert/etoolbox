import { CopyOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

import type { ColorFormat } from "./color-picker.utils";

const { Text } = Typography;

interface ColorPickerSampleProps {
  format: ColorFormat;
}

export const ColorPickerSample = ({ format }: ColorPickerSampleProps) => {
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopy = () => {
    copyTextToClipboard({ text: format.value, successMessage: `Copied: ${format.value}` });
  };

  return (
    <Tooltip title={`Copy ${format.label}`}>
      <div className={styles.sampleCard} onClick={handleCopy}>
        <div className={styles.colorPreview} style={{ backgroundColor: format.backgroundColor }} />
        <div className={styles.sampleInfo}>
          <div className={styles.labelRow}>
            <CopyOutlined className={styles.copyIcon} />
            <Text type="secondary" className={styles.label}>
              {format.label}
            </Text>
          </div>
          <Text code className={styles.value}>
            {format.value}
          </Text>
        </div>
      </div>
    </Tooltip>
  );
};

const useStyles = createStyles(({ token }) => ({
  sampleCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    cursor: "pointer",
    transition: "border-color 0.2s",
    "&:hover": {
      borderColor: token.colorPrimary,
    },
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: token.borderRadius,
    border: `1px solid ${token.colorBorder}`,
    flexShrink: 0,
  },
  sampleInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  copyIcon: {
    fontSize: 11,
    color: token.colorTextSecondary,
  },
  label: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: 12,
    wordBreak: "break-all",
  },
}));
