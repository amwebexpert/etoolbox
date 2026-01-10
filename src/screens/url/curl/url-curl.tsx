import { CodeOutlined, CopyOutlined } from "@ant-design/icons";
import { isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Input, Select, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";
import SyntaxHighlighter from "react-syntax-highlighter";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useSyntaxHighlightTheme } from "~/hooks/use-syntax-highlight-theme";

import { useUrlCurlStore } from "./url-curl.store";
import {
  CONVERTERS_LIST,
  getSyntaxLanguage,
  transformCurl,
} from "./url-curl.utils";

const { TextArea } = Input;

export const UrlCurl = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();
  const syntaxTheme = useSyntaxHighlightTheme();

  const {
    inputCurl,
    targetLanguage,
    transformedResult,
    setInputCurl,
    setTargetLanguage,
    setTransformedResult,
  } = useUrlCurlStore();

  const handleConvert = () => {
    const result = transformCurl(inputCurl, targetLanguage);
    setTransformedResult(result);
  };

  const handleLanguageChange = (value: string) => {
    setTargetLanguage(value);
    if (isNotBlank(inputCurl)) {
      const result = transformCurl(inputCurl, value);
      setTransformedResult(result);
    }
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: transformedResult });
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
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
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
          className={styles.textArea}
        />

        <div className={styles.toolbar}>
          <Select
            value={targetLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            disabled={isBlank(inputCurl)}
            className={styles.languageSelect}
            popupMatchSelectWidth={false}
            showSearch
            placeholder="Target language"
          />

          <div className={styles.spacer} />

          <Space size="small" wrap>
            <Tooltip title="Copy result to clipboard">
              <Button
                icon={<CopyOutlined />}
                disabled={!transformedResult}
                onClick={handleCopy}
              >
                {!isMobile && "Copy"}
              </Button>
            </Tooltip>

            <Button
              type="primary"
              icon={<CodeOutlined />}
              disabled={isBlank(inputCurl)}
              onClick={handleConvert}
            >
              {isMobile ? "Conv." : "Convert"}
            </Button>
          </Space>
        </div>

        {transformedResult && (
          <SyntaxHighlighter
            language={syntaxLanguage}
            style={syntaxTheme}
            className={styles.syntaxHighlighter}
            wrapLongLines={true}
          >{`\n${transformedResult}`}</SyntaxHighlighter>
        )}
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  fullWidth: {
    width: "100%",
  },
  textArea: {
    fontFamily: "monospace",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
  languageSelect: {
    minWidth: 140,
    "@media (max-width: 576px)": {
      minWidth: 120,
    },
  },
  syntaxHighlighter: {
    padding: "16px !important",
    borderRadius: token.borderRadius,
    border: `1px solid ${token.colorBorder}`,
    maxHeight: 500,
    overflow: "auto !important",
    fontSize: 13,
    lineHeight: "1.5 !important",
  },
}));
