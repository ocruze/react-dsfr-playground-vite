import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";
import { tss } from "tss-react";

interface IRichTextEditorMenuProps {
    children: ReactNode;
}

function RichTextEditorMenu(props: IRichTextEditorMenuProps) {
    const { children } = props;
    const { classes } = useStyles();

    return <ul className={classes.root}>{children}</ul>;
}

const useStyles = tss.withName(RichTextEditorMenu.name).create(() => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        listStyleType: "none",
        margin: 0,
        padding: 0,
        borderTop: "1px solid var(--border-contrast-grey)",
        borderBottom: "1px solid var(--border-contrast-grey)",
        backgroundImage: "linear-gradient(0deg, var(--border-contrast-grey), var(--border-contrast-grey) 3.125%, transparent 3.125%, transparent)",
        backgroundSize: `100% calc(${fr.spacing("4w")} + 1px)`,
        gap: "1px 0",
        '&:first-child': {
          borderTop: 0
        },
        '&:last-child': {
          borderBottom: 0
        },
        '> li': {
          padding: 0,
        }
    },
}));

export default RichTextEditorMenu;
