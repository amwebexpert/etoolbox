import { CopyOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { isBlank } from "@lichens-innovation/ts-common";
import { useNavigate } from "@tanstack/react-router";
import { Button, Modal, Space } from "antd";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useSavedFileToast } from "~/hooks/use-saved-file-toast";
import { saveTextWithPicker } from "~/utils/save-file.utils";

import { useMarkdownEditorStore } from "../editor/editor.store";
import { shouldConfirmBeforeImport } from "../shared/markdown-import-export.utils";
import { toMarkdownFileName } from "./pdf-to-markdown.utils";

interface PdfToMarkdownResultActionsProps {
  markdown: string;
  pdfFileName: string;
}

export const PdfToMarkdownResultActions = ({ markdown, pdfFileName }: PdfToMarkdownResultActionsProps) => {
  const navigate = useNavigate();
  const { notifySavedFile } = useSavedFileToast();
  const { copyTextToClipboard } = useClipboardCopy();
  const [modal, contextHolder] = Modal.useModal();
  const isEmpty = isBlank(markdown);

  const handleCopy = () => {
    void copyTextToClipboard({ text: markdown, successMessage: "Markdown copied to clipboard!" });
  };

  const handleDownload = async () => {
    notifySavedFile(
      await saveTextWithPicker({
        content: markdown,
        fileName: toMarkdownFileName(pdfFileName),
        mimeType: "text/markdown",
      })
    );
  };

  const openInEditor = () => {
    useMarkdownEditorStore.getState().setMarkdown(markdown);
    void navigate({ to: "/markdown-composer/editor" });
  };

  const handleOpenInEditor = () => {
    if (!shouldConfirmBeforeImport(useMarkdownEditorStore.getState().markdown)) {
      openInEditor();
      return;
    }

    modal.confirm({
      title: "Replace editor content?",
      content: "Opening this markdown will replace the current Markdown Editor content. This action cannot be undone.",
      okText: "Replace",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: openInEditor,
    });
  };

  return (
    <Space size="small" wrap>
      {contextHolder}
      <Button icon={<CopyOutlined />} aria-label="Copy" disabled={isEmpty} onClick={handleCopy}>
        Copy
      </Button>
      <Button
        icon={<DownloadOutlined />}
        aria-label="Download"
        disabled={isEmpty}
        onClick={() => void handleDownload()}
      >
        Download
      </Button>
      <Button
        icon={<EditOutlined />}
        aria-label="Open in Markdown Editor"
        disabled={isEmpty}
        onClick={handleOpenInEditor}
      >
        Open in Markdown Editor
      </Button>
    </Space>
  );
};
