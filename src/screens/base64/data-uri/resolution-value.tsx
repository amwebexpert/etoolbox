import { Spin, Typography } from "antd";

import { type ImageDimensionsState } from "./use-image-dimensions";

const DASH_FALLBACK = "—";

interface ResolutionValueProps {
  dimensions: ImageDimensionsState;
}

export const ResolutionValue = ({ dimensions }: ResolutionValueProps) => {
  if (dimensions.status === "loaded" && dimensions.width !== null && dimensions.height !== null) {
    return (
      <Typography.Text>
        {dimensions.width} x {dimensions.height}
      </Typography.Text>
    );
  }

  if (dimensions.status === "error") {
    return <Typography.Text>{DASH_FALLBACK}</Typography.Text>;
  }

  return <Spin size="small" />;
};
