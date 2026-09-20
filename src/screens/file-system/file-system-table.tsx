import { Modal, Table } from "antd";

import { useFileSystemStore } from "./file-system.store";
import { useFileSystemColumns } from "./use-file-system-columns";

export const FileSystemTable = () => {
  const [modal, contextHolder] = Modal.useModal();
  const columns = useFileSystemColumns(modal);
  const { entries, loading, selectedNames, setSelectedNames } = useFileSystemStore();

  return (
    <>
      {contextHolder}
      <Table
        dataSource={entries}
        columns={columns}
        rowKey={(record) => record.name}
        loading={loading}
        pagination={false}
        size="small"
        scroll={{ x: "max-content" }}
        rowSelection={{
          selectedRowKeys: selectedNames,
          onChange: (keys) => setSelectedNames(keys as string[]),
        }}
        locale={{ emptyText: "This folder is empty" }}
      />
    </>
  );
};
