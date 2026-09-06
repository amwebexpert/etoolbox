import { createStyles } from "antd-style";

type ListTableCellPadding = "compact" | "default" | "topAligned";

const CELL_PADDING_BLOCK: Record<ListTableCellPadding, number> = {
  compact: 0,
  default: 4,
  topAligned: 8,
};

interface ListTableStyleOptions {
  cellPadding?: ListTableCellPadding;
}

const createListTableStyles = ({ cellPadding = "default" }: ListTableStyleOptions = {}) =>
  createStyles(({ token }) => ({
    table: {
      ".ant-table-thead > tr > th": {
        backgroundColor: token.colorPrimaryBg,
      },
      ".ant-table-tbody > tr > td": {
        borderBottom: "none",
        paddingBlock: CELL_PADDING_BLOCK[cellPadding],
        paddingInline: 8,
        ...(cellPadding === "topAligned" ? { verticalAlign: "top" as const } : {}),
      },
    },
  }));

export const useListTableStyles = createListTableStyles();
export const useCompactListTableStyles = createListTableStyles({ cellPadding: "compact" });
export const useTopAlignedListTableStyles = createListTableStyles({ cellPadding: "topAligned" });
