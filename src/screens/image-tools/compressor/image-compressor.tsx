import { FileImageOutlined } from "@ant-design/icons";
import { Alert, Flex } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useCompressorStore } from "./compressor.store";
import { CompressorImageUpload } from "./compressor-image-upload";
import { CompressorPreview } from "./compressor-preview";
import { CompressorSettings } from "./compressor-settings";
import { CompressorToolbar } from "./compressor-toolbar";
import { useCompressor } from "./use-compressor";

const SCREEN_TITLE = "Image Compressor";
const SCREEN_DESCRIPTION =
  "Resize and re-encode images directly in your browser. Adjust quality, dimensions and format, then download the result.";

export const ImageOcrCompressor = () => {
  const { styles } = useStyles();
  const selectedFile = useCompressorStore((state) => state.selectedFile);
  const setSelectedFile = useCompressorStore((state) => state.setSelectedFile);
  const { compressedBlob, compressedObjectUrl, isCompressing, compressionError } = useCompressor(selectedFile);

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader icon={<FileImageOutlined />} title={SCREEN_TITLE} description={SCREEN_DESCRIPTION} />

        {!selectedFile && <CompressorImageUpload onFileSelect={setSelectedFile} />}

        {selectedFile && (
          <>
            <CompressorSettings />

            {compressionError && (
              <Alert type="error" showIcon message="Compression failed" description={compressionError.message} />
            )}

            <CompressorPreview
              file={selectedFile}
              compressedBlob={compressedBlob}
              compressedObjectUrl={compressedObjectUrl}
              isCompressing={isCompressing}
            />

            <CompressorToolbar
              compressedBlob={compressedBlob}
              isCompressing={isCompressing}
              originalFileName={selectedFile.name}
            />
          </>
        )}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
}));
