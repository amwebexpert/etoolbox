import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import { SettingsDialog } from "~/components/settings/settings-dialog";

export const AppHeaderActionSettings = () => {
  const { styles } = useStyles();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Button
        type="text"
        icon={<SettingOutlined className={styles.icon} />}
        onClick={() => setSettingsOpen(true)}
        className={styles.button}
        aria-label="Settings"
      />

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

const useStyles = createStyles(() => ({
  button: {
    width: 48,
    height: 48,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
}));
