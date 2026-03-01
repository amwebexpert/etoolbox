import type { GlobalToken } from "antd";

export interface GetSimilarityStyleParams {
  similarity: number;
  token: GlobalToken;
}

export const getSimilarityStyle = ({
  similarity,
  token,
}: GetSimilarityStyleParams): {
  backgroundColor: string;
  color: string;
  borderColor: string;
} => {
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
