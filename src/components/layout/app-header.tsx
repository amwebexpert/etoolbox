import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { createStyles } from "antd-style";
import { AppHeaderActionAbout } from "./app-header-action-about";
import { AppHeaderActionSettings } from "./app-header-action-settings";

const { Header } = Layout;

interface AppHeaderProps {
  onMenuClick: () => void;
}

export const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
  const { styles } = useStyles();

  return (
    <Header className={styles.header}>
      <Button
        type="text"
        icon={<MenuOutlined className={styles.icon} />}
        onClick={onMenuClick}
        className={styles.button}
        aria-label="Toggle menu"
      />

      <div className={styles.titleContainer}>
        <img src="icon.png" alt="eToolbox" className={styles.logo} />
        <span className={styles.title}>Web Toolbox</span>
      </div>

      <div className={styles.spacer} />

      <AppHeaderActionAbout />
      <AppHeaderActionSettings />
    </Header>
  );
};

const useStyles = createStyles(({ token }) => ({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBlock: 0,
    paddingInline: 16,
    background: token.colorPrimary,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  button: {
    marginRight: 16,
    width: 48,
    height: 48,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  logo: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#fff",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  spacer: {
    flex: 1,
  },
}));
