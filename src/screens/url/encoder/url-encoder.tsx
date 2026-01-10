import {
  CodeOutlined,
  CopyOutlined,
  SwapOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { useUrlEncoderStore } from "./url-encoder.store";
import { transformUrl } from "./url-encoder.utils";

const { TextArea } = Input;

export const UrlEncoder = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const { inputText, outputText, setInputText, setOutputText, swapContent } =
    useUrlEncoderStore();

  const handleEncode = () => {
    const result = transformUrl({ value: inputText, decode: false });
    setOutputText(result);
  };

  const handleDecode = () => {
    const result = transformUrl({ value: inputText, decode: true });
    setOutputText(result);
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: outputText });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputText(value);
    if (!value) {
      setOutputText("");
    }
  };

  return (
    <ScreenContainer>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<CodeOutlined />}
          title="URL Encoder / Decoder"
          description="Encode and decode URL strings using encodeURIComponent / decodeURIComponent"
        />

        <TextArea
          placeholder="Paste or type the content to encode/decode here"
          autoFocus={isDesktop}
          rows={isMobile ? 4 : 6}
          autoSize={{ minRows: 4, maxRows: isDesktop ? 20 : 6 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
        />

        <div className={styles.toolbar}>
          <Tooltip title="Swap: put result into input">
            <Button
              icon={<SwapOutlined />}
              disabled={!outputText}
              onClick={swapContent}
            />
          </Tooltip>

          <div className={styles.spacer} />

          <Space size="small" wrap>
            <Tooltip title="Copy result to clipboard">
              <Button
                icon={<CopyOutlined />}
                disabled={!outputText}
                onClick={handleCopy}
              >
                {!isMobile && "Copy"}
              </Button>
            </Tooltip>

            <Button
              type="primary"
              icon={<CodeOutlined />}
              disabled={!inputText}
              onClick={handleEncode}
            >
              {isMobile ? "Enc." : "Encode"}
            </Button>

            <Button
              type="primary"
              icon={<UnlockOutlined />}
              disabled={!inputText}
              onClick={handleDecode}
            >
              {isMobile ? "Dec." : "Decode"}
            </Button>
          </Space>
        </div>

        {outputText && (
          <div className={styles.resultSection}>
            <Typography.Text type="secondary" className={styles.resultLabel}>
              Result
            </Typography.Text>
            <div className={styles.resultBox}>
              <Typography.Text
                copyable={{ text: outputText }}
                className={styles.resultText}
              >
                {outputText}
              </Typography.Text>
            </div>
          </div>
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
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  resultBox: {
    padding: 16,
    backgroundColor: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflowX: "auto",
  },
  resultText: {
    fontFamily: "monospace",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
  },
}));
