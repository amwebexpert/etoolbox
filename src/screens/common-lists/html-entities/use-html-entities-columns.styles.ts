import { createStyles } from "antd-style";

import type { HtmlEntityCategory } from "./html-entities.types";

export const CATEGORY_COLORS: Record<HtmlEntityCategory, string> = {
  all: "default",
  letters: "blue",
  "letters-accented": "cyan",
  numbers: "green",
  punctuation: "orange",
  math: "purple",
  greek: "magenta",
  currency: "gold",
  arrows: "geekblue",
  symbols: "volcano",
  whitespace: "default",
};

export const useHtmlEntitiesColumnsStyles = createStyles(({ token }) => ({
  characterCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  characterText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1,
  },
  entityCell: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  entityText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  numberText: {
    fontSize: 11,
    fontFamily: "monospace",
  },
  unicodeText: {
    fontSize: 11,
    fontFamily: "monospace",
  },
  descriptionText: {
    fontSize: 13,
  },
  categoryTag: {
    fontSize: 11,
    marginRight: 0,
  },
  copyIcon: {
    opacity: 0.4,
    fontSize: 12,
    color: token.colorTextSecondary,
    flexShrink: 0,
  },
  copyIconSmall: {
    opacity: 0.3,
    fontSize: 10,
    color: token.colorTextSecondary,
    flexShrink: 0,
  },
}));
