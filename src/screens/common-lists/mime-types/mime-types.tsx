import { FileTextOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useMimeTypesStore } from "./mime-types.store";
import { MimeTypesTable } from "./mime-types-table";
import { MimeTypesToolbar } from "./mime-types-toolbar";
import { applyFiltering } from "./mime-types.utils";

export const MimeTypes = () => {
  const { styles } = useStyles();

  const { category, filter } = useMimeTypesStore();

  const deferredCategory = useDeferredValue(category);
  const deferredFilter = useDeferredValue(filter);

  const filteredMimeTypes = applyFiltering({ category: deferredCategory, filter: deferredFilter });

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<FileTextOutlined />}
          title="MIME Types"
          description="Browse and search through standard MIME types with their associated file extensions"
        />

        <MimeTypesToolbar filteredCount={filteredMimeTypes.length} />
        <MimeTypesTable filteredMimeTypes={filteredMimeTypes} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
