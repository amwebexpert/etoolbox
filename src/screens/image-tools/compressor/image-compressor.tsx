import { FileImageOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { useCompressorStore } from "./compressor.store";
import { buildExportFilename, triggerDownload } from "./compressor.utils";
import { CompressorImageUpload } from "./compressor-image-upload";
import { CompressorPreview } from "./compressor-preview";
import { CompressorSettings } from "./compressor-settings";
import { CompressorToolbar } from "./compressor-toolbar";
import { selectCompressorSettings, useCompressor } from "./use-compressor";

const SCREEN_TITLE = "Image Compressor";
const SCREEN_DESCRIPTION =
  "Resize and re-encode images directly in your browser. Adjust quality, dimensions and format, then compress and download the result.";

export const ImageOcrCompressor = () => {
  const { styles } = useStyles();
  const selectedFile = useCompressorStore((state) => state.selectedFile);
  const setSelectedFile = useCompressorStore((state) => state.setSelectedFile);
  const clearSelectedFile = useCompressorStore((state) => state.clearSelectedFile);
  const { compressedBlob, compressedObjectUrl, isCompressing, compress, resetCompress } = useCompressor();

  const handleCompress = (): void => {
    if (!selectedFile) return;

    compress({
      file: selectedFile,
      settings: selectCompressorSettings(useCompressorStore.getState()),
    });
  };

  const handleDownload = (): void => {
    if (!compressedBlob || !selectedFile) return;

    const filename = buildExportFilename(selectedFile.name, compressedBlob.type);
    triggerDownload({ blob: compressedBlob, filename });
  };

  const handleClear = (): void => {
    clearSelectedFile();
    resetCompress();
  };

  useEffect(() => {
    if (!compressedObjectUrl) {
      return;
    }

    return () => URL.revokeObjectURL(compressedObjectUrl);
  }, [compressedObjectUrl]);

  const hasFile = !!selectedFile;
  const hasResult = !!compressedBlob;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader icon={<FileImageOutlined />} title={SCREEN_TITLE} description={SCREEN_DESCRIPTION} />

        {!selectedFile && <CompressorImageUpload onFileSelect={setSelectedFile} />}

        {selectedFile && (
          <>
            <CompressorSettings />

            <CompressorToolbar
              hasFile={hasFile}
              hasResult={hasResult}
              isCompressing={isCompressing}
              onCompress={handleCompress}
              onDownload={handleDownload}
              onClear={handleClear}
            />

            <CompressorPreview
              file={selectedFile}
              compressedBlob={compressedBlob}
              compressedObjectUrl={compressedObjectUrl}
              isCompressing={isCompressing}
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
