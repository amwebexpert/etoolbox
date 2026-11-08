import { PictureOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { getImagePreviewSrc } from "@lichens-innovation/ts-common/mime";
import { Alert, Input, Space } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { useSavedFileToast } from "~/hooks/use-saved-file-toast";
import { getImageMetadata, getNonImageDataUri, openNonImageDataUri, saveImageDataUri } from "~/utils/data-uri.utils";

import { useDataUriStore } from "./data-uri.store";
import { DataUriMetadata } from "./data-uri-metadata";
import { DataUriToolbar } from "./data-uri-toolbar";
import { useImageDimensions } from "./use-image-dimensions";

const { TextArea } = Input;

export const DataUri = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const { notifySavedFile } = useSavedFileToast();

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

  const handleDownload = async () => {
    if (isBlank(imagePreviewSrc) || !metadata) return;
    notifySavedFile(await saveImageDataUri({ dataUri: imagePreviewSrc, ext: metadata.ext }));
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

        {isNotBlank(imagePreviewSrc) && <img src={imagePreviewSrc} alt="Decoded preview" className={styles.preview} />}

        {!!metadata && isNotBlank(imagePreviewSrc) && (
          <DataUriMetadata dataUri={imagePreviewSrc} metadata={metadata} dimensions={dimensions} />
        )}

        {isNotBlank(nonImageDataUri) && (
          <Alert
            type="info"
            showIcon
            title={
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
          onDownload={() => void handleDownload()}
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
