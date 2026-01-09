import { Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { NamedColorsCell } from "./named-colors-cell";
import { formatHexCode, formatRGB, type ColorInfo } from "./named-colors.utils";

const { Text } = Typography;

export const useNamedColorsColumns = (): ColumnsType<ColorInfo> => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  return [
    {
      title: "Name2",
      dataIndex: "htmlName",
      key: "htmlName",
      width: isMobile ? 120 : 200,
      render: (name: string, record: ColorInfo) => (
        <Tooltip title="Click to copy name">
          <div
            className={styles.nameCell}
            onClick={() => copyTextToClipboard({ text: name, successMessage: `Copied: ${name}` })}
          >
            <Text strong className={styles.colorName}>
              {name}
            </Text>
            <Tag color="default" className={styles.familyTag}>
              {record.family}
            </Tag>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "RGB",
      dataIndex: "rgbDecimal",
      key: "rgb",
      width: isMobile ? 140 : 180,
      render: (_: string, record: ColorInfo) => {
        const hexCode = formatHexCode(record);
        const rgbCode = formatRGB(record);
        return <NamedColorsCell value={rgbCode} hexCode={hexCode} tooltip="Click to copy RGB value" />;
      },
    },
    {
      title: "HEX",
      dataIndex: "hexCode",
      key: "hex",
      width: isMobile ? 100 : 140,
      render: (_: string, record: ColorInfo) => {
        const hexCode = formatHexCode(record);
        return <NamedColorsCell value={hexCode} hexCode={hexCode} tooltip="Click to copy HEX value" />;
      },
    },
  ];
};

const useStyles = createStyles(() => ({
  nameCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  colorName: {
    fontSize: 14,
  },
  familyTag: {
    fontSize: 11,
    marginRight: 0,
    width: "fit-content",
  },
}));
