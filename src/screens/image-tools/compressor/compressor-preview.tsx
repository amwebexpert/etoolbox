import { Col, Row } from "antd";

import { computeCompressionRatio } from "./compressor.utils";
import { CompressorImagePanel } from "./compressor-image-panel";
import { useFileDataUrl } from "./use-file-data-url";
import { useImageDimensions } from "./use-image-dimensions";

const MISSING_VALUE_PLACEHOLDER = "—";

interface CompressorPreviewProps {
  file: File;
  compressedBlob: Blob | null;
  compressedObjectUrl: string | null;
  isCompressing: boolean;
}

export const CompressorPreview = ({
  file,
  compressedBlob,
  compressedObjectUrl,
  isCompressing,
}: CompressorPreviewProps) => {
  const originalSrc = useFileDataUrl(file);
  const originalDims = useImageDimensions(originalSrc);
  const compressedDims = useImageDimensions(compressedObjectUrl);

  const compressionRatio = compressedBlob
    ? computeCompressionRatio({ originalBytes: file.size, compressedBytes: compressedBlob.size })
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
          sizeBytes={compressedBlob?.size ?? null}
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
