import { CopyOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { CATEGORY_LABELS } from "./html-entities.constants";
import type { HtmlEntity, HtmlEntityCategory } from "./html-entities.types";
import { formatCodePoint } from "./html-entities.utils";

const { Text } = Typography;

const CATEGORY_COLORS: Record<HtmlEntityCategory, string> = {
  all: "default",
  letters: "blue",
  "letters-accented": "cyan",
  numbers: "green",
  punctuation: "orange",
  math: "purple",
  greek: "magenta",
  currency: "gold",
  arrows: "geekblue",
  symbols: "volcano",
  whitespace: "default",
};

export const useHtmlEntitiesColumns = (): ColumnsType<HtmlEntity> => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopy = (text: string) => {
    copyTextToClipboard({ text, successMessage: `Copied: ${text}` });
  };

  const columns: ColumnsType<HtmlEntity> = [
    {
      title: "Char",
      dataIndex: "character",
      key: "character",
      width: isMobile ? 50 : 70,
      align: "center",
      render: (character: string) => {
        const displayChar = character.trim() === "" ? "␣" : character;
        return (
          <Tooltip title="Click to copy character">
            <div className={styles.characterCell} onClick={() => handleCopy(character)}>
              <Text className={styles.characterText}>{displayChar}</Text>
              <CopyOutlined className={styles.copyIconSmall} />
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Entity Name",
      dataIndex: "entityName",
      key: "entityName",
      width: isMobile ? 100 : 140,
      sorter: (a, b) => a.entityName.localeCompare(b.entityName),
      render: (entityName: string) => {
        if (!entityName) {
          return <Text type="secondary">—</Text>;
        }
        return (
          <Tooltip title="Click to copy entity name">
            <div className={styles.entityCell} onClick={() => handleCopy(entityName)}>
              <Text code className={styles.entityText}>
                {entityName}
              </Text>
              <CopyOutlined className={styles.copyIcon} />
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Number",
      dataIndex: "entityNumber",
      key: "entityNumber",
      width: isMobile ? 80 : 100,
      render: (entityNumber: string) => (
        <Tooltip title="Click to copy entity number">
          <div className={styles.entityCell} onClick={() => handleCopy(entityNumber)}>
            <Text code className={styles.numberText}>
              {entityNumber}
            </Text>
            <CopyOutlined className={styles.copyIcon} />
          </div>
        </Tooltip>
      ),
    },
  ];

  // Add Unicode column for non-mobile
  if (!isMobile) {
    columns.push({
      title: "Unicode",
      dataIndex: "entityNumber",
      key: "unicode",
      width: 90,
      render: (entityNumber: string) => {
        const unicode = formatCodePoint(entityNumber);
        return (
          <Tooltip title="Click to copy Unicode code point">
            <div className={styles.entityCell} onClick={() => handleCopy(unicode)}>
              <Text type="secondary" className={styles.unicodeText}>
                {unicode}
              </Text>
              <CopyOutlined className={styles.copyIconSmall} />
            </div>
          </Tooltip>
        );
      },
    });
  }

  // Add description column (hidden on mobile)
  if (!isMobile) {
    columns.push({
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (description: string) => <Text className={styles.descriptionText}>{description}</Text>,
    });
  }

  // Add category tag column (hidden on small devices)
  if (!isMobile && !isTablet) {
    columns.push({
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      filters: Object.entries(CATEGORY_LABELS)
        .filter(([key]) => key !== "all")
        .map(([value, text]) => ({ text, value })),
      onFilter: (value, record) => record.category === value,
      render: (category: HtmlEntityCategory) => (
        <Tag color={CATEGORY_COLORS[category]} className={styles.categoryTag}>
          {CATEGORY_LABELS[category]}
        </Tag>
      ),
    });
  }

  return columns;
};

const useStyles = createStyles(({ token }) => ({
  characterCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  characterText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1,
  },
  entityCell: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  entityText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  numberText: {
    fontSize: 11,
    fontFamily: "monospace",
  },
  unicodeText: {
    fontSize: 11,
    fontFamily: "monospace",
  },
  descriptionText: {
    fontSize: 13,
  },
  categoryTag: {
    fontSize: 11,
    marginRight: 0,
  },
  copyIcon: {
    opacity: 0.4,
    fontSize: 12,
    color: token.colorTextSecondary,
    flexShrink: 0,
  },
  copyIconSmall: {
    opacity: 0.3,
    fontSize: 10,
    color: token.colorTextSecondary,
    flexShrink: 0,
  },
}));
