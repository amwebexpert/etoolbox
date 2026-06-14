import {
  BgColorsOutlined,
  CalendarOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  DiffOutlined,
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

interface Feature {
  icon: React.ReactNode;
  name: string;
  description: string;
  path: string;
}

export const FEATURES: Feature[] = [
  {
    icon: <LinkOutlined />,
    name: "URL Tools",
    description: "Parse, encode & cURL converter",
    path: "/url",
  },
  {
    icon: <CodeOutlined />,
    name: "JSON Suite",
    description: "Format, convert & repair JSON",
    path: "/json",
  },
  {
    icon: <FileTextOutlined />,
    name: "Base64",
    description: "Encode & decode text/images",
    path: "/base64",
  },
  {
    icon: <BgColorsOutlined />,
    name: "Colors",
    description: "Picker & named color explorer",
    path: "/colors",
  },
  {
    icon: <ThunderboltOutlined />,
    name: "RegEx Tester",
    description: "Test patterns in real-time",
    path: "/regex-tester",
  },
  {
    icon: <NumberOutlined />,
    name: "UUID Generator",
    description: "Generate unique identifiers",
    path: "/uuid-generator",
  },
  {
    icon: <LockOutlined />,
    name: "JWT Decoder",
    description: "Decode & inspect tokens",
    path: "/jwt-decoder",
  },
  {
    icon: <QrcodeOutlined />,
    name: "QR Code",
    description: "Generate QR codes instantly",
    path: "/qrcode",
  },
  {
    icon: <PictureOutlined />,
    name: "Image Tools",
    description: "OCR, compression and more",
    path: "/image-ocr",
  },
  {
    icon: <CalendarOutlined />,
    name: "Date Converter",
    description: "Epoch & date formats",
    path: "/date-converter",
  },
  {
    icon: <TableOutlined />,
    name: "CSV Parser",
    description: "Parse & visualize CSV data",
    path: "/csv-parser",
  },
  {
    icon: <TeamOutlined />,
    name: "Poker Planning",
    description: "Agile estimation tool",
    path: "/poker-planning",
  },
  {
    icon: <UnorderedListOutlined />,
    name: "References",
    description: "MIME types & HTML entities",
    path: "/common-lists",
  },
  {
    icon: <GithubOutlined />,
    name: "GitHub Search",
    description: "Explore user repositories",
    path: "/github-user-projects",
  },
  {
    icon: <CodeSandboxOutlined />,
    name: "3D Viewer",
    description: "View 3D models in VR/AR",
    path: "/vr-3d-viewer",
  },
  {
    icon: <FileSearchOutlined />,
    name: "Coding Standards",
    description: "Semantic search for best practices",
    path: "/coding-standards",
  },
  {
    icon: <DiffOutlined />,
    name: "Diff Viewer",
    description: "Compare two texts side by side",
    path: "/diff",
  },
];
