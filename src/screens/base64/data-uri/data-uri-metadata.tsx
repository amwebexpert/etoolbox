import { DownloadOutlined } from "@ant-design/icons";
import { Descriptions, Typography } from "antd";
import { createStyles } from "antd-style";

import { getImageDownloadFilename, type ImageMetadata } from "~/utils/data-uri.utils";

import { ResolutionValue } from "./resolution-value";
import { type ImageDimensionsState } from "./use-image-dimensions";

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
