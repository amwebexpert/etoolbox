import { GlobalOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { HttpHeadersTable } from "./http-headers-table";
import { HttpHeadersToolbar } from "./http-headers-toolbar";
import { useHttpHeadersStore } from "./http-headers.store";
import { applyFiltering } from "./http-headers.utils";

export const HttpHeaders = () => {
  const { styles } = useStyles();

  const { category, type, filter } = useHttpHeadersStore();
  const deferredCategory = useDeferredValue(category);
  const deferredType = useDeferredValue(type);
  const deferredFilter = useDeferredValue(filter);

  const filteredHeaders = applyFiltering({
    category: deferredCategory,
    type: deferredType,
    filter: deferredFilter,
  });

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<GlobalOutlined />}
          title="HTTP Headers"
          description="Browse and search through all standard HTTP headers with their official descriptions from MDN Web Docs"
        />

        <HttpHeadersToolbar filteredCount={filteredHeaders.length} />
        <HttpHeadersTable filteredHeaders={filteredHeaders} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
}));
