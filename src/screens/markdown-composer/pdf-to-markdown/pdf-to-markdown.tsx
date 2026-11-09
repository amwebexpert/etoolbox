import { FilePdfOutlined, SyncOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@lichens-innovation/ts-common";
import { Button, Input, Space, type UploadFile } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useToastMessage } from "~/hooks/use-toast-message";

import type { PdfToMarkdownOptions, PdfToMarkdownResult } from "./pdf-to-markdown.types";
import { convertPdfToMarkdown } from "./pdf-to-markdown.utils";
import { PdfToMarkdownDropzone } from "./pdf-to-markdown-dropzone";
import { PdfToMarkdownOptionsFields } from "./pdf-to-markdown-options";
import { PdfToMarkdownResultActions } from "./pdf-to-markdown-result-actions";
import { PdfToMarkdownResultSummary } from "./pdf-to-markdown-result-summary";

const { TextArea } = Input;

const DEFAULT_OPTIONS: PdfToMarkdownOptions = { firstPage: null, lastPage: null, keepHeaders: false };

export const PdfToMarkdown = () => {
  const { styles } = useStyles();
  const messageApi = useToastMessage();

  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [options, setOptions] = useState<PdfToMarkdownOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<PdfToMarkdownResult | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const resetResult = (converted: PdfToMarkdownResult | null) => {
    setResult(converted);
    setMarkdown(converted?.markdown ?? "");
  };

  const handleConvert = async (pdfFile: File) => {
    setIsConverting(true);
    try {
      resetResult(await convertPdfToMarkdown({ file: pdfFile, ...options }));
    } catch (e: unknown) {
      resetResult(null);
      messageApi.error("Failed to convert PDF: " + getErrorMessage(e));
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    void handleConvert(selectedFile);
    return false; // Prevent upload
  };

  const handleFileListChange = (nextFileList: UploadFile[]) => {
    setFileList(nextFileList);
    if (nextFileList.length > 0) return;

    setFile(null);
    resetResult(null);
  };

  return (
    <ScreenContainer className={styles.screen}>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FilePdfOutlined />}
          title="PDF to Markdown"
          description="Extract headings, lists, tables, links and images from a PDF into GitHub-flavored markdown"
        />

        <PdfToMarkdownDropzone
          fileList={fileList}
          onFileSelect={handleFileSelect}
          onFileListChange={handleFileListChange}
        />

        <ScreenToolbar
          leading={<PdfToMarkdownOptionsFields options={options} onChange={setOptions} />}
          actions={
            <Button
              icon={<SyncOutlined />}
              aria-label="Convert"
              loading={isConverting}
              disabled={!file}
              onClick={() => file && void handleConvert(file)}
            >
              Convert
            </Button>
          }
        />

        {result !== null && <PdfToMarkdownResultSummary result={result} />}

        <TextArea
          aria-label="Converted markdown"
          placeholder="Converted markdown will appear here"
          autoSize={{ minRows: 12, maxRows: 30 }}
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          className={styles.textArea}
        />

        <PdfToMarkdownResultActions markdown={markdown} pdfFileName={file?.name ?? ""} />
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  screen: {
    maxWidth: "none",
  },
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
