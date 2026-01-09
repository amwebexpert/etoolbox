import { FileOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@lichens-innovation/ts-common";
import { Input, Space, Typography } from "antd";
import type { UploadFile } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";

import { Base64FileDropzone } from "./base64-file-dropzone";
import { Base64FileInfo } from "./base64-file-info";
import { Base64FileToolbar } from "./base64-file-toolbar";
import { downloadBase64AsFile, formatDataUri, readFileAsBase64 } from "./base64-file.utils";

const { TextArea } = Input;

export const Base64File = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const { copyTextToClipboard } = useClipboardCopy();

  const [base64Output, setBase64Output] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileSelect = (file: File) => {
    readFileAsBase64(file)
      .then(({ base64, mimeType }) => {
        setBase64Output(base64);
        setFileName(file.name);
        setMimeType(mimeType);
      })
      .catch((e: unknown) => {
        messageApi.error("Failed to read file: " + getErrorMessage(e));
      });
    return false; // Prevent upload
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: base64Output, successMessage: "Base64 copied to clipboard!" });
  };

  const handleCopyDataUri = () => {
    const dataUri = base64Output ? formatDataUri({ mimeType, base64: base64Output }) : "";
    copyTextToClipboard({ text: dataUri, successMessage: "Data URI copied to clipboard!" });
  };

  const handleDownload = () => {
    if (!base64Output) return;

    try {
      downloadBase64AsFile({ base64: base64Output, mimeType, fileName: fileName || "decoded-file" });
      messageApi.success("File downloaded!");
    } catch (e: unknown) {
      messageApi.error("Failed to decode and download: " + getErrorMessage(e));
    }
  };

  const handleBase64Input = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setBase64Output(value);
    if (!fileName) {
      setFileName("decoded-file");
      setMimeType("application/octet-stream");
    }
  };

  const handleClear = () => {
    setBase64Output("");
    setFileName("");
    setMimeType("");
    setFileList([]);
  };

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileOutlined />}
          title="Base64 File Encoder / Decoder"
          description="Encode files to Base64 or decode Base64 back to files"
        />

        <Base64FileDropzone fileList={fileList} onFileSelect={handleFileSelect} onFileListChange={setFileList} />

        <div className={styles.orDivider}>
          <Typography.Text type="secondary">— OR paste Base64 to decode —</Typography.Text>
        </div>

        <TextArea
          placeholder="Paste Base64 string here to decode back to a file"
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 10 : 6 }}
          value={base64Output}
          onChange={handleBase64Input}
          className={styles.textArea}
        />

        <Base64FileInfo fileName={fileName} mimeType={mimeType} base64Output={base64Output} />

        <Base64FileToolbar
          hasContent={!!base64Output || !!fileName}
          onClear={handleClear}
          onCopy={handleCopy}
          onCopyDataUri={handleCopyDataUri}
          onDownload={handleDownload}
        />
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  orDivider: {
    textAlign: "center",
    margin: "8px 0",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
