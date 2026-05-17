import { BgColorsOutlined, CheckOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { createStyles } from "antd-style";

import { useColorTheme, useSetColorTheme } from "~/stores/settings.store";
import { THEMES } from "~/themes";
import type { ColorTheme } from "~/themes";

const { Text } = Typography;

const THEME_KEYS = Object.keys(THEMES) as ColorTheme[];

export const SettingsColorTheme = () => {
  const { styles } = useStyles();
  const colorTheme = useColorTheme();
  const setColorTheme = useSetColorTheme();

  return (
    <>
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
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
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
    borderRadius: token.borderRadius,
    border: `2px solid ${token.colorBorder}`,
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
