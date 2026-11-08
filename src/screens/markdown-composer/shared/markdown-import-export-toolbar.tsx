import { DownloadOutlined, FilePdfOutlined, UploadOutlined } from "@ant-design/icons";
import { getErrorMessage, isBlank } from "@lichens-innovation/ts-common";
import { readFileAsText } from "@lichens-innovation/ts-common/web";
import { Button, Modal, Space } from "antd";
import { type ComponentRef, useRef, useState } from "react";

import { useSavedFileToast } from "~/hooks/use-saved-file-toast";
import { useToastMessage } from "~/hooks/use-toast-message";
import { requestSaveTarget, saveTextWithPicker } from "~/utils/save-file.utils";

import { shouldConfirmBeforeImport } from "./markdown-import-export.utils";
import { exportMarkdownAsPdf } from "./markdown-pdf-export.utils";

const EXPORT_FILE_NAME = "document.md";
const EXPORT_MIME_TYPE = "text/markdown";
const EXPORT_PDF_FILE_NAME = "document.pdf";

interface MarkdownImportExportToolbarProps {
  markdown: string;
  onImport: (markdown: string) => void;
}

export const MarkdownImportExportToolbar = ({ markdown, onImport }: MarkdownImportExportToolbarProps) => {
  const messageApi = useToastMessage();
  const { notifySavedFile } = useSavedFileToast();
  const [modal, contextHolder] = Modal.useModal();
  const fileInputRef = useRef<ComponentRef<"input">>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExport = async () => {
    notifySavedFile(
      await saveTextWithPicker({ content: markdown, fileName: EXPORT_FILE_NAME, mimeType: EXPORT_MIME_TYPE })
    );
  };

  const handleExportPdf = async () => {
    const saveTarget = await requestSaveTarget(EXPORT_PDF_FILE_NAME);
    if (saveTarget.isCancelled) return;

    setIsExportingPdf(true);
    try {
      notifySavedFile(
        await exportMarkdownAsPdf({ markdown, fileName: EXPORT_PDF_FILE_NAME, fileHandle: saveTarget.fileHandle })
      );
    } catch (e: unknown) {
      messageApi.error("Failed to export PDF: " + getErrorMessage(e));
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const applyImportedMarkdown = (importedMarkdown: string) => {
    if (shouldConfirmBeforeImport(markdown)) {
      modal.confirm({
        title: "Replace current content?",
        content: "Importing this file will replace the current markdown content. This action cannot be undone.",
        okText: "Replace",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        onOk: () => onImport(importedMarkdown),
      });
      return;
    }

    onImport(importedMarkdown);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const importedMarkdown = await readFileAsText(file);
      applyImportedMarkdown(importedMarkdown);
    } catch (e: unknown) {
      messageApi.error("Failed to read file: " + getErrorMessage(e));
    }
  };

  return (
    <Space size="small" wrap>
      {contextHolder}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,text/markdown"
        aria-label="Import markdown file"
        hidden
        onChange={(event) => void handleFileChange(event)}
      />
      <Button icon={<UploadOutlined />} aria-label="Import" onClick={handleImportClick}>
        Import
      </Button>
      <Button
        icon={<DownloadOutlined />}
        aria-label="Export"
        disabled={isBlank(markdown)}
        onClick={() => void handleExport()}
      >
        Export
      </Button>
      <Button
        icon={<FilePdfOutlined />}
        aria-label="Export as PDF"
        loading={isExportingPdf}
        disabled={isBlank(markdown)}
        onClick={() => void handleExportPdf()}
      >
        Export as PDF
      </Button>
    </Space>
  );
};
