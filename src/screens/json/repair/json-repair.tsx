import { ToolOutlined } from "@ant-design/icons";
import { getErrorMessage, isBlank, isNotBlank } from "@lichens-innovation/ts-common";
import { Flex, Input } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";
import { useToastMessage } from "~/providers/toast-message-provider";
import { downloadJson } from "~/utils/download.utils";

import { JsonRepairResult } from "./json-repair-result";
import { JsonRepairToolbar } from "./json-repair-toolbar";
import { useJsonRepairStore } from "./json-repair.store";
import { useJsonRepair } from "./use-json-repair";

const { TextArea } = Input;

export const JsonRepair = () => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();
  const messageApi = useToastMessage();
  const { copyTextToClipboard } = useClipboardCopy();

  const { inputText, setInputText, clearInput } = useJsonRepairStore();
  const { repairedJson, repair, isRepairing, resetRepair } = useJsonRepair();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value ?? "");
  };

  const handleRepair = () => {
    if (isBlank(inputText)) {
      messageApi.warning("Please enter some JSON content to repair");
      return;
    }

    repair(inputText);
  };

  const handleCopy = () => {
    copyTextToClipboard({ text: repairedJson, successMessage: "Repaired JSON copied to clipboard!" });
  };

  const handleSaveAs = () => {
    if (!repairedJson) return;

    try {
      downloadJson({ content: repairedJson });
      messageApi.success("JSON file saved!");
    } catch (e: unknown) {
      messageApi.error("Failed to save file: " + getErrorMessage(e));
    }
  };

  const handleClear = () => {
    clearInput();
    resetRepair();
  };

  const hasInput = isNotBlank(inputText);
  const hasResult = !!repairedJson;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<ToolOutlined />}
          title="JSON Repair"
          description="Repair malformed JSON by fixing common issues like missing quotes, trailing commas, and unescaped characters"
        />

        <TextArea
          placeholder="Paste or type the malformed JSON content here"
          autoFocus={isDesktop}
          rows={isMobile ? 6 : 10}
          autoSize={{ minRows: isMobile ? 4 : 6, maxRows: isDesktop ? 20 : 10 }}
          value={inputText}
          onChange={handleInputChange}
          className={styles.textArea}
          spellCheck={false}
        />

        <JsonRepairToolbar
          hasInput={hasInput}
          hasResult={hasResult}
          isRepairing={isRepairing}
          onRepair={handleRepair}
          onCopy={handleCopy}
          onSaveAs={handleSaveAs}
          onClear={handleClear}
        />

        <JsonRepairResult repairedJson={repairedJson} />
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
