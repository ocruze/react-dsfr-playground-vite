import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";

import { useRichTextEditor } from "./RichTextEditorContext";
import { Editor, useEditorState } from "@tiptap/react";
import { ElementType, MutableRefObject, ReactNode, useRef } from "react";
import Dialog, { IDialogHandle } from "./dialogs/Dialog";

interface IEditorState {
    disabled: boolean;
    isActive: boolean;
}

interface ICreateCustomControlProps {
    Control: (editor: Editor, editorState: IEditorState, ref: MutableRefObject<IDialogHandle | null>) => ReactNode;
    DialogContent?: ElementType;
    isActive?: { name: string; attributes?: Record<string, unknown> | string };
    isDisabled?: (editor: Editor) => boolean;
}

export function createCustomControl(configuration: ICreateCustomControlProps) {
    const { Control, DialogContent, isActive, isDisabled } = configuration;
    return function RichTextEditorBold(): ReactNode {
        const editor = useRichTextEditor();
        const ref = useRef<IDialogHandle>(null);
        const editorState = useEditorState({
            editor,
            selector: ({ editor }: { editor: Editor }) => ({
                disabled: isDisabled ? isDisabled(editor) : false,
                isActive: isActive ? editor.isActive(isActive.name, isActive.attributes) : false,
            }),
        });

        return (
            <li>
                {Control(editor, editorState, ref)}
                {DialogContent && (
                    <Dialog ref={ref}>
                        <DialogContent />
                    </Dialog>
                )}
            </li>
        );
    };
}

interface ICreateDialogControlProps extends Omit<ICreateCustomControlProps, "Control"> {
    buttonProps: ButtonProps;
    onClick: (editor: Editor, ref: MutableRefObject<IDialogHandle | null>) => void;
}

export function createDialogControl(configuration: ICreateDialogControlProps) {
    const { buttonProps, onClick, ...rest } = configuration;
    return createCustomControl({
        Control: (editor, editorState, ref) => {
            const props = {
                disabled: editorState.disabled,
                onClick: () => onClick(editor, ref),
                priority: editorState.isActive ? "primary" : "tertiary no outline",
                size: "small",
                type: "button",
                ...buttonProps,
            } as ButtonProps;
            return <Button {...props} />;
        },
        ...rest,
    });
}

interface ICreateControlProps extends Omit<ICreateDialogControlProps, "Dialog" | "onClick"> {
    operation: { name: string; attributes?: Record<string, unknown> | string };
}

export function createControl(configuration: ICreateControlProps) {
    const { isDisabled, operation, ...rest } = configuration;
    return createDialogControl({
        ...rest,
        isDisabled: isDisabled ?? ((editor) => !editor?.can().chain().focus()[operation.name](operation.attributes).run()),
        onClick: (editor) => editor?.chain().focus()[operation.name](operation.attributes).run(),
    });
}
