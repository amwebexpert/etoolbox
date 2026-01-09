import { CodeOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { HtmlEntitiesTable } from "./html-entities-table";
import { HtmlEntitiesToolbar } from "./html-entities-toolbar";

export const HtmlEntities = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="HTML Entities"
          description="Browse and search through HTML character entities with their codes, names, and Unicode values"
        />

        <HtmlEntitiesToolbar />
        <HtmlEntitiesTable />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
