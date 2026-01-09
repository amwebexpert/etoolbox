import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { createStyles } from "antd-style";

export const AppHeaderActionAbout = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <Button
      type="text"
      icon={<InfoCircleOutlined className={styles.icon} />}
      onClick={() => navigate({ to: "/about" })}
      className={styles.button}
      aria-label="About"
    />
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
