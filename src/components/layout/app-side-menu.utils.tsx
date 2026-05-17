import {
  BgColorsOutlined,
  CalendarOutlined,
  CodeOutlined,
  DiffOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  GithubOutlined,
  HomeOutlined,
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
import { Link } from "@tanstack/react-router";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/url",
    icon: <LinkOutlined />,
    label: <Link to="/url">URL Parser</Link>,
  },
  {
    key: "/base64",
    icon: <FileTextOutlined />,
    label: <Link to="/base64">Base64</Link>,
  },
  {
    key: "/json",
    icon: <CodeOutlined />,
    label: <Link to="/json">JSON</Link>,
  },
  {
    key: "/colors",
    icon: <BgColorsOutlined />,
    label: <Link to="/colors">Colors</Link>,
  },
  {
    key: "/regex-tester",
    icon: <ThunderboltOutlined />,
    label: <Link to="/regex-tester">RegEx Tester</Link>,
  },
  {
    key: "/uuid-generator",
    icon: <NumberOutlined />,
    label: <Link to="/uuid-generator">UUID Generator</Link>,
  },
  {
    key: "/jwt-decoder",
    icon: <LockOutlined />,
    label: <Link to="/jwt-decoder">JWT Decoder</Link>,
  },
  {
    key: "/qrcode",
    icon: <QrcodeOutlined />,
    label: <Link to="/qrcode">QR Code</Link>,
  },
  {
    key: "/image-ocr",
    icon: <PictureOutlined />,
    label: <Link to="/image-ocr">Image OCR</Link>,
  },
  {
    key: "/common-lists",
    icon: <UnorderedListOutlined />,
    label: <Link to="/common-lists">Web References</Link>,
  },
  {
    key: "/github-user-projects",
    icon: <GithubOutlined />,
    label: <Link to="/github-user-projects">Github Search</Link>,
  },
  {
    key: "/date-converter",
    icon: <CalendarOutlined />,
    label: <Link to="/date-converter">Date & Epoch</Link>,
  },
  {
    key: "/csv-parser",
    icon: <TableOutlined />,
    label: <Link to="/csv-parser">CSV Parser</Link>,
  },
  {
    key: "/poker-planning",
    icon: <TeamOutlined />,
    label: <Link to="/poker-planning">Poker Planning</Link>,
  },
  {
    key: "/vr-3d-viewer",
    icon: <ThunderboltOutlined />,
    label: <Link to="/vr-3d-viewer">3D Viewer</Link>,
  },
  {
    key: "/coding-standards",
    icon: <FileSearchOutlined />,
    label: <Link to="/coding-standards">Coding Rules</Link>,
  },
  {
    key: "/diff",
    icon: <DiffOutlined />,
    label: <Link to="/diff">Diff Viewer</Link>,
  },
];
