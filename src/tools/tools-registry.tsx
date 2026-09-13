import {
  BgColorsOutlined,
  CalendarOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  DiffOutlined,
  FileMarkdownOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  GithubOutlined,
  LinkOutlined,
  LockOutlined,
  NumberOutlined,
  PictureOutlined,
  QrcodeOutlined,
  TableOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export interface Tool {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  path: string;
}

const createTool = (tool: Omit<Tool, "id">): Tool => ({ id: tool.path, ...tool });

export const TOOLS: Tool[] = [
  createTool({
    icon: <LinkOutlined />,
    name: "URL Tools",
    description: "Parse, encode & cURL converter",
    path: "/url",
  }),
  createTool({
    icon: <CodeOutlined />,
    name: "JSON Suite",
    description: "Format, convert & repair JSON",
    path: "/json",
  }),
  createTool({
    icon: <FileTextOutlined />,
    name: "Base64",
    description: "Encode & decode text/images",
    path: "/base64",
  }),
  createTool({
    icon: <BgColorsOutlined />,
    name: "Colors",
    description: "Picker & named color explorer",
    path: "/colors",
  }),
  createTool({
    icon: <ThunderboltOutlined />,
    name: "RegEx Tester",
    description: "Test patterns in real-time",
    path: "/regex-tester",
  }),
  createTool({
    icon: <NumberOutlined />,
    name: "UUID Generator",
    description: "Generate unique identifiers",
    path: "/uuid-generator",
  }),
  createTool({
    icon: <LockOutlined />,
    name: "JWT Decoder",
    description: "Decode & inspect tokens",
    path: "/jwt-decoder",
  }),
  createTool({
    icon: <QrcodeOutlined />,
    name: "QR Code",
    description: "Generate QR codes instantly",
    path: "/qrcode",
  }),
  createTool({
    icon: <PictureOutlined />,
    name: "Image Tools",
    description: "OCR, compression and more",
    path: "/image-ocr",
  }),
  createTool({
    icon: <CalendarOutlined />,
    name: "Date Converter",
    description: "Epoch & date formats",
    path: "/date-converter",
  }),
  createTool({
    icon: <TableOutlined />,
    name: "CSV Parser",
    description: "Parse & visualize CSV data",
    path: "/csv-parser",
  }),
  createTool({
    icon: <TeamOutlined />,
    name: "Poker Planning",
    description: "Agile estimation tool",
    path: "/poker-planning",
  }),
  createTool({
    icon: <UnorderedListOutlined />,
    name: "Web References",
    description: "MIME types & HTML entities",
    path: "/common-lists",
  }),
  createTool({
    icon: <GithubOutlined />,
    name: "GitHub Search",
    description: "Explore user repositories",
    path: "/github-user-projects",
  }),
  createTool({
    icon: <CodeSandboxOutlined />,
    name: "3D Viewer",
    description: "View 3D models in VR/AR",
    path: "/vr-3d-viewer",
  }),
  createTool({
    icon: <FileSearchOutlined />,
    name: "Coding Standards",
    description: "Semantic search for best practices",
    path: "/coding-standards",
  }),
  createTool({
    icon: <DiffOutlined />,
    name: "Diff Viewer",
    description: "Compare two texts side by side",
    path: "/diff",
  }),
  createTool({
    icon: <FileMarkdownOutlined />,
    name: "Markdown",
    description: "WYSIWYG editor & template composer",
    path: "/markdown-composer",
  }),
];
