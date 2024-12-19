import { createContext, useContext } from "react";
import { Editor } from "@tiptap/react";

export const richTextEditorContext = createContext<Editor | null>(null);

export function useRichTextEditor(): Editor {
    const editor = useContext(richTextEditorContext);
    if (!editor) {
      throw new Error("Missing editor context");
  }
  return editor;
}
