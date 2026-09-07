import "@milkdown/crepe/theme/common/style.css";

import { FileMarkdownOutlined } from "@ant-design/icons";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Space } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useRef, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useIsDarkMode } from "~/stores/settings.store";

import { useMarkdownEditorStore } from "./editor.store";
import { useCrepeThemeStylesheet } from "./use-crepe-theme-stylesheet";

const CrepeEditor = () => {
  const setMarkdown = useMarkdownEditorStore((state) => state.setMarkdown);
  const crepeRef = useRef<Crepe>(undefined);
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

    const handleInput = () => {
      const updatedMarkdown = crepeRef.current?.getMarkdown();
      if (updatedMarkdown !== undefined) {
        setMarkdown(updatedMarkdown);
      }
    };

    editorRoot.addEventListener("input", handleInput);
    return () => editorRoot.removeEventListener("input", handleInput);
  }, [editorRoot, setMarkdown]);

  return <Milkdown />;
};

export const MarkdownEditor = () => {
  const { styles } = useStyles();
  const isDarkMode = useIsDarkMode();
  useCrepeThemeStylesheet(isDarkMode);

  return (
    <ScreenContainer className={styles.screen}>
      <Space orientation="vertical" size="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileMarkdownOutlined />}
          title="Markdown Editor"
          description="Write and format plain markdown in a rich WYSIWYG editor"
        />

        <div role="region" aria-label="Rich markdown editor" className={styles.editorContainer}>
          <MilkdownProvider>
            <CrepeEditor />
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
