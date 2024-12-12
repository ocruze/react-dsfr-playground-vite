import { fr } from "@codegouvfr/react-dsfr";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ReactNode } from "react";
import { tss } from "tss-react";

import { richTextEditorContext } from "./RichTextEditorContext";

export interface IRichTextEditorProviderProps extends UseEditorOptions {
    children?: ReactNode;
    onContentUpdate?: (content: string) => void;
}

function RichTextEditorProvider(props: IRichTextEditorProviderProps) {
    const { children, onContentUpdate, onUpdate, ...rest } = props;
    const editor = useEditor({
        onUpdate: (props) => {
            onUpdate?.(props);
            onContentUpdate?.(props.editor.getHTML());
        },
        ...rest,
    });
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
