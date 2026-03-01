import type { GlobalToken } from "antd";

export interface GetSimilarityStyleParams {
  similarity: number;
  token: GlobalToken;
}

export interface SimilarityStyle {
  backgroundColor: string;
  color: string;
  borderColor: string;
}

export const getSimilarityStyle = ({ similarity, token }: GetSimilarityStyleParams): SimilarityStyle => {
  if (similarity > 0.7) {
    return {
      backgroundColor: token.colorSuccessBg,
      color: token.colorSuccess,
      borderColor: token.colorSuccessBorder,
    };
  }

  if (similarity > 0.5) {
    return {
      backgroundColor: token.colorWarningBg,
      color: token.colorWarning,
      borderColor: token.colorWarningBorder,
    };
  }

  return {
    backgroundColor: token.colorFillTertiary,
    color: token.colorText,
    borderColor: token.colorBorder,
  };
};
