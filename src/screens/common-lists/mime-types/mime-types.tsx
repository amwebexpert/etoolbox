import { FileTextOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { MimeTypesTable } from "./mime-types-table";
import { MimeTypesToolbar } from "./mime-types-toolbar";

export const MimeTypes = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<FileTextOutlined />}
          title="MIME Types"
          description="Browse and search through standard MIME types with their associated file extensions"
        />

        <MimeTypesToolbar />
        <MimeTypesTable />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
