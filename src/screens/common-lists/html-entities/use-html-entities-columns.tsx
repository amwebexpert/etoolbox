import { Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { CATEGORY_LABELS } from "./html-entities.constants";
import type { HtmlEntity, HtmlEntityCategory } from "./html-entities.types";
import { formatCodePoint } from "./html-entities.utils";
import { HtmlEntityCopyableCell } from "./html-entities-copyable-cell";
import { CATEGORY_COLORS, useHtmlEntitiesColumnsStyles } from "./use-html-entities-columns.styles";

const { Text } = Typography;

export const useHtmlEntitiesColumns = (): ColumnsType<HtmlEntity> => {
  const { styles } = useHtmlEntitiesColumnsStyles();
  const { isMobile, isTablet } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopy = (text: string) => {
    void copyTextToClipboard({ text, successMessage: `Copied: ${text}` });
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
          <HtmlEntityCopyableCell
            displayValue={<Text className={styles.characterText}>{displayChar}</Text>}
            copyValue={character}
            tooltip="Click to copy character"
            onCopy={handleCopy}
            cellClassName={styles.characterCell}
            iconClassName={styles.copyIconSmall}
          />
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
          <HtmlEntityCopyableCell
            displayValue={
              <Text code className={styles.entityText}>
                {entityName}
              </Text>
            }
            copyValue={entityName}
            tooltip="Click to copy entity name"
            onCopy={handleCopy}
            cellClassName={styles.entityCell}
            iconClassName={styles.copyIcon}
          />
        );
      },
    },
    {
      title: "Number",
      dataIndex: "entityNumber",
      key: "entityNumber",
      width: isMobile ? 80 : 100,
      render: (entityNumber: string) => (
        <HtmlEntityCopyableCell
          displayValue={
            <Text code className={styles.numberText}>
              {entityNumber}
            </Text>
          }
          copyValue={entityNumber}
          tooltip="Click to copy entity number"
          onCopy={handleCopy}
          cellClassName={styles.entityCell}
          iconClassName={styles.copyIcon}
        />
      ),
    },
  ];

  if (!isMobile) {
    columns.push({
      title: "Unicode",
      dataIndex: "entityNumber",
      key: "unicode",
      width: 90,
      render: (entityNumber: string) => {
        const unicode = formatCodePoint(entityNumber);
        return (
          <HtmlEntityCopyableCell
            displayValue={
              <Text type="secondary" className={styles.unicodeText}>
                {unicode}
              </Text>
            }
            copyValue={unicode}
            tooltip="Click to copy Unicode code point"
            onCopy={handleCopy}
            cellClassName={styles.entityCell}
            iconClassName={styles.copyIconSmall}
          />
        );
      },
    });
  }

  columns.push({
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: isMobile ? 100 : undefined,
    sorter: (a, b) => a.description.localeCompare(b.description),
    render: (description: string) => <Text className={styles.descriptionText}>{description}</Text>,
  });

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
