import Button from "@codegouvfr/react-dsfr/Button";
import { FrIconClassName, RiIconClassName } from "@codegouvfr/react-dsfr";

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
        if (!editor) {
            throw new Error("Missing editor context");
        }

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

interface ICreateButtonControlProps extends Omit<ICreateCustomControlProps, "Control"> {
    iconId: FrIconClassName | RiIconClassName;
    label: string;
    onClick: (editor: Editor, ref: MutableRefObject<IDialogHandle | null>) => void;
}

export function createButtonControl(configuration: ICreateButtonControlProps) {
    const { iconId, label, onClick, ...rest } = configuration;
    return createCustomControl({
        Control: (editor, editorState, ref) => (
            <Button
                disabled={editorState.disabled}
                iconId={iconId}
                onClick={() => onClick(editor, ref)}
                priority={editorState.isActive ? "primary" : "tertiary no outline"}
                size="small"
                title={label}
            />
        ),
        ...rest,
    });
}

interface ICreateControlProps extends Omit<ICreateButtonControlProps, "Dialog" | "onClick"> {
    operation: { name: string; attributes?: Record<string, unknown> | string };
}

export function createControl(configuration: ICreateControlProps) {
    const { isDisabled, operation, ...rest } = configuration;
    return createButtonControl({
        ...rest,
        isDisabled: isDisabled ?? ((editor) => !editor?.can().chain().focus()[operation.name](operation.attributes).run()),
        onClick: (editor) => editor?.chain().focus()[operation.name](operation.attributes).run(),
    });
}
