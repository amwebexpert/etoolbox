import { Col, Row } from "antd";

import { useCompressorStore } from "./compressor.store";
import { computeCompressionRatio } from "./compressor.utils";
import { CompressorImagePanel } from "./compressor-image-panel";
import { useCompressor } from "./use-compressor";
import { useFileDataUrl } from "./use-file-data-url";
import { useImageDimensions } from "./use-image-dimensions";

const MISSING_VALUE_PLACEHOLDER = "—";

export const CompressorPreview = () => {
  const file = useCompressorStore((state) => state.selectedFile);
  const { compressedBlob, compressedObjectUrl, isCompressing } = useCompressor(file);

  const originalSrc = useFileDataUrl(file);
  const originalDims = useImageDimensions(originalSrc);
  const compressedDims = useImageDimensions(compressedObjectUrl);

  if (!file) return null;

  const compressionRatio = compressedBlob
    ? computeCompressionRatio(file.size, compressedBlob.size)
    : MISSING_VALUE_PLACEHOLDER;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <CompressorImagePanel
          title="Original"
          src={originalSrc}
          sizeBytes={file.size}
          width={originalDims?.width ?? null}
          height={originalDims?.height ?? null}
          mimeType={file.type}
        />
      </Col>
      <Col xs={24} md={12}>
        <CompressorImagePanel
          title="Compressed"
          src={compressedObjectUrl}
          sizeBytes={compressedBlob?.size ?? 0}
          width={compressedDims?.width ?? null}
          height={compressedDims?.height ?? null}
          mimeType={compressedBlob?.type ?? ""}
          compressionRatio={compressionRatio}
          isLoading={isCompressing}
        />
      </Col>
    </Row>
  );
};
