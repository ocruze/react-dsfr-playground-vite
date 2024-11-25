import { Input } from "@codegouvfr/react-dsfr/Input";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editor } from "@tiptap/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";
import isMailto from "validator/lib/isMailtoURI";

import * as yup from "yup";

const AddLinkDialogModal = createModal({
    id: "add-link",
    isOpenedByDefault: false,
});

type LinkFormType = {
    label: string;
    href: string;
};

type AddLinkDialogProps = {
    editor: Editor | null;
};

const AddLinkDialog: FC<AddLinkDialogProps> = ({ editor }) => {
    const schema = yup.object({
        label: yup.string().min(4, "Le label doit faire au moins 4 caractères").required(),
        href: yup
            .string()
            .test("check-url", "La chaîne doit être un mailto ou une url valide", (value) => {
                return isURL(value) || isMailto(value);
            })
            .required(),
    });

    const form = useForm<LinkFormType>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        getValues: getFormValues,
        formState: { errors },
    } = form;

    const onSubmit = () => {
        const values = getFormValues();

        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .insertContent(`<a href="${values.href}">${values.label}</a>`)
            .setLink({ href: values.href, target: "_blank" })
            .run();

        AddLinkDialogModal.close();
    };

    return (
        <AddLinkDialogModal.Component
            title="Définir le lien"
            size="medium"
            buttons={[
                {
                    doClosesModal: true,
                    children: "Annuler",
                },
                {
                    doClosesModal: false,
                    children: "Ajouter",
                    onClick: handleSubmit(onSubmit),
                },
            ]}
        >
            <Input
                label={"label"}
                state={errors.label ? "error" : "default"}
                stateRelatedMessage={errors?.label?.message?.toString()}
                nativeInputProps={{
                    ...register("label"),
                }}
            />
            <Input
                label={"url"}
                state={errors.href ? "error" : "default"}
                stateRelatedMessage={errors?.href?.message?.toString()}
                nativeInputProps={{
                    ...register("href"),
                    placeholder: "http://www.example.com, mailto:name@email.com",
                }}
            />
        </AddLinkDialogModal.Component>
    );
};

export { AddLinkDialog, AddLinkDialogModal };
