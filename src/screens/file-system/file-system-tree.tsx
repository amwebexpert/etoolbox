import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import type { EventDataNode } from "antd/es/tree";
import { createStyles } from "antd-style";

import { useToastMessage } from "~/hooks/use-toast-message";

import { useFileSystemStore } from "./file-system.store";
import type { FileSystemTreeNode } from "./file-system.types";
import { ROOT_KEY, ROOT_PATH } from "./file-system.utils";

interface TreeSelectInfo {
  node: EventDataNode<FileSystemTreeNode>;
}

interface TreeIconRenderArgs {
  expanded?: boolean;
}

export const FileSystemTree = () => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();

  const { treeData, currentPath, loadTreeNodeChildren, navigateTo } = useFileSystemStore();

  const handleLoadData = async (node: EventDataNode<FileSystemTreeNode>): Promise<void> => {
    await loadTreeNodeChildren({ path: node.path });
  };

  // antd's Tree onSelect callback signature requires these two positional arguments. habit-hooks-disable non-essential-comment
  // eslint-disable-next-line coding-guide/max-params-project
  const handleSelect = (_selectedKeys: unknown, info: TreeSelectInfo): void => {
    navigateTo(info.node.path).catch((error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : "Failed to open folder.");
    });
  };

  const selectedKey = currentPath === ROOT_PATH ? ROOT_KEY : currentPath;

  return (
    <div className={styles.container}>
      <Tree<FileSystemTreeNode>
        treeData={treeData}
        loadData={handleLoadData}
        onSelect={handleSelect}
        selectedKeys={[selectedKey]}
        icon={({ expanded }: TreeIconRenderArgs) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />)}
        showIcon
        defaultExpandedKeys={[ROOT_KEY]}
      />
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    minWidth: 220,
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    paddingRight: token.paddingSM,
  },
}));
