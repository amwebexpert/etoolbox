import { CodeOutlined, CopyOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Input, Select, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { SyntaxHighlightBlock } from "~/components/ui/syntax-highlight-block";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useScreenFormStyles } from "~/styles/screen-form.styles";

import { useUrlCurlStore } from "./url-curl.store";
import { CONVERTERS_LIST, getSyntaxLanguage, transformCurl } from "./url-curl.utils";

const { TextArea } = Input;

export const UrlCurl = () => {
  const { styles: formStyles } = useScreenFormStyles();
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const { inputCurl, targetLanguage, transformedResult, setInputCurl, setTargetLanguage, setTransformedResult } =
    useUrlCurlStore();

  const handleConvert = () => {
    const result = transformCurl({ value: inputCurl, targetLanguage });
    setTransformedResult(result);
  };

  const handleLanguageChange = (value: string) => {
    setTargetLanguage(value);
    if (isNotBlank(inputCurl)) {
      const result = transformCurl({ value: inputCurl, targetLanguage: value });
      setTransformedResult(result);
    }
  };

  const handleCopy = () => {
    void copyTextToClipboard({ text: transformedResult });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputCurl(value);
    if (!value) {
      setTransformedResult("");
    }
  };

  const syntaxLanguage = getSyntaxLanguage(targetLanguage);

  const languageOptions = CONVERTERS_LIST.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={formStyles.fullWidth}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="cURL Converter"
          description="Convert cURL commands to various programming languages"
        />

        <TextArea
          placeholder="Paste or type the cURL command here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputCurl}
          onChange={handleInputChange}
          className={formStyles.textArea}
        />

        <ScreenToolbar
          leading={
            <Select
              value={targetLanguage}
              onChange={handleLanguageChange}
              options={languageOptions}
              disabled={isBlank(inputCurl)}
              className={styles.languageSelect}
              popupMatchSelectWidth={false}
              showSearch={!isMobile}
              placeholder="Target language"
            />
          }
          actions={
            <Space size="small" wrap>
              <Tooltip title="Copy result to clipboard">
                <Button icon={<CopyOutlined />} disabled={!transformedResult} onClick={handleCopy}>
                  {!isMobile && "Copy"}
                </Button>
              </Tooltip>

              <Button type="primary" icon={<CodeOutlined />} disabled={isBlank(inputCurl)} onClick={handleConvert}>
                {isMobile ? "Conv." : "Convert"}
              </Button>
            </Space>
          }
        />

        {!!transformedResult && (
          <SyntaxHighlightBlock
            code={`\n${transformedResult}`}
            language={syntaxLanguage}
            className={styles.syntaxHighlighter}
          />
        )}
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  languageSelect: {
    minWidth: 140,
    "@media (max-width: 576px)": {
      minWidth: 120,
    },
  },
  syntaxHighlighter: {
    maxHeight: 500,
    fontSize: 13,
    lineHeight: 1.5,
    borderRadius: token.borderRadius,
  },
}));
