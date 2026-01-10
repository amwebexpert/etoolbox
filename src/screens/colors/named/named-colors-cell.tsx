import { CopyOutlined } from "@ant-design/icons";
import { getContrastTextColor } from "@lichens-innovation/ts-common";
import { Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

const { Text } = Typography;

interface NamedColorsCellProps {
  value: string;
  hexCode: string;
  tooltip: string;
}

export const NamedColorsCell = ({ value, hexCode, tooltip }: NamedColorsCellProps) => {
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();
  const textColor = getContrastTextColor(hexCode);

  const handleCopy = () => {
    copyTextToClipboard({ text: value, successMessage: `Copied: ${value}` });
  };

  return (
    <Tooltip title={tooltip}>
      <div className={styles.colorCell} style={{ backgroundColor: hexCode }} onClick={handleCopy}>
        <Text className={styles.colorText} style={{ color: textColor }}>
          {value}
        </Text>
        <CopyOutlined className={styles.copyIcon} style={{ color: textColor }} />
      </div>
    </Tooltip>
  );
};

const useStyles = createStyles(({ token }) => ({
  colorCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: 2,
    paddingInline: 8,
    borderRadius: token.borderRadius,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      opacity: 0.9,
      transform: "scale(1.02)",
    },
    "&:hover $copyIcon": {
      opacity: 1,
    },
  },
  colorText: {
    fontFamily: "monospace",
    fontWeight: 500,
  },
  copyIcon: {
    opacity: 0.6,
    transition: "opacity 0.2s ease",
  },
}));
