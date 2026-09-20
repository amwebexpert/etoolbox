import { FolderOutlined } from "@ant-design/icons";
import { NO_OP } from "@lichens-innovation/ts-common";
import { Alert, Flex } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useFileSystemStore } from "./file-system.store";
import { FileSystemEntryModal } from "./file-system-entry-modal";
import { FileSystemTable } from "./file-system-table";
import { FileSystemToolbar } from "./file-system-toolbar";
import { FileSystemTree } from "./file-system-tree";

export const FileSystemExplorer = () => {
  const { styles } = useStyles();
  const { unsupportedError, init } = useFileSystemStore();

  useEffect(() => {
    init().catch(NO_OP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenContainer>
      <Flex vertical gap="small" className={styles.container}>
        <ScreenHeader
          icon={<FolderOutlined />}
          title="OPFS Explorer"
          description="Browse, create, and manage files and folders in the browser's private file system"
        />

        {unsupportedError ? (
          <Alert type="error" showIcon title="Unsupported browser" description={unsupportedError} />
        ) : (
          <>
            <FileSystemToolbar />
            <Flex gap="middle" className={styles.panels}>
              <FileSystemTree />
              <div className={styles.tablePanel}>
                <FileSystemTable />
              </div>
            </Flex>
            <FileSystemEntryModal />
          </>
        )}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  panels: {
    alignItems: "flex-start",
  },
  tablePanel: {
    flex: 1,
    minWidth: 0,
  },
}));
