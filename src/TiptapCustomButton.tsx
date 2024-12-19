import Button from "@codegouvfr/react-dsfr/Button";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Editor, useEditorState } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRichTextEditor } from "./components/RichTextEditor/RichTextEditorContext";
import { createDialogControl, createControl } from "./components/RichTextEditor/createControls";
import { useDialog } from "./components/RichTextEditor/dialogs/Dialog";
import { useEffect } from "react";

// 1. Create the component yourself: use the hook `useRichTextEditor` to access the editor object
export function CustomControl1() {
    const editor = useRichTextEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }: { editor: Editor }) => ({
            disabled: !editor?.can().chain().focus().insertContent("[custom]").run(),
        }),
    });

    return (
        <Button
            disabled={editorState.disabled}
            onClick={() => editor?.chain().focus().insertContent("[custom]").run()}
            priority="tertiary no outline"
            size="small"
        >
            Insérer du contenu
        </Button>
    );
}

// 2. Or use the `createControl` helper
export const CustomControl2 = createControl({
    buttonProps: { children: "Insérer du contenu" },
    operation: { name: "insertContent", attributes: "[custom]" },
});

// 3. Use the `createDialogControl` helper to create a control that uses a dialog: use the hook `useDialog` to access the dialog data
function CustomDialog() {
    const editor = useRichTextEditor();
    const { isOpened, modal, onClose } = useDialog();

    const schema = yup.object({
        text: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm<{ text: string }>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isOpened) {
            reset();
        }
    }, [isOpened, reset]);

    const onSubmit = handleSubmit(() => {
        const { text } = getValues();
        editor?.chain().focus().insertContent(text).run();
        onClose();
    });

    return (
        <modal.Component
            title="Contenu à insérer"
            size="medium"
            buttons={[
                {
                    doClosesModal: true,
                    children: "Annuler",
                },
                {
                    doClosesModal: false,
                    children: "Ajouter",
                    onClick: onSubmit,
                },
            ]}
        >
            <form onSubmit={onSubmit}>
                <Select
                    label="Texte"
                    state={errors.text ? "error" : "default"}
                    stateRelatedMessage={errors?.text?.message?.toString()}
                    nativeSelectProps={{
                        ...register("text"),
                    }}
                >
                    <option value=""></option>
                    <option value="[custom1]">[custom1]</option>
                    <option value="[custom2]">[custom2]</option>
                    <option value="[custom3]">[custom3]</option>
                </Select>
                <input type="submit" hidden />
            </form>
        </modal.Component>
    );
}

export const CustomControl3 = createDialogControl({
    buttonProps: { children: "Insérer du contenu" },
    DialogContent: CustomDialog,
    onClick: (editor, ref) => ref.current?.open(),
});
