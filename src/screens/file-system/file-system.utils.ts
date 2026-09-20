import { format } from "date-fns";
import mime from "mime";

import { formatBytesPretty } from "~/utils/number-format.utils";
import type { OpfsEntryMeta } from "~/utils/opfs.utils";

import type { FileSystemTreeNode } from "./file-system.types";

export const ROOT_PATH = "";
export const ROOT_KEY = "$root";

interface JoinOpfsPathArgs {
  parentPath: string;
  name: string;
}

export const joinOpfsPath = ({ parentPath, name }: JoinOpfsPathArgs): string =>
  parentPath ? `${parentPath}/${name}` : name;

// Used directly as an Array.prototype.sort / antd Table sorter callback, which mandates this exact (a, b) signature. habit-hooks-disable non-essential-comment
// eslint-disable-next-line coding-guide/max-params-project
export const compareEntriesFoldersFirst = (a: OpfsEntryMeta, b: OpfsEntryMeta): number => {
  if (a.kind !== b.kind) return a.kind === "directory" ? -1 : 1;
  return a.name.localeCompare(b.name);
};

export const formatEntrySize = (entry: OpfsEntryMeta): string =>
  entry.kind === "file" ? formatBytesPretty(entry.size ?? 0) : "—";

export const formatEntryModified = (entry: OpfsEntryMeta): string =>
  entry.lastModified ? format(new Date(entry.lastModified), "yyyy-MM-dd HH:mm:ss") : "—";

export const resolveOpfsMimeType = (name: string): string => mime.getType(name) ?? "application/octet-stream";

interface FindTreeNodeByKeyArgs {
  nodes: FileSystemTreeNode[];
  key: string;
}

export const findTreeNodeByKey = ({ nodes, key }: FindTreeNodeByKeyArgs): FileSystemTreeNode | undefined => {
  for (const node of nodes) {
    if (node.key === key) return node;

    const found = node.children ? findTreeNodeByKey({ nodes: node.children, key }) : undefined;
    if (found) return found;
  }

  return undefined;
};

interface BuildTreeNodeArgs {
  path: string;
  name: string;
}

export const buildTreeNode = ({ path, name }: BuildTreeNodeArgs): FileSystemTreeNode => ({
  key: path,
  path,
  title: name,
  isLeaf: false,
});
