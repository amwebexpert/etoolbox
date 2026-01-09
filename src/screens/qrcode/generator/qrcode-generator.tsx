import { QrcodeOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Flex, Form, Input } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";

import { OptionsContainer as QRCodeGeneratorOptions } from "./options/options-container";
import { QRCodeGeneratorResult } from "./qrcode-generator-result";
import { QRCodeGeneratorToolbar } from "./qrcode-generator-toolbar";
import { useQRCodeGeneratorStore } from "./qrcode-generator.store";
import { downloadQRCode } from "./qrcode-generator.utils";
import { useQRCodeGenerate } from "./use-qrcode-generate";

const { TextArea } = Input;

export const QrcodeGenerator = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const { copyTextToClipboard, copyImageToClipboard } = useClipboardCopy();

  const { inputText, options, showAdvancedOptions, setInputText, setOptions, setShowAdvancedOptions, clearAll } =
    useQRCodeGeneratorStore();

  const { qrCodeDataUrl, generate, isGenerating, resetGenerate } = useQRCodeGenerate();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value ?? "");
  };

  const handleGenerate = () => {
    if (isBlank(inputText)) {
      messageApi.warning("Please enter some text to generate a QR code");
      return;
    }

    generate({ text: inputText, options });
  };

  const handleCopyDataUrl = () => {
    copyTextToClipboard({ text: qrCodeDataUrl, successMessage: "Data URL copied to clipboard!" });
  };

  const handleCopyImage = () => {
    copyImageToClipboard({ dataUrl: qrCodeDataUrl, successMessage: "QR code image copied to clipboard!" });
  };

  const handleDownload = () => {
    downloadQRCode({ dataUrl: qrCodeDataUrl, filename: "qrcode" });
    messageApi.success("QR code downloaded!");
  };

  const handleClear = () => {
    clearAll();
    resetGenerate();
  };

  const hasContent = isNotBlank(inputText);
  const hasResult = !!qrCodeDataUrl;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<QrcodeOutlined />}
          title="QR Code Generator"
          description="Generate QR codes from text, URLs, or any data. Customize colors, size, and error correction level."
        />

        <Form layout="vertical" className={styles.form}>
          <Form.Item
            label="Content"
            className={styles.formItem}
            validateStatus={isBlank(inputText) ? undefined : undefined}
            extra={
              <span className={styles.charCount}>
                {inputText.length.toLocaleString()} character{inputText.length !== 1 ? "s" : ""}
              </span>
            }
          >
            <TextArea
              placeholder="Enter the text, URL, or data to encode in the QR code"
              autoFocus={isDesktop}
              rows={isMobile ? 4 : 6}
              autoSize={{ minRows: isMobile ? 3 : 4, maxRows: isDesktop ? 12 : 8 }}
              value={inputText}
              onChange={handleInputChange}
              className={styles.textArea}
              spellCheck={false}
            />
          </Form.Item>
        </Form>

        <QRCodeGeneratorOptions
          options={options}
          showAdvanced={showAdvancedOptions}
          onOptionsChange={setOptions}
          onShowAdvancedChange={setShowAdvancedOptions}
        />

        <QRCodeGeneratorToolbar
          hasContent={hasContent}
          hasResult={hasResult}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onCopyDataUrl={handleCopyDataUrl}
          onCopyImage={handleCopyImage}
          onDownload={handleDownload}
          onClear={handleClear}
        />

        <QRCodeGeneratorResult dataUrl={qrCodeDataUrl} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 8,
  },
  textArea: {
    fontFamily: "monospace",
  },
  charCount: {
    fontSize: 12,
    fontFamily: "monospace",
  },
}));
