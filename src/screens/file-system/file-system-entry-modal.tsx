import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

import { useToastMessage } from "~/hooks/use-toast-message";

import { useFileSystemStore } from "./file-system.store";

const { TextArea } = Input;

interface EntryFormValues {
  name: string;
  content?: string;
}

const MODAL_TITLES = {
  "create-folder": "New folder",
  "create-file": "New file",
  rename: "Rename",
} as const;

export const FileSystemEntryModal = () => {
  const messageApi = useToastMessage();
  const [form] = Form.useForm<EntryFormValues>();

  const { modal, closeModal, createFolder, createFile, renameEntry } = useFileSystemStore();

  useEffect(() => {
    if (!modal.open) return;
    const name = modal.mode === "rename" ? modal.targetName : "";
    form.setFieldsValue({ name, content: "" });
  }, [modal.open, modal.mode, modal.targetName, form]);

  const handleSubmit = async (): Promise<void> => {
    let values: EntryFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    try {
      if (modal.mode === "create-folder") {
        await createFolder(values.name);
      } else if (modal.mode === "create-file") {
        await createFile({ name: values.name, content: values.content ?? "" });
      } else {
        await renameEntry(values.name);
      }
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <Modal
      title={MODAL_TITLES[modal.mode]}
      open={modal.open}
      onCancel={closeModal}
      onOk={() => void handleSubmit()}
      okText={modal.mode === "rename" ? "Rename" : "Create"}
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, whitespace: true, message: "Name is required." }]}
        >
          <Input autoFocus />
        </Form.Item>

        {modal.mode === "create-file" && (
          <Form.Item name="content" label="Text content (optional)">
            <TextArea rows={6} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
