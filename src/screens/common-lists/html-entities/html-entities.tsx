import { CodeOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useHtmlEntitiesStore } from "./html-entities.store";
import { HtmlEntitiesTable } from "./html-entities-table";
import { HtmlEntitiesToolbar } from "./html-entities-toolbar";
import { applyFiltering } from "./html-entities.utils";

export const HtmlEntities = () => {
  const { styles } = useStyles();

  const { category, filter, filterField } = useHtmlEntitiesStore();

  const deferredCategory = useDeferredValue(category);
  const deferredFilter = useDeferredValue(filter);
  const deferredFilterField = useDeferredValue(filterField);

  const filteredEntities = applyFiltering({
    category: deferredCategory,
    filter: deferredFilter,
    filterField: deferredFilterField,
  });

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="HTML Entities"
          description="Browse and search through HTML character entities with their codes, names, and Unicode values"
        />

        <HtmlEntitiesToolbar filteredCount={filteredEntities.length} />
        <HtmlEntitiesTable filteredEntities={filteredEntities} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
