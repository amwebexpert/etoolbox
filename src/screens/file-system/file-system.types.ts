import type { OpfsEntryKind } from "~/utils/opfs.utils";

export interface FileSystemTreeNode {
  key: string;
  path: string;
  title: string;
  isLeaf: boolean;
  // eslint-disable-next-line coding-guide/prefer-props-with-children -- antd Tree's DataNode contract requires this exact field name
  children?: FileSystemTreeNode[];
}

type FileSystemModalMode = "create-folder" | "create-file" | "rename";

export interface FileSystemModalState {
  mode: FileSystemModalMode;
  open: boolean;
  targetName: string;
  targetKind?: OpfsEntryKind;
}
