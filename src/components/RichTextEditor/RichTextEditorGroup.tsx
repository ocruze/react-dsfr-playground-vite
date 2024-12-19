import { ReactNode } from "react";
import { tss } from "tss-react";

interface IRichTextEditorGroupProps {
  children: ReactNode
}

function RichTextEditorGroup(props: IRichTextEditorGroupProps) {
  const { children } = props;
  const { classes } = useStyles();

  return (<li className={classes.root}>{children}</li>)
}

const useStyles = tss.withName(RichTextEditorGroup.name).create(() => ({
    root: {
        borderRight: "1px solid var(--border-contrast-grey)",
    },
}));

export default RichTextEditorGroup;
