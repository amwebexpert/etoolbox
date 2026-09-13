import { Menu } from "antd";
import { createStyles } from "antd-style";

import { usePinnedPaths, useTogglePinned } from "~/stores/pinned-tools.store";

import { buildMenuItems } from "./app-side-menu.utils";

interface AppSideMenuProps {
  selectedKeys: string[];
  onClick?: () => void;
}

export const AppSideMenu = ({ selectedKeys, onClick }: AppSideMenuProps) => {
  const { styles } = useStyles();
  const pinnedPaths = usePinnedPaths();
  const togglePinned = useTogglePinned();
  const items = buildMenuItems({ pinnedPaths, onTogglePinned: togglePinned });

  return <Menu mode="inline" selectedKeys={selectedKeys} items={items} onClick={onClick} className={styles.menu} />;
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
    ".menu-row": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    ".menu-row-link": {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    ".pin-star": {
      opacity: 0,
      transition: "opacity 0.2s ease",
      "&[aria-label^='Unpin']": {
        opacity: 1,
      },
    },
    ".ant-menu-item:hover .pin-star, .ant-menu-item-selected .pin-star": {
      opacity: 1,
    },
  },
}));
