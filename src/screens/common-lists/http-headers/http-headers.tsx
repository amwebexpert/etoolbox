import { GlobalOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { HttpHeadersTable } from "./http-headers-table";
import { HttpHeadersToolbar } from "./http-headers-toolbar";

export const HttpHeaders = () => {
  const { styles } = useStyles();

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<GlobalOutlined />}
          title="HTTP Headers"
          description="Browse and search through all standard HTTP headers with their official descriptions from MDN Web Docs"
        />

        <HttpHeadersToolbar />
        <HttpHeadersTable />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
