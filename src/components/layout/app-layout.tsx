import { useLocation } from "@tanstack/react-router";
import { Drawer, Layout } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import { useResponsive } from "~/hooks/use-responsive";
import { AppHeader } from "./app-header";
import { getBasePathForMenu } from "../../routes/router.utils";
import { AppSideMenu } from "./app-side-menu";

const { Sider, Content } = Layout;

const SIDER_WIDTH = 240;
const SIDER_COLLAPSED_WIDTH = 64;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const location = useLocation();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState<boolean | null>(null);
  const collapsed = userCollapsed ?? !isDesktop;

  const selectedKeys = [getBasePathForMenu(location.pathname)];

  const handleMenuClick = () => {
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const handleMenuToggle = () => {
    if (isMobile) {
      setDrawerVisible(true);
    } else {
      setUserCollapsed((value) => !value);
    }
  };

  return (
    <Layout className={styles.root}>
      <AppHeader onMenuClick={handleMenuToggle} />

      <Layout>
        {!isMobile && (
          <Sider
            width={SIDER_WIDTH}
            collapsedWidth={SIDER_COLLAPSED_WIDTH}
            collapsed={collapsed}
            onCollapse={setUserCollapsed}
            className={styles.sider}
          >
            <AppSideMenu selectedKeys={selectedKeys} onClick={handleMenuClick} />
          </Sider>
        )}

        <Drawer
          title="Web Toolbox"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          size={SIDER_WIDTH}
          styles={{ body: { padding: 0 } }}
        >
          <AppSideMenu selectedKeys={selectedKeys} onClick={handleMenuClick} />
        </Drawer>

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

const useStyles = createStyles(({ token }) => ({
  root: {
    minHeight: "100vh",
  },
  sider: {
    background: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    overflow: "auto",
    height: "calc(100vh - 64px)",
    position: "sticky",
    top: 64,
    left: 0,
  },
  drawerTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  content: {
    padding: 12,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    minHeight: "calc(100vh - 64px - 32px)",
    overflow: "auto",
  },
}));
