import {
  CodeOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileMarkdownOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from "@ant-design/icons";

const CODE_MIME_TYPES = new Set([
  "application/json",
  "application/javascript",
  "text/javascript",
  "text/css",
  "text/html",
  "application/xml",
  "text/xml",
]);

interface FileTypeIconProps {
  mimeType: string;
}

export const FileTypeIcon = ({ mimeType }: FileTypeIconProps) => {
  if (mimeType.startsWith("image/")) return <FileImageOutlined />;
  if (mimeType === "application/pdf") return <FilePdfOutlined />;
  if (mimeType === "text/markdown") return <FileMarkdownOutlined />;
  if (CODE_MIME_TYPES.has(mimeType)) return <CodeOutlined />;
  if (mimeType.startsWith("text/")) return <FileTextOutlined />;
  if (/zip|compressed|gzip|tar/.test(mimeType)) return <FileZipOutlined />;
  if (mimeType.includes("spreadsheet") || mimeType === "application/vnd.ms-excel") return <FileExcelOutlined />;
  if (mimeType.includes("wordprocessing") || mimeType === "application/msword") return <FileWordOutlined />;
  if (mimeType.includes("presentation") || mimeType === "application/vnd.ms-powerpoint") return <FilePptOutlined />;
  return <FileOutlined />;
};
