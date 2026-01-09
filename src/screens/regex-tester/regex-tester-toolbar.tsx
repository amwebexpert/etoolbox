import { ClearOutlined, CopyOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { useRegexTesterStore } from "./regex-tester.store";
import { extractMatches, formatExtractedValues } from "./regex-tester.utils";

export const RegexTesterToolbar = () => {
  const { isMobile } = useResponsive();
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();

  const { pattern, inputText, flags, extractFormat, clearAll } = useRegexTesterStore();

  const deferredPattern = useDeferredValue(pattern);
  const deferredInputText = useDeferredValue(inputText);
  const deferredFlags = useDeferredValue(flags);

  const matches = extractMatches({
    pattern: deferredPattern,
    inputText: deferredInputText,
    flags: deferredFlags,
  });

  const hasPattern = isNotBlank(pattern);
  const hasExtracted = matches.length > 0;

  const handleCopyPattern = () => {
    copyTextToClipboard({ text: pattern, successMessage: "Pattern copied to clipboard!" });
  };

  const handleCopyExtracted = () => {
    const formattedValue = formatExtractedValues({ matches, format: extractFormat });
    copyTextToClipboard({ text: formattedValue, successMessage: "Extracted values copied to clipboard!" });
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear all fields">
          <Button icon={<ClearOutlined />} disabled={!hasPattern} onClick={clearAll}>
            {!isMobile && "Clear"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy regex pattern">
          <Button icon={<CopyOutlined />} disabled={!hasPattern} onClick={handleCopyPattern}>
            {!isMobile && "Copy Pattern"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy extracted values">
          <Button type="primary" icon={<CopyOutlined />} disabled={!hasExtracted} onClick={handleCopyExtracted}>
            {!isMobile && "Copy Extracted"}
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
