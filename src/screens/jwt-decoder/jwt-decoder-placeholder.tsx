import { Typography } from "antd";
import { createStyles } from "antd-style";

export const JwtDecoderPlaceholder = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.placeholder}>
      <Typography.Text type="secondary">Decoded JWT will appear here</Typography.Text>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
