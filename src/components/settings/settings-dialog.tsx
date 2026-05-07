import { BgColorsOutlined, CheckOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Divider, Modal, Space, Switch, Typography } from "antd";
import { createStyles } from "antd-style";

import { useIsDarkMode, useSettingsStore, useThemeToggler } from "~/stores/settings.store";
import { THEMES } from "~/themes";
import type { ColorTheme } from "~/themes";

const { Text, Title } = Typography;

const THEME_KEYS = Object.keys(THEMES) as ColorTheme[];

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog = ({ open, onClose }: SettingsDialogProps) => {
  const { styles } = useStyles();
  const isDarkMode = useIsDarkMode();
  const toggleThemeMode = useThemeToggler();
  const colorTheme = useSettingsStore((s) => s.colorTheme);
  const setColorTheme = useSettingsStore((s) => s.setColorTheme);

  return (
    <Modal
      title={
        <Title level={4} className={styles.title}>
          Settings
        </Title>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Divider className={styles.divider} />

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

      <Divider className={styles.divider} />

      <Space orientation="horizontal" className={styles.row}>
        <Space orientation="horizontal" align="center">
          <BgColorsOutlined className={styles.icon} />
          <Text strong>Color Theme</Text>
        </Space>

        <Space size={8}>
          {THEME_KEYS.map((key) => (
            <button
              key={key}
              aria-label={THEMES[key].label}
              className={styles.swatch}
              style={{
                backgroundColor: THEMES[key].primary,
                boxShadow: colorTheme === key ? `0 0 0 2px ${THEMES[key].primary}` : undefined,
              }}
              onClick={() => setColorTheme(key)}
            >
              {colorTheme === key && <CheckOutlined className={styles.checkIcon} />}
            </button>
          ))}
        </Space>
      </Space>

      <Text type="secondary" className={styles.hint}>
        Choose an accent colour for the interface
      </Text>
    </Modal>
  );
};

const useStyles = createStyles(() => ({
  title: {
    margin: 0,
  },
  divider: {
    margin: "12px 0 24px",
  },
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
  swatch: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "2px solid transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "box-shadow 0.2s ease",
  },
  checkIcon: {
    color: "#fff",
    fontSize: 12,
  },
}));
