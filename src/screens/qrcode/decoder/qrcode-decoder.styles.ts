import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  fullWidth: {
    width: "100%",
  },
  uploadCard: {
    width: "100%",
  },
  dragger: {
    ".ant-upload-drag": {
      padding: 0,
    },
  },
  uploadPlaceholder: {
    padding: 24,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: 300,
    objectFit: "contain",
    borderRadius: token.borderRadius,
  },
  fileName: {
    fontSize: 12,
    fontFamily: "monospace",
  },
}));
