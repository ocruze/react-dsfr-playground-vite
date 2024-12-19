import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRichTextEditor } from "../RichTextEditorContext";

import { useDialog } from "./Dialog";

interface ITableForm {
    rows: number;
    cols: number;
    withHeaderRow: boolean;
}

function TableDialog() {
    const { isOpened, modal, onClose } = useDialog();
    const editor = useRichTextEditor();

    const schema = yup.object({
        rows: yup.number().required(),
        cols: yup.number().required(),
        withHeaderRow: yup.boolean().required(),
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
    } = useForm<ITableForm>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isOpened) {
            setValue("rows", 2);
            setValue("cols", 2);
            setValue("withHeaderRow", false);
        }
    }, [editor, isOpened, setValue]);

    const onSubmit = handleSubmit(() => {
        const { rows, cols, withHeaderRow } = getValues();

        // editor.chain().focus().insertTable({ rows, cols, withHeaderRow }).run();
        editor.chain().focus().insertContent('<dsfr-table></dsfr-table>').run();

        onClose();
    });

    return (
        <modal.Component
            title="Définir la table"
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
                <Input
                    label="Colonnes"
                    state={errors.cols ? "error" : "default"}
                    stateRelatedMessage={errors?.cols?.message?.toString()}
                    nativeInputProps={{
                        ...register("cols"),
                        type: "number",
                    }}
                />
                <Input
                    label="Lignes"
                    state={errors.rows ? "error" : "default"}
                    stateRelatedMessage={errors?.rows?.message?.toString()}
                    nativeInputProps={{
                        ...register("rows"),
                        type: "number",
                    }}
                />
                <Checkbox
                    state={errors.withHeaderRow ? "error" : "default"}
                    stateRelatedMessage={errors?.withHeaderRow?.message?.toString()}
                    options={[
                        {
                            label: "Avec entête",
                            nativeInputProps: {
                                ...register("withHeaderRow"),
                            },
                        },
                    ]}
                />
                <input type="submit" hidden />
            </form>
        </modal.Component>
    );
}

export default TableDialog;
