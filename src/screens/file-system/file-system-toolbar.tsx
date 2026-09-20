import {
  DeleteOutlined,
  DownloadOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Upload } from "antd";

import { useToastMessage } from "~/hooks/use-toast-message";

import { useFileSystemStore } from "./file-system.store";

export const FileSystemToolbar = () => {
  const messageApi = useToastMessage();
  const [modal, contextHolder] = Modal.useModal();
  const {
    selectedNames,
    openCreateFolderModal,
    openCreateFileModal,
    refresh,
    uploadFiles,
    countManyEntriesContents,
    deleteSelected,
    downloadSelected,
  } = useFileSystemStore();

  const handleRefresh = (): void => {
    refresh().catch((error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : "Failed to refresh.");
    });
  };

  const handleUpload = (files: File[]): void => {
    uploadFiles(files)
      .then(({ uploaded, skipped }) => {
        if (uploaded.length > 0) {
          messageApi.success(`Uploaded ${uploaded.length} file${uploaded.length === 1 ? "" : "s"}.`);
        }
        if (skipped.length > 0) {
          messageApi.error(`Skipped (already exists): ${skipped.join(", ")}`);
        }
      })
      .catch((error: unknown) => {
        messageApi.error(error instanceof Error ? error.message : "Failed to upload.");
      });
  };

  // antd's Upload beforeUpload callback signature requires these two positional arguments. habit-hooks-disable non-essential-comment
  // eslint-disable-next-line coding-guide/max-params-project
  const handleBeforeUpload = (file: File, fileList: File[]): boolean => {
    if (file === fileList[0]) handleUpload(fileList);
    return false;
  };

  const handleBulkDelete = async (): Promise<void> => {
    const itemCount = await countManyEntriesContents(selectedNames);
    const nestedNotice = itemCount > 0 ? ` and ${itemCount} nested item${itemCount === 1 ? "" : "s"}` : "";

    modal.confirm({
      title: `Delete ${selectedNames.length} selected item${selectedNames.length === 1 ? "" : "s"}?`,
      content: `This will remove ${selectedNames.length} item${selectedNames.length === 1 ? "" : "s"}${nestedNotice}. This action cannot be undone.`,
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteSelected();
        } catch (error) {
          messageApi.error(error instanceof Error ? error.message : "Failed to delete selected items.");
        }
      },
    });
  };

  const handleBulkDownload = (): void => {
    downloadSelected().catch((error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : "Failed to download selected items.");
    });
  };

  return (
    <Space wrap>
      {contextHolder}
      <Button icon={<FolderAddOutlined />} onClick={openCreateFolderModal}>
        New Folder
      </Button>
      <Button icon={<FileAddOutlined />} onClick={openCreateFileModal}>
        New File
      </Button>
      <Upload multiple showUploadList={false} beforeUpload={handleBeforeUpload}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
        Refresh
      </Button>

      {selectedNames.length > 0 && (
        <>
          <Button icon={<DownloadOutlined />} onClick={handleBulkDownload}>
            Download ({selectedNames.length})
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => void handleBulkDelete()}>
            Delete ({selectedNames.length})
          </Button>
        </>
      )}
    </Space>
  );
};
