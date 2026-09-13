import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/react";
import { type RefObject, useEffect, useState } from "react";

import { useMarkdownEditorStore } from "./editor.store";

interface CrepeEditorProps {
  crepeRef: RefObject<Crepe | undefined>;
}

export const CrepeEditor = ({ crepeRef }: CrepeEditorProps) => {
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
