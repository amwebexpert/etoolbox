import { Divider, Modal, Typography } from "antd";
import { createStyles } from "antd-style";

import { SettingsColorTheme } from "./settings-color-theme";
import { SettingsDarkLight } from "./settings-dark-light";

const { Title } = Typography;

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog = ({ open, onClose }: SettingsDialogProps) => {
  const { styles } = useStyles();

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
      <SettingsDarkLight />

      <Divider className={styles.divider} />
      <SettingsColorTheme />
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
}));
