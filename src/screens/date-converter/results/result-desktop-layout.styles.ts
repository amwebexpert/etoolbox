import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  table: {
    "& .ant-table-cell": {
      verticalAlign: "middle",
    },
  },
  formatLabel: {
    fontWeight: 500,
    cursor: "help",
  },
  valueText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  codeValue: {
    fontFamily: "monospace",
    fontSize: 13,
    backgroundColor: token.colorBgTextHover,
    padding: "2px 6px",
    borderRadius: 4,
    wordBreak: "break-all",
  },
  codeExamplesSection: {
    marginTop: 8,
  },
  codeExamplesTitle: {
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  codeCard: {
    height: "100%",
  },
}));
