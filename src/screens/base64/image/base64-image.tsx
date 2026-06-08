import { PictureOutlined } from "@ant-design/icons";
import { getImagePreviewSrc } from "@lichens-innovation/ts-common/mime";
import { Alert, Input, Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { downloadImageDataUri, getImageMetadata, getNonImageDataUri } from "~/utils/base64-image.utils";

import { useBase64ImageStore } from "./base64-image.store";
import { Base64ImageMetadata } from "./base64-image-metadata";
import { Base64ImageToolbar } from "./base64-image-toolbar";
import { useImageDimensions } from "./use-image-dimensions";

const { TextArea } = Input;

export const Base64Image = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { inputText, setInputText } = useBase64ImageStore();

  const imagePreviewSrc = getImagePreviewSrc(inputText);
  const metadata = getImageMetadata(inputText);
  const dimensions = useImageDimensions(imagePreviewSrc);
  const nonImageDataUri = getNonImageDataUri(inputText);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value ?? "");
  };

  const handleClear = () => {
    setInputText("");
  };

  const handleDownload = () => {
    if (!imagePreviewSrc || !metadata) return;
    downloadImageDataUri({ dataUri: imagePreviewSrc, ext: metadata.ext });
  };

  const hasContent = inputText.length > 0;
  const canDownload = imagePreviewSrc !== null && metadata !== null;

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<PictureOutlined />}
          title="Base64 Image URI"
          description="Encode and decode images to/from Base64 data URIs"
        />

        <TextArea
          placeholder="Paste a Base64 image data URI here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
        />

        {imagePreviewSrc && <img src={imagePreviewSrc} alt="Decoded preview" className={styles.preview} />}

        {metadata && imagePreviewSrc && (
          <Base64ImageMetadata dataUri={imagePreviewSrc} metadata={metadata} dimensions={dimensions} />
        )}

        {nonImageDataUri && (
          <Alert
            type="info"
            showIcon
            title={
              <a href={nonImageDataUri} target="_blank" rel="noopener noreferrer">
                Open in new tab
              </a>
            }
          />
        )}

        <Base64ImageToolbar
          hasContent={hasContent}
          canDownload={canDownload}
          onClear={handleClear}
          onDownload={handleDownload}
        />
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
  preview: {
    maxWidth: "100%",
    maxHeight: "60vh",
    objectFit: "contain",
  },
}));
