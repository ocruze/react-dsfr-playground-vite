import { createContext, forwardRef, ReactNode, useCallback, useContext, useId, useImperativeHandle, useMemo, useRef } from "react";
import { createModal, ModalProps } from "@codegouvfr/react-dsfr/Modal";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

export interface IDialogHandle {
    close: () => void;
    open: () => void;
}

interface IDialogProps {
    children: ReactNode;
}

interface Modal {
    buttonProps: {
        /** Only for analytics, feel free to overwrite */
        id: string;
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    Component: (props: ModalProps) => JSX.Element;
    close: () => void;
    open: () => void;
    isOpenedByDefault: boolean;
    id: string;
}

interface IDialogContext {
    isOpened: boolean;
    modal?: Modal;
    onClose: () => void;
}

const dialogContext = createContext<IDialogContext>({ isOpened: false, onClose: () => null });

export function useDialog(): Required<IDialogContext> {
    const { isOpened, onClose, modal } = useContext(dialogContext);
    if (!modal) {
        throw new Error("Missing modal context");
    }
    const context = useMemo(
        () => ({
            isOpened,
            modal,
            onClose,
        }),
        [isOpened, onClose, modal]
    );
    return context;
}

const Dialog = forwardRef<IDialogHandle, IDialogProps>((props, ref) => {
    const { children } = props;

    const id = useId();
    const { current: modal } = useRef(
        createModal({
            id,
            isOpenedByDefault: false,
        })
    );

    const open = useCallback(() => {
        modal.open();
    }, [modal]);

    const close = useCallback(() => {
        modal.close();
    }, [modal]);

    useImperativeHandle(ref, () => ({ close, open }));

    const isOpened = useIsModalOpen(modal);

    return (
        <dialogContext.Provider
            value={{
                isOpened,
                modal,
                onClose: close,
            }}
        >
            {children}
        </dialogContext.Provider>
    );
});

export default Dialog;
