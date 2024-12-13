import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

import RichTextEditorProvider, { IRichTextEditorProviderProps } from "./RichTextEditorProvider";
import RichTextEditorLoader from "./RichTextEditorLoader";
import { MarkdownControl, markdownControls } from "./controls";
import RichTextEditorMenu from "./RichTextEditorMenu";
import RichTextEditorContent from "./RichTextEditorContent";
import { ReactNode } from "react";

export interface IMarkdownEditorProps extends Omit<IRichTextEditorProviderProps, "children"> {
    controls?: MarkdownControl[][];
    onContentUpdate?: (content: string) => void;
}

const defaultControls: MarkdownControl[][] = [
    ["Bold", "Italic", "Code", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["Link", "Unlink"],
    ["Undo", "Redo"],
    ["Image"],
];

type MarkdownControls = {
  [key in MarkdownControl]: () => ReactNode
}

interface IMarkdownEditor extends MarkdownControls {
  (props: IMarkdownEditorProps): ReactNode
  Content: typeof RichTextEditorContent
  Menu: typeof RichTextEditorMenu
  Provider: typeof RichTextEditorProvider
};
const MarkdownEditor = ((props: IMarkdownEditorProps) => {
    const { onContentUpdate, onUpdate, ...rest } = props;

    function handleUpdate(props) {
        onUpdate?.(props);
        onContentUpdate?.(props.editor.storage.markdown.getMarkdown());
    }

    return (
        <RichTextEditorLoader
            controls={defaultControls}
            extensions={[
                StarterKit,
                Markdown.configure({
                    html: false,
                    linkify: true,
                    breaks: true,
                    transformPastedText: true,
                    transformCopiedText: true,
                }),
            ]}
            onUpdate={handleUpdate}
            {...rest}
        />
    );
}) as IMarkdownEditor

Object.entries(markdownControls).forEach(([key, component]) => {
    MarkdownEditor[key as MarkdownControl] = component;
});
MarkdownEditor.Content = RichTextEditorContent;
MarkdownEditor.Menu = RichTextEditorMenu;
MarkdownEditor.Provider = RichTextEditorProvider;

export default MarkdownEditor;
