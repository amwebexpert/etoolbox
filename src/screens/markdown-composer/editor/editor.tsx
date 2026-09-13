import "@milkdown/crepe/theme/common/style.css";

import { FileMarkdownOutlined } from "@ant-design/icons";
import { Crepe } from "@milkdown/crepe";
import { MilkdownProvider } from "@milkdown/react";
import { replaceAll } from "@milkdown/utils";
import { Space } from "antd";
import { createStyles } from "antd-style";
import { useRef } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useIsDarkMode } from "~/stores/settings.store";

import { MarkdownImportExportToolbar } from "../shared/markdown-import-export-toolbar";
import { CrepeEditor } from "./crepe-editor";
import { useMarkdownEditorStore } from "./editor.store";
import { useCrepeThemeStylesheet } from "./use-crepe-theme-stylesheet";

export const MarkdownEditor = () => {
  const { styles } = useStyles();
  const isDarkMode = useIsDarkMode();
  useCrepeThemeStylesheet(isDarkMode);

  const markdown = useMarkdownEditorStore((state) => state.markdown);
  const crepeRef = useRef<Crepe>(undefined);

  const handleImport = (importedMarkdown: string) => {
    crepeRef.current?.editor.action(replaceAll(importedMarkdown, true));
  };

  return (
    <ScreenContainer className={styles.screen}>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileMarkdownOutlined />}
          title="Markdown Editor"
          description="Write and format plain markdown in a rich WYSIWYG editor"
        />

        <MarkdownImportExportToolbar markdown={markdown} onImport={handleImport} />

        <div role="region" aria-label="Rich markdown editor" className={styles.editorContainer}>
          <MilkdownProvider>
            <CrepeEditor crepeRef={crepeRef} />
          </MilkdownProvider>
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
  editorContainer: {
    width: "100%",
    minHeight: 600,
  },
}));
