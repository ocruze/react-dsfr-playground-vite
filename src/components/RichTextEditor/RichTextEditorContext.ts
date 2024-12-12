import { createContext, useContext } from "react";
import { Editor } from "@tiptap/react";

export const richTextEditorContext = createContext<Editor | null>(null);

export function useRichTextEditor() {
    return useContext(richTextEditorContext);
}
