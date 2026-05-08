import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Space, Switch, Typography } from "antd";
import { createStyles } from "antd-style";

import { useIsDarkMode, useThemeToggler } from "~/stores/settings.store";

const { Text } = Typography;

export const SettingsDarkLight = () => {
  const { styles } = useStyles();
  const isDarkMode = useIsDarkMode();
  const toggleThemeMode = useThemeToggler();

  return (
    <>
      <Space orientation="horizontal" className={styles.row}>
        <Space orientation="horizontal" align="center">
          {isDarkMode ? <MoonOutlined className={styles.icon} /> : <SunOutlined className={styles.icon} />}
          <Text strong>Dark Mode</Text>
        </Space>

        <Switch
          checked={isDarkMode}
          onChange={toggleThemeMode}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </Space>

      <Text type="secondary" className={styles.hint}>
        Toggle between light and dark theme
      </Text>
    </>
  );
};

const useStyles = createStyles(() => ({
  row: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  hint: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
  },
}));
