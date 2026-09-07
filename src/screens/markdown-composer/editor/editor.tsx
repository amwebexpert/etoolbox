import "@milkdown/crepe/theme/common/style.css";

import { FileMarkdownOutlined } from "@ant-design/icons";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { replaceAll } from "@milkdown/utils";
import { Space } from "antd";
import { createStyles } from "antd-style";
import { type RefObject, useEffect, useRef, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useIsDarkMode } from "~/stores/settings.store";

import { MarkdownImportExportToolbar } from "../shared/markdown-import-export-toolbar";
import { useMarkdownEditorStore } from "./editor.store";
import { useCrepeThemeStylesheet } from "./use-crepe-theme-stylesheet";

interface CrepeEditorProps {
  crepeRef: RefObject<Crepe | undefined>;
}

const CrepeEditor = ({ crepeRef }: CrepeEditorProps) => {
  const setMarkdown = useMarkdownEditorStore((state) => state.setMarkdown);
  const [editorRoot, setEditorRoot] = useState<HTMLElement>();

  useEditor((root) => {
    const initialMarkdown = useMarkdownEditorStore.getState().markdown;
    const crepe = new Crepe({ root, defaultValue: initialMarkdown });
    crepeRef.current = crepe;
    setEditorRoot(root);

    return crepe;
  }, []);

  useEffect(() => {
    if (!editorRoot) return;

    const handleContentChange = () => {
      const updatedMarkdown = crepeRef.current?.getMarkdown();
      if (updatedMarkdown !== undefined) {
        setMarkdown(updatedMarkdown);
      }
    };

    editorRoot.addEventListener("input", handleContentChange);

    // ProseMirror keymap edits (select-all+delete, backspace) skip the native "input" event; MutationObserver catches those, "input" stays primary since it's synchronous. habit-hooks-disable non-essential-comment
    const observer = new MutationObserver(handleContentChange);
    observer.observe(editorRoot, { subtree: true, childList: true, characterData: true });

    return () => {
      editorRoot.removeEventListener("input", handleContentChange);
      observer.disconnect();
    };
  }, [editorRoot, setMarkdown, crepeRef]);

  return <Milkdown />;
};

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
