import { DownloadOutlined } from "@ant-design/icons";
import { Descriptions, Spin, Typography } from "antd";
import { createStyles } from "antd-style";

import { getImageDownloadFilename, type ImageMetadata } from "~/utils/data-uri.utils";

import { type ImageDimensionsState } from "./use-image-dimensions";

const DASH_FALLBACK = "—";

interface ResolutionValueProps {
  dimensions: ImageDimensionsState;
}

const ResolutionValue = ({ dimensions }: ResolutionValueProps) => {
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

interface DataUriMetadataProps {
  dataUri: string;
  metadata: ImageMetadata;
  dimensions: ImageDimensionsState;
}

export const DataUriMetadata = ({ dataUri, metadata, dimensions }: DataUriMetadataProps) => {
  const { styles } = useStyles();
  const downloadFileName = getImageDownloadFilename(metadata.ext);

  return (
    <Descriptions bordered size="small" column={1} className={styles.descriptions}>
      <Descriptions.Item label="Resolution">
        <ResolutionValue dimensions={dimensions} />
      </Descriptions.Item>
      <Descriptions.Item label="MIME type">{metadata.mimeType}</Descriptions.Item>
      <Descriptions.Item label="Extension">{metadata.ext}</Descriptions.Item>
      <Descriptions.Item label="Size">{metadata.sizeFormatted}</Descriptions.Item>
      <Descriptions.Item label="Download">
        <Typography.Link href={dataUri} download={downloadFileName}>
          <DownloadOutlined /> {downloadFileName}
        </Typography.Link>
      </Descriptions.Item>
    </Descriptions>
  );
};

const useStyles = createStyles(() => ({
  descriptions: {
    ".ant-descriptions-item-label": {
      width: 140,
      fontWeight: 500,
    },
  },
}));
