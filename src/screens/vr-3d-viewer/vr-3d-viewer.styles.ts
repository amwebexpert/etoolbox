import { createStyles } from "antd-style";

export const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  instructionsList: {
    margin: 0,
    paddingLeft: 20,
    "& li": {
      marginBottom: 4,
    },
    "& li:last-child": {
      marginBottom: 0,
    },
  },
}));
