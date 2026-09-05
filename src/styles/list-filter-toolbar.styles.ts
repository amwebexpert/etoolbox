import { createStyles } from "antd-style";

export interface ListFilterColSpan {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export const useListFilterToolbarStyles = createStyles(() => ({
  toolbar: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  count: {
    fontFamily: "monospace",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));
