import { fr } from "@codegouvfr/react-dsfr";
import { EditorContent } from "@tiptap/react";
import { tss } from "tss-react";

import { useRichTextEditor } from "./RichTextEditorContext";

function RichTextEditorContent() {
    const editor = useRichTextEditor();
    const { classes } = useStyles();

    return <EditorContent className={classes.root} editor={editor} />;
}

const useStyles = tss.withName(RichTextEditorContent.name).create(() => ({
    root: {
        padding: fr.spacing("2w"),
        "img.ProseMirror-selectednode, .ProseMirror-selectednode iframe": {
            outline: '1px solid #0a76f6'
        },
        "hr.ProseMirror-selectednode": {
          backgroundImage: 'linear-gradient(0deg, #0a76f6, #0a76f6)'
        },
        "span > mark": {
          color: 'inherit'
        }
    },
}));

export default RichTextEditorContent;
