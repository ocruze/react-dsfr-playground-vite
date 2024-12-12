import ImageDialog from "./dialogs/ImageDialog";
import LinkDialog from "./dialogs/LinkDialog";
import YoutubeDialog from "./dialogs/YoutubeDialog";

import { createControl, createButtonControl, createCustomControl } from "./createControls";
import ColorInput from "./ColorInput";

export const RichTextEditorBold = createControl({
    iconId: "ri-bold",
    isActive: { name: "bold" },
    label: "Gras",
    operation: { name: "toggleBold" },
});

export const RichTextEditorItalic = createControl({
    iconId: "ri-italic",
    isActive: { name: "italic" },
    label: "Italique",
    operation: { name: "toggleItalic" },
});

export const RichTextEditorUnderline = createControl({
    iconId: "ri-underline",
    isActive: { name: "underline" },
    label: "Souligné",
    operation: { name: "toggleUnderline" },
});

export const RichTextEditorStrike = createControl({
    iconId: "ri-strikethrough",
    isActive: { name: "strike" },
    label: "Barré",
    operation: { name: "toggleStrike" },
});

export const RichTextEditorCode = createControl({
    iconId: "ri-code-s-slash-line",
    isActive: { name: "code" },
    label: "Code",
    operation: { name: "toggleCode" },
});

export const RichTextEditorParagraph = createControl({
    iconId: "ri-paragraph",
    isActive: { name: "paragraph" },
    label: "Paragraphe",
    operation: { name: "setParagraph" },
});

export const RichTextEditorBulletList = createControl({
    iconId: "ri-list-unordered",
    isActive: { name: "bulletList" },
    label: "Liste à puces",
    operation: { name: "toggleBulletList" },
});

export const RichTextEditorOrderedList = createControl({
    iconId: "ri-list-ordered",
    isActive: { name: "orderedList" },
    label: "Liste ordonnée",
    operation: { name: "toggleOrderedList" },
});

export const RichTextEditorCodeBlock = createControl({
    iconId: "ri-code-block",
    isActive: { name: "codeBlock" },
    label: "Bloc de code",
    operation: { name: "toggleCodeBlock" },
});

export const RichTextEditorBlockquote = createControl({
    iconId: "ri-double-quotes-l",
    isActive: { name: "blockquote" },
    label: "Citation",
    operation: { name: "toggleBlockquote" },
});

export const RichTextEditorUndo = createControl({
    iconId: "ri-arrow-go-back-line",
    isDisabled: (editor) => !editor?.can().undo(),
    label: "Défaire",
    operation: { name: "undo" },
});

export const RichTextEditorRedo = createControl({
    iconId: "ri-arrow-go-forward-line",
    isDisabled: (editor) => !editor?.can().redo(),
    label: "Refaire",
    operation: { name: "redo" },
});

export const RichTextEditorH1 = createControl({
    iconId: "fr-icon-h-1", // ri-h-1
    isActive: { name: "heading", attributes: { level: 1 } },
    label: "Titre 1",
    operation: { name: "toggleHeading", attributes: { level: 1 } },
});

export const RichTextEditorH2 = createControl({
    iconId: "fr-icon-h-2",
    isActive: { name: "heading", attributes: { level: 2 } },
    label: "Titre 2",
    operation: { name: "toggleHeading", attributes: { level: 2 } },
});

export const RichTextEditorH3 = createControl({
    iconId: "fr-icon-h-3",
    isActive: { name: "heading", attributes: { level: 3 } },
    label: "Titre 3",
    operation: { name: "toggleHeading", attributes: { level: 3 } },
});

export const RichTextEditorH4 = createControl({
    iconId: "fr-icon-h-4",
    isActive: { name: "heading", attributes: { level: 4 } },
    label: "Titre 4",
    operation: { name: "toggleHeading", attributes: { level: 4 } },
});

export const RichTextEditorH5 = createControl({
    iconId: "fr-icon-h-5",
    isActive: { name: "heading", attributes: { level: 5 } },
    label: "Titre 5",
    operation: { name: "toggleHeading", attributes: { level: 5 } },
});

export const RichTextEditorH6 = createControl({
    iconId: "fr-icon-h-6",
    isActive: { name: "heading", attributes: { level: 6 } },
    label: "Titre 6",
    operation: { name: "toggleHeading", attributes: { level: 6 } },
});

export const RichTextEditorHorizontalRule = createControl({
    iconId: "ri-separator",
    label: "Ligne horizontale",
    operation: { name: "setHorizontalRule" },
});

export const RichTextEditorClearFormatting = createControl({
    iconId: "ri-format-clear",
    label: "Supprimer le formatage",
    operation: { name: "unsetAllMarks" },
});

export const RichTextEditorHighlight = createControl({
    iconId: "fr-icon-mark-pen-line",
    isActive: { name: "highlight" },
    label: "Surligner",
    operation: { name: "toggleHighlight" },
});
export const RichTextEditorSubscript = createControl({
    iconId: "ri-subscript",
    isActive: { name: "subscript" },
    label: "Indice",
    operation: { name: "toggleSubscript" },
});

export const RichTextEditorSuperscript = createControl({
    iconId: "ri-superscript",
    isActive: { name: "superscript" },
    label: "Exposant",
    operation: { name: "toggleSuperscript" },
});

export const RichTextEditorAlignLeft = createControl({
    iconId: "ri-align-left",
    label: "Aligner à gauche",
    operation: { name: "setTextAlign", attributes: "left" },
});

export const RichTextEditorAlignCenter = createControl({
    iconId: "ri-align-center",
    label: "Centrer",
    operation: { name: "setTextAlign", attributes: "center" },
});

export const RichTextEditorAlignRight = createControl({
    iconId: "ri-align-right",
    label: "Aligner à droite",
    operation: { name: "setTextAlign", attributes: "right" },
});

export const RichTextEditorAlignJustify = createControl({
    iconId: "ri-align-justify",
    label: "Justifier",
    operation: { name: "setTextAlign", attributes: "justify" },
});

export const RichTextEditorUnlink = createControl({
    iconId: "ri-link-unlink",
    label: "Supprimer le lien",
    operation: { name: "unsetLink" },
});

export const RichTextEditorLink = createButtonControl({
    DialogContent: LinkDialog,
    iconId: "ri-link",
    label: "Ajouter un lien",
    onClick: (editor, ref) => ref.current?.open(),
});

export const RichTextEditorImage = createButtonControl({
    DialogContent: ImageDialog,
    iconId: "ri-image-line",
    label: "Insérer une image",
    onClick: (editor, ref) => ref.current?.open(),
});

export const RichTextEditorYoutube = createButtonControl({
    DialogContent: YoutubeDialog,
    iconId: "ri-video-line",
    label: "Insérer une vidéo",
    onClick: (editor, ref) => ref.current?.open(),
});

export const RichTextEditorColor = createCustomControl({
    Control: (editor) => <ColorInput editor={editor} />,
});
