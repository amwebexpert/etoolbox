import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  collapse: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
  configPanel: {
    maxHeight: "500px",
    overflowY: "auto",
    paddingRight: 8,
  },
  fullWidth: {
    width: "100%",
  },
  switchGroup: {
    marginBottom: 16,
  },
}));
