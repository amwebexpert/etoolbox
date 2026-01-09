export interface HtmlEntity {
  character: string;
  entityName: string;
  entityNumber: string;
  description: string;
  category: HtmlEntityCategory;
}

export type HtmlEntityCategory =
  | "all"
  | "letters"
  | "letters-accented"
  | "numbers"
  | "punctuation"
  | "math"
  | "greek"
  | "currency"
  | "arrows"
  | "symbols"
  | "whitespace";

export type HtmlEntityFilterField = "all" | "named-only";
