import { Button, Space, Typography } from "antd";

import { CompressorImageUpload } from "./compressor-image-upload";
import { useCompressorStore } from "./compressor.store";

export const ImageOcrCompressor = () => {
  const selectedFile = useCompressorStore((state) => state.selectedFile);
  const setSelectedFile = useCompressorStore((state) => state.setSelectedFile);
  const clearSelectedFile = useCompressorStore((state) => state.clearSelectedFile);

  if (!selectedFile) {
    return <CompressorImageUpload onFileSelect={setSelectedFile} />;
  }

  return (
    <Space direction="vertical" size="middle">
      <Typography.Text>{selectedFile.name}</Typography.Text>
      <Button onClick={clearSelectedFile}>Change image</Button>
    </Space>
  );
};
