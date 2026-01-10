import { ApiOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { HttpStatusCodesTable } from "./http-status-codes-table";
import { HttpStatusCodesToolbar } from "./http-status-codes-toolbar";

export const HttpStatusCodes = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<ApiOutlined />}
          title="HTTP Status Codes"
          description="Browse and search through all standard HTTP response status codes with their official descriptions from MDN Web Docs"
        />

        <HttpStatusCodesToolbar />
        <HttpStatusCodesTable />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
