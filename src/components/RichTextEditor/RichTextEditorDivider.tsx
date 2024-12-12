import { tss } from "tss-react";

function RichTextEditorDivider() {
  const { classes } = useStyles();
    return <li className={classes.root} aria-hidden="true"></li>;
}

const useStyles = tss.withName(RichTextEditorDivider.name).create(() => ({
  root: {
      borderLeft: '1px solid var(--border-contrast-grey)'
  },
}));


export default RichTextEditorDivider;
