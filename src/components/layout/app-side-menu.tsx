import {
  BgColorsOutlined,
  CalendarOutlined,
  CodeOutlined,
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
import { Menu } from "antd";
import { createStyles } from "antd-style";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
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
];

interface AppSideMenuProps {
  selectedKeys: string[];
  onClick?: () => void;
}

export const AppSideMenu = ({ selectedKeys, onClick }: AppSideMenuProps) => {
  const { styles } = useStyles();

  return <Menu mode="inline" selectedKeys={selectedKeys} items={menuItems} onClick={onClick} className={styles.menu} />;
};

const useStyles = createStyles(() => ({
  menu: {
    height: "100%",
    borderRight: 0,
    background: "transparent",
    padding: "0 !important",
    ".ant-menu-item": {
      borderRadius: "0 !important",
      margin: "0 !important",
      marginInline: "0 !important",
      width: "100% !important",
      paddingLeft: "24px !important",
    },
    ".ant-menu-item-selected": {
      borderRadius: "0 !important",
      margin: "0 !important",
      marginInline: "0 !important",
    },
  },
}));
