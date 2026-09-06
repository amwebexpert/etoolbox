import { createStyles } from "antd-style";

export const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  epochInput: {
    fontFamily: "monospace",
  },
  select: {
    width: "100%",
  },
  datePicker: {
    width: "100%",
  },
  optionsRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 32,
  },
  switchLabel: {
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
}));
