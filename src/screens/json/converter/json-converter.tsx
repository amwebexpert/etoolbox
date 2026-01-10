import { SwapOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Col, Flex, Form, Input, Row, Select } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";

import { JsonConverterResult } from "./json-converter-result";
import { JsonConverterToolbar } from "./json-converter-toolbar";
import { useJsonConverterStore } from "./json-converter.store";
import { TARGET_LANGUAGES } from "./json-converter.types";
import { useJsonConvert } from "./use-json-convert";

const { TextArea } = Input;

const SOURCE_TYPE_OPTIONS = [
  { value: "json", label: "JSON" },
  { value: "jsObject", label: "JavaScript" },
];

const TARGET_LANGUAGE_OPTIONS = TARGET_LANGUAGES.map(([key, value]) => ({
  value: key,
  label: value,
}));

export const JsonConverter = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const { copyTextToClipboard } = useClipboardCopy();

  const {
    sourceText,
    sourceType,
    targetLanguage,
    rootClassName,
    setSourceText,
    setSourceType,
    setTargetLanguage,
    setRootClassName,
    clearAll,
  } = useJsonConverterStore();

  const { result, convert, isConverting, resetConvert } = useJsonConvert();

  const handleSourceTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSourceText(e.target.value ?? "");
  };

  const handleRootClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRootClassName(e.target.value ?? "");
  };

  const handleConvert = () => {
    if (isBlank(sourceText) || isBlank(rootClassName)) {
      messageApi.warning("Please fill in all required fields");
      return;
    }

    convert({
      source: sourceText,
      sourceType,
      targetLanguage,
      rootClassName,
    });
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: result, successMessage: "Result copied to clipboard!" });
  };

  const handleClear = () => {
    clearAll();
    resetConvert();
  };

  const hasContent = isNotBlank(sourceText) && isNotBlank(rootClassName);
  const hasResult = !!result;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<SwapOutlined />}
          title="JSON Converter"
          description="Convert JSON to TypeScript, Go, Rust, Python, and many other languages"
        />

        <Form layout="vertical" className={styles.form}>
          <Row gutter={[16, 0]}>
            <Col xs={12} sm={8} md={6}>
              <Form.Item label="Source type" className={styles.formItem}>
                <Select
                  value={sourceType}
                  onChange={setSourceType}
                  options={SOURCE_TYPE_OPTIONS}
                  className={styles.select}
                />
              </Form.Item>
            </Col>

            <Col xs={12} sm={8} md={6}>
              <Form.Item label="Target language" className={styles.formItem}>
                <Select
                  value={targetLanguage}
                  onChange={setTargetLanguage}
                  options={TARGET_LANGUAGE_OPTIONS}
                  showSearch={{ optionFilterProp: "label" }}
                  className={styles.select}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={6}>
              <Form.Item
                label="Root class name"
                className={styles.formItem}
                validateStatus={isBlank(rootClassName) ? "error" : undefined}
                help={isBlank(rootClassName) ? "Required" : undefined}
              >
                <Input
                  value={rootClassName}
                  onChange={handleRootClassNameChange}
                  placeholder="e.g. MyClass"
                  spellCheck={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Source data" className={styles.formItem}>
            <TextArea
              placeholder="Paste or type the source JSON or JavaScript object here"
              autoFocus={isDesktop}
              rows={isMobile ? 6 : 8}
              autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isDesktop ? 16 : 10 }}
              value={sourceText}
              onChange={handleSourceTextChange}
              className={styles.textArea}
              spellCheck={false}
            />
          </Form.Item>
        </Form>

        <JsonConverterToolbar
          hasContent={hasContent}
          hasResult={hasResult}
          isConverting={isConverting}
          onConvert={handleConvert}
          onCopy={handleCopy}
          onClear={handleClear}
        />

        <JsonConverterResult result={result} targetLanguage={targetLanguage} />
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
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
}));
