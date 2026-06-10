import { DownloadOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { buildExportFilename, canEnableDownload, triggerDownload } from "./compressor.utils";

interface CompressorToolbarProps {
  compressedBlob: Blob | null;
  isCompressing: boolean;
  originalFileName: string;
}

export const CompressorToolbar = ({ compressedBlob, isCompressing, originalFileName }: CompressorToolbarProps) => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();

  const isDownloadEnabled = canEnableDownload({ isCompressing, compressedBlob });

  const handleDownload = (): void => {
    if (!compressedBlob) return;

    const filename = buildExportFilename(originalFileName, compressedBlob.type);
    triggerDownload({ blob: compressedBlob, filename });
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Download the compressed image">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            disabled={!isDownloadEnabled}
            onClick={handleDownload}
          >
            {!isMobile && "Download"}
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
