import { Menu } from "antd";
import { createStyles } from "antd-style";

import { MENU_ITEMS } from "./app-side-menu.utils";

interface AppSideMenuProps {
  selectedKeys: string[];
  onClick?: () => void;
}

export const AppSideMenu = ({ selectedKeys, onClick }: AppSideMenuProps) => {
  const { styles } = useStyles();

  return <Menu mode="inline" selectedKeys={selectedKeys} items={MENU_ITEMS} onClick={onClick} className={styles.menu} />;
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
