import { fr } from "@codegouvfr/react-dsfr";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ReactNode } from "react";
import { tss } from "tss-react";

import { richTextEditorContext } from "./RichTextEditorContext";

export interface IRichTextEditorProviderProps extends UseEditorOptions {
    children?: ReactNode;
}

function RichTextEditorProvider(props: IRichTextEditorProviderProps) {
    const { children, ...rest } = props;
    const editor = useEditor(rest);
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <richTextEditorContext.Provider value={editor}>{children}</richTextEditorContext.Provider>
        </div>
    );
}

const useStyles = tss.withName(RichTextEditorProvider.name).create(() => ({
    root: {
        border: "1px solid var(--border-contrast-grey)",
        margin: `${fr.spacing("2w")} 0`,
    },
}));

export default RichTextEditorProvider;
