import { DownloadOutlined } from "@ant-design/icons";
import { Descriptions, Typography } from "antd";
import { createStyles } from "antd-style";

import { useSavedFileToast } from "~/hooks/use-saved-file-toast";
import { getImageDownloadFilename, type ImageMetadata, saveImageDataUri } from "~/utils/data-uri.utils";

import { ResolutionValue } from "./resolution-value";
import { type ImageDimensionsState } from "./use-image-dimensions";

interface DataUriMetadataProps {
  dataUri: string;
  metadata: ImageMetadata;
  dimensions: ImageDimensionsState;
}

export const DataUriMetadata = ({ dataUri, metadata, dimensions }: DataUriMetadataProps) => {
  const { styles } = useStyles();
  const { notifySavedFile } = useSavedFileToast();
  const downloadFileName = getImageDownloadFilename(metadata.ext);

  const handleDownload = async () => {
    notifySavedFile(await saveImageDataUri({ dataUri, ext: metadata.ext }));
  };

  return (
    <Descriptions bordered size="small" column={1} className={styles.descriptions}>
      <Descriptions.Item label="Resolution">
        <ResolutionValue dimensions={dimensions} />
      </Descriptions.Item>
      <Descriptions.Item label="MIME type">{metadata.mimeType}</Descriptions.Item>
      <Descriptions.Item label="Extension">{metadata.ext}</Descriptions.Item>
      <Descriptions.Item label="Size">{metadata.sizeFormatted}</Descriptions.Item>
      <Descriptions.Item label="Download">
        <Typography.Link onClick={() => void handleDownload()}>
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
