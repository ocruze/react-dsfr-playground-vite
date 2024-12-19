import { ReactNode } from "react";
import StarterKit from "@tiptap/starter-kit";

import { Control, richTextEditorControls } from "./controls";
import RichTextEditorProvider from "./RichTextEditorProvider";
import RichTextEditorLoader, { IRichTextEditorLoaderProps } from "./RichTextEditorLoader";
import RichTextEditorContent from "./RichTextEditorContent";
import RichTextEditorMenu from "./RichTextEditorMenu";
import RichTextEditorGroup from "./RichTextEditorGroup";
export interface IRichTextEditorProps extends Omit<IRichTextEditorLoaderProps, "controls"> {
    controls?: (Control | (() => ReactNode))[][];
    onContentUpdate?: (content: string) => void;
}

const defaultControls: Control[][] = [
    ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
    ["Link", "Unlink"],
    ["Undo", "Redo"],
    ["Image", "Youtube"],
];

type RichTextEditorControls = {
  [key in Control]: () => ReactNode
}

interface IRichTextEditor extends RichTextEditorControls {
  (props: IRichTextEditorProps): ReactNode
  Content: typeof RichTextEditorContent
  Group: typeof RichTextEditorGroup
  Menu: typeof RichTextEditorMenu
  Provider: typeof RichTextEditorProvider
};
const RichTextEditor = ((props: IRichTextEditorProps) => {
    const { onContentUpdate, onUpdate, ...rest } = props;

    function handleUpdate(props) {
        onUpdate?.(props);
        onContentUpdate?.(props.editor.getHTML());
    }

    return <RichTextEditorLoader controls={defaultControls} extensions={[StarterKit]} onUpdate={handleUpdate} {...rest} />;
}) as IRichTextEditor

Object.entries(richTextEditorControls).forEach(([key, component]) => {
    RichTextEditor[key as Control] = component;
});
RichTextEditor.Content = RichTextEditorContent;
RichTextEditor.Group = RichTextEditorGroup;
RichTextEditor.Menu = RichTextEditorMenu;
RichTextEditor.Provider = RichTextEditorProvider;

export default RichTextEditor;
