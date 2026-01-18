import { FormatPainterOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@lichens-innovation/ts-common";
import { Flex, Input } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";
import { downloadJson } from "~/utils/download.utils";

import { JsonFormatterConfigPanel } from "./json-formatter-config-panel";
import { JsonFormatterResult } from "./json-formatter-result";
import { JsonFormatterToolbar } from "./json-formatter-toolbar";
import { useJsonFormatterStore } from "./json-formatter.store";
import { getFormattedJson } from "./json-formatter.utils";

const { TextArea } = Input;

export const JsonFormatter = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const { copyTextToClipboard } = useClipboardCopy();

  const { inputText, setInputText, viewMode, setViewMode } = useJsonFormatterStore();
  const [isMinifiedMode, setIsMinifiedMode] = useState<boolean>(false);

  const formattedJson = getFormattedJson({ inputText, isMinifiedMode });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value ?? "";
    setInputText(value);
  };

  const handleToggleFormat = () => {
    setIsMinifiedMode((current) => !current);
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: formattedJson, successMessage: "JSON copied to clipboard!" });
  };

  const handleSaveAs = () => {
    if (!formattedJson) return;

    try {
      downloadJson({ content: formattedJson });
      messageApi.success("JSON file saved!");
    } catch (e: unknown) {
      messageApi.error("Failed to save file: " + getErrorMessage(e));
    }
  };

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FormatPainterOutlined />}
          title="JSON Formatter"
          description="Format, minify, and beautify JSON content with syntax highlighting or interactive view"
        />

        <TextArea
          placeholder="Paste or type the JSON content here"
          autoFocus={isDesktop}
          rows={isMobile ? 6 : 10}
          autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isDesktop ? 20 : 10 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
          spellCheck={false}
        />

        <JsonFormatterToolbar
          isMinified={isMinifiedMode}
          hasContent={!!formattedJson}
          viewMode={viewMode}
          onToggleFormat={handleToggleFormat}
          onCopy={handleCopy}
          onSaveAs={handleSaveAs}
          onViewModeChange={setViewMode}
        />

        {viewMode === "react-json-view" && <JsonFormatterConfigPanel />}

        <JsonFormatterResult formattedJson={formattedJson} />
      </Flex>
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
}));
