import { PictureOutlined } from "@ant-design/icons";
import { getImagePreviewSrc } from "@lichens-innovation/ts-common/mime";
import { Alert, Input, Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import {
  downloadImageDataUri,
  getImageMetadata,
  getNonImageDataUri,
  openNonImageDataUri,
} from "~/utils/data-uri.utils";

import { useDataUriStore } from "./data-uri.store";
import { DataUriMetadata } from "./data-uri-metadata";
import { DataUriToolbar } from "./data-uri-toolbar";
import { useImageDimensions } from "./use-image-dimensions";

const { TextArea } = Input;

export const DataUri = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const { inputText, setInputText } = useDataUriStore();

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
          title="Base64 Data URI"
          description="Decode and preview Base64 data URIs — images, text, and other media types"
        />

        <TextArea
          placeholder="Paste a Base64 data URI here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
        />

        {imagePreviewSrc && <img src={imagePreviewSrc} alt="Decoded preview" className={styles.preview} />}

        {metadata && imagePreviewSrc && (
          <DataUriMetadata dataUri={imagePreviewSrc} metadata={metadata} dimensions={dimensions} />
        )}

        {nonImageDataUri && (
          <Alert
            type="info"
            showIcon
            message={
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openNonImageDataUri(nonImageDataUri);
                }}
              >
                Open in new tab
              </a>
            }
          />
        )}

        <DataUriToolbar
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
