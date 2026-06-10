import { Button, Space, Typography } from "antd";

import { useCompressorStore } from "./compressor.store";
import { CompressorImageUpload } from "./compressor-image-upload";
import { CompressorPreview } from "./compressor-preview";
import { CompressorSettings } from "./compressor-settings";
import { CompressorToolbar } from "./compressor-toolbar";
import { useCompressor } from "./use-compressor";

export const ImageOcrCompressor = () => {
  const selectedFile = useCompressorStore((state) => state.selectedFile);
  const setSelectedFile = useCompressorStore((state) => state.setSelectedFile);
  const clearSelectedFile = useCompressorStore((state) => state.clearSelectedFile);
  const { compressedBlob, isCompressing } = useCompressor(selectedFile);

  if (!selectedFile) {
    return <CompressorImageUpload onFileSelect={setSelectedFile} />;
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Typography.Text>{selectedFile.name}</Typography.Text>
      <Button onClick={clearSelectedFile}>Change image</Button>
      <CompressorSettings />
      <CompressorPreview />
      <CompressorToolbar
        compressedBlob={compressedBlob}
        isCompressing={isCompressing}
        originalFileName={selectedFile.name}
      />
    </Space>
  );
};
