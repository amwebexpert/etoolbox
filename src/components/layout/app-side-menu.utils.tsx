import { HomeOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import type { MenuProps } from "antd";

import { TOOLS } from "~/tools/tools-registry";

type MenuItem = Required<MenuProps>["items"][number];

const HOME_MENU_ITEM: MenuItem = {
  key: "/",
  icon: <HomeOutlined />,
  label: <Link to="/">Home</Link>,
};

export const MENU_ITEMS: MenuItem[] = [
  HOME_MENU_ITEM,
  ...TOOLS.map((tool): MenuItem => ({
    key: tool.path,
    icon: tool.icon,
    label: <Link to={tool.path}>{tool.name}</Link>,
  })),
];
