import { ReactNode } from "react";
import {
    RichTextEditorAlignCenter,
    RichTextEditorAlignJustify,
    RichTextEditorAlignLeft,
    RichTextEditorAlignRight,
    RichTextEditorBlockquote,
    RichTextEditorBold,
    RichTextEditorBulletList,
    RichTextEditorClearFormatting,
    RichTextEditorCode,
    RichTextEditorCodeBlock,
    RichTextEditorColor,
    RichTextEditorH1,
    RichTextEditorH2,
    RichTextEditorH3,
    RichTextEditorH4,
    RichTextEditorH5,
    RichTextEditorH6,
    RichTextEditorHighlight,
    RichTextEditorHorizontalRule,
    RichTextEditorImage,
    RichTextEditorItalic,
    RichTextEditorLink,
    RichTextEditorOrderedList,
    RichTextEditorParagraph,
    RichTextEditorRedo,
    RichTextEditorStrike,
    RichTextEditorSubscript,
    RichTextEditorSuperscript,
    RichTextEditorUnderline,
    RichTextEditorUndo,
    RichTextEditorUnlink,
    RichTextEditorYoutube,
} from "./RichTextEditorControls";

export type MarkdownControl =
    | "Bold"
    | "Italic"
    | "Code"
    | "ClearFormatting"
    | "H1"
    | "H2"
    | "H3"
    | "H4"
    | "H5"
    | "H6"
    | "Paragraph"
    | "BulletList"
    | "OrderedList"
    | "CodeBlock"
    | "Blockquote"
    | "HorizontalRule"
    | "Link"
    | "Unlink"
    | "Undo"
    | "Redo"
    | "Image";

export type Control =
    | MarkdownControl
    | "Color"
    | "Underline"
    | "Strike"
    | "Subscript"
    | "Superscript"
    | "Highlight"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "AlignJustify"
    | "Youtube";

export const markdownControls: Record<MarkdownControl, () => ReactNode> = {
    Blockquote: RichTextEditorBlockquote,
    Bold: RichTextEditorBold,
    BulletList: RichTextEditorBulletList,
    ClearFormatting: RichTextEditorClearFormatting,
    Code: RichTextEditorCode,
    CodeBlock: RichTextEditorCodeBlock,
    H1: RichTextEditorH1,
    H2: RichTextEditorH2,
    H3: RichTextEditorH3,
    H4: RichTextEditorH4,
    H5: RichTextEditorH5,
    H6: RichTextEditorH6,
    HorizontalRule: RichTextEditorHorizontalRule,
    Image: RichTextEditorImage,
    Italic: RichTextEditorItalic,
    Link: RichTextEditorLink,
    OrderedList: RichTextEditorOrderedList,
    Paragraph: RichTextEditorParagraph,
    Redo: RichTextEditorRedo,
    Undo: RichTextEditorUndo,
    Unlink: RichTextEditorUnlink,
};

export const richTextEditorControls: Record<Control, () => ReactNode> = {
    ...markdownControls,
    AlignCenter: RichTextEditorAlignCenter,
    AlignJustify: RichTextEditorAlignJustify,
    AlignLeft: RichTextEditorAlignLeft,
    AlignRight: RichTextEditorAlignRight,
    Color: RichTextEditorColor,
    Highlight: RichTextEditorHighlight,
    Strike: RichTextEditorStrike,
    Subscript: RichTextEditorSubscript,
    Superscript: RichTextEditorSuperscript,
    Underline: RichTextEditorUnderline,
    Youtube: RichTextEditorYoutube,
};
