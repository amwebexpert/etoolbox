import { ScanOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Card, Col, Flex, Form, Row, Select } from "antd";
import { createStyles } from "antd-style";
import { useCallback, useEffect } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/hooks/use-toast-message";
import { useScreenFormStyles } from "~/styles/screen-form.styles";

import { useOcrStore } from "./ocr.store";
import { LANGUAGE_OPTIONS } from "./ocr.types";
import { clipboardToDataUrl, fileToDataUrl, isValidImageFile } from "./ocr.utils";
import { OcrImage } from "./ocr-image";
import { ImageOcrResult } from "./ocr-result";
import { OcrToolbar } from "./ocr-toolbar";
import { useOcr } from "./use-ocr";

export const Ocr = () => {
  const { styles: formStyles } = useScreenFormStyles();
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();
  const messageApi = useToastMessage();

  const { language, imageDataUrl, workerStatus, setLanguage, setImageDataUrl, clearImage } = useOcrStore();

  const { ocrResult, runOcr, isOcrProcessing, resetOcr } = useOcr();

  const handleFileSelect = async (file: File) => {
    if (!isValidImageFile(file)) {
      messageApi.error("Please select a valid image file");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setImageDataUrl(dataUrl);
      resetOcr();
    } catch {
      messageApi.error("Failed to read the image file");
    }
  };

  const handleProcess = () => {
    if (!imageDataUrl) {
      messageApi.warning("Please select an image first");
      return;
    }

    runOcr({ imageDataUrl, language });
  };

  const handleClear = () => {
    clearImage();
    resetOcr();
  };

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData;
      if (!clipboardData?.items) return;

      clipboardToDataUrl({
        items: clipboardData.items,
        onLoad: (dataUrl) => {
          setImageDataUrl(dataUrl);
          resetOcr();
          messageApi.success("Image pasted from clipboard!");
        },
        onError: (error) => {
          messageApi.error(`Failed to paste image: ${error.message}`);
        },
      });
    },
    [setImageDataUrl, resetOcr, messageApi]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const hasImage = isNotBlank(imageDataUrl);

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={formStyles.fullWidth}>
        <ScreenHeader
          icon={<ScanOutlined />}
          title="Image OCR"
          description="Extract text from images using Optical Character Recognition. Supports multiple languages."
        />

        <Form layout="vertical" className={formStyles.form}>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item label="Image language" className={formStyles.formItem}>
                <Select
                  value={language}
                  onChange={setLanguage}
                  options={LANGUAGE_OPTIONS}
                  showSearch={{ optionFilterProp: "label" }}
                  autoFocus={isDesktop}
                  className={styles.select}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Card className={styles.card}>
          <OcrImage
            imageDataUrl={imageDataUrl}
            onFileSelect={(file) => {
              void handleFileSelect(file);
            }}
            onClear={handleClear}
          />
        </Card>

        <OcrToolbar
          hasImage={hasImage}
          resultText={ocrResult?.text}
          isProcessing={isOcrProcessing}
          onProcess={handleProcess}
          onClear={handleClear}
        />

        <ImageOcrResult result={ocrResult} workerStatus={workerStatus} isProcessing={isOcrProcessing} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  select: {
    width: "100%",
  },
  card: {
    width: "100%",
  },
}));
