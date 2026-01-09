import { createStyles } from "antd-style";

export const useOptionsStyles = createStyles(({ token }) => ({
  collapse: {
    width: "100%",
  },
  collapseLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  fullWidth: {
    width: "100%",
  },
  colorPicker: {
    width: "100%",
  },
  customWidthInput: {
    padding: 8,
    borderTop: `1px solid ${token.colorBorder}`,
  },
  capacityInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "8px 0",
  },
  capacityLabel: {
    fontSize: 12,
  },
  capacityValues: {
    fontSize: 11,
    fontFamily: "monospace",
  },
}));
