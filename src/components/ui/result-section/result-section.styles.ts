import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  resultBox: {
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflow: "auto",
    width: "100%",
  },
  resultBoxPadded: {
    padding: 16,
    overflowX: "auto",
  },
  resultText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
