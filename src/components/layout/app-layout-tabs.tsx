import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Tabs } from "antd";
import { createStyles } from "antd-style";

interface TabItem {
  key: string;
  label: string;
}

interface AppLayoutTabsProps {
  items: TabItem[];
}

export const AppLayoutTabs = ({ items }: AppLayoutTabsProps) => {
  const { styles } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Tabs
        activeKey={location.pathname}
        items={items}
        onChange={(to: string) => {
          void navigate({ to });
        }}
        className={styles.tabs}
      />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token, css }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  tabs: css`
    margin-bottom: 0;

    & .ant-tabs-nav {
      margin-bottom: 0;
    }

    /* Keep all tabs reachable on narrow viewports (no off-screen overflow scroll). */
    @media (max-width: 576px) {
      & .ant-tabs-nav-wrap {
        overflow: visible;
      }

      & .ant-tabs-nav-list {
        flex-wrap: wrap;
        transform: none !important;
      }

      & .ant-tabs-nav-operations {
        display: none;
      }
    }
  `,
  content: {
    flex: 1,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
}));
