import { FileMarkdownOutlined } from "@ant-design/icons";
import { MarkdownComposer } from "@lichens-innovation/react-markdown-composer";
import { Space } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { getRenderTemplate } from "./markdown-composer.renderers";
import { useMarkdownComposerStore } from "./markdown-composer.store";
import { parseJsonDataText } from "./markdown-composer.utils";
import { MarkdownComposerSettings } from "./markdown-composer-settings";

export const MarkdownComposerScreen = () => {
  const { styles } = useStyles();

  const { markdown, jsonDataText, engine, setMarkdown } = useMarkdownComposerStore();
  const renderTemplate = getRenderTemplate(engine);

  const parseResult = parseJsonDataText(jsonDataText);
  const jsonErrorMessage = parseResult.errorMessage;

  const [trackedJsonDataText, setTrackedJsonDataText] = useState(jsonDataText);
  const [lastValidData, setLastValidData] = useState<unknown>(() =>
    parseResult.errorMessage === undefined ? parseResult.data : undefined
  );

  if (trackedJsonDataText !== jsonDataText) {
    setTrackedJsonDataText(jsonDataText);
    if (parseResult.errorMessage === undefined) {
      setLastValidData(parseResult.data);
    }
  }

  const inputData = jsonErrorMessage === undefined ? parseResult.data : lastValidData;

  return (
    <ScreenContainer className={styles.screen}>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileMarkdownOutlined />}
          title="Markdown Composer"
          description="Compose markdown templates with a live JSON data preview"
        />

        <MarkdownComposerSettings jsonErrorMessage={jsonErrorMessage} />

        <div className={styles.composerContainer}>
          <MarkdownComposer
            inputData={inputData}
            markdown={markdown}
            onMarkdownChange={setMarkdown}
            renderTemplate={renderTemplate}
          />
        </div>
      </Space>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  screen: {
    maxWidth: "none",
  },
  fullWidth: {
    width: "100%",
  },
  composerContainer: {
    width: "100%",
    height: 600,
  },
}));
