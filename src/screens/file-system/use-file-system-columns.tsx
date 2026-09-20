import { DeleteOutlined, DownloadOutlined, EditOutlined, FolderOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, Typography } from "antd";
import type { HookAPI } from "antd/es/modal/useModal";
import type { ColumnsType } from "antd/es/table";

import { useToastMessage } from "~/hooks/use-toast-message";
import type { OpfsEntryMeta } from "~/utils/opfs.utils";

import { useFileSystemStore } from "./file-system.store";
import {
  compareEntriesFoldersFirst,
  formatEntryModified,
  formatEntrySize,
  resolveOpfsMimeType,
} from "./file-system.utils";
import { FileTypeIcon } from "./file-system-type-icon";

const { Text } = Typography;

export const useFileSystemColumns = (modal: HookAPI): ColumnsType<OpfsEntryMeta> => {
  const messageApi = useToastMessage();
  const { openRenameModal, countEntryContents, deleteEntry, downloadEntry } = useFileSystemStore();

  const handleDelete = async (entry: OpfsEntryMeta): Promise<void> => {
    const itemCount = await countEntryContents({ name: entry.name, kind: entry.kind });
    const content =
      entry.kind === "directory" && itemCount > 0
        ? `This folder contains ${itemCount} item${itemCount === 1 ? "" : "s"}. This action cannot be undone.`
        : "This action cannot be undone.";

    modal.confirm({
      title: `Delete "${entry.name}"?`,
      content,
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteEntry(entry);
        } catch (error) {
          messageApi.error(error instanceof Error ? error.message : "Failed to delete.");
        }
      },
    });
  };

  const handleDownload = async (entry: OpfsEntryMeta): Promise<void> => {
    try {
      await downloadEntry(entry);
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : "Failed to download.");
    }
  };

  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: compareEntriesFoldersFirst,
      defaultSortOrder: "ascend",
      render: (name: string, entry: OpfsEntryMeta) => (
        <Space size="small">
          {entry.kind === "directory" ? <FolderOutlined /> : <FileTypeIcon mimeType={resolveOpfsMimeType(name)} />}
          <Text>{name}</Text>
        </Space>
      ),
    },
    {
      title: "Type",
      key: "kind",
      width: 200,
      sorter: (a, b) => {
        if (a.kind !== b.kind) return a.kind === "directory" ? -1 : 1;
        return resolveOpfsMimeType(a.name).localeCompare(resolveOpfsMimeType(b.name));
      },
      render: (_: unknown, entry: OpfsEntryMeta) =>
        entry.kind === "directory" ? "Folder" : <Text code>{resolveOpfsMimeType(entry.name)}</Text>,
    },
    {
      title: "Size",
      key: "size",
      width: 120,
      align: "right",
      sorter: (a, b) => (a.size ?? 0) - (b.size ?? 0),
      render: (_: unknown, entry: OpfsEntryMeta) => formatEntrySize(entry),
    },
    {
      title: "Modified",
      key: "lastModified",
      width: 200,
      sorter: (a, b) => (a.lastModified ?? 0) - (b.lastModified ?? 0),
      render: (_: unknown, entry: OpfsEntryMeta) => formatEntryModified(entry),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: unknown, entry: OpfsEntryMeta) => (
        <Space size="small">
          <Tooltip title="Rename">
            <Button
              size="small"
              type="text"
              icon={<EditOutlined />}
              onClick={() => openRenameModal({ name: entry.name, kind: entry.kind })}
            />
          </Tooltip>
          <Tooltip title="Download">
            <Button size="small" type="text" icon={<DownloadOutlined />} onClick={() => void handleDownload(entry)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => void handleDelete(entry)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};
