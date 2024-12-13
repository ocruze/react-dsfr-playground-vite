import { Fragment } from "react/jsx-runtime";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import RichTextEditorContent from "./RichTextEditorContent";
import RichTextEditorMenu from "./RichTextEditorMenu";
import RichTextEditorProvider, { IRichTextEditorProviderProps } from "./RichTextEditorProvider";
import RichTextEditorDivider from "./RichTextEditorDivider";
import { Control, richTextEditorControls } from "./controls";

export type Extension =
    | "color"
    | "highlight"
    | "image"
    | "link"
    | "markdown"
    | "starterKit"
    | "subscript"
    | "superscript"
    | "textAlign"
    | "underline"
    | "youtube";

export interface IRichTextEditorProps extends Omit<IRichTextEditorProviderProps, "children"> {
    controls: Control[][];
}

const extensionLoader: Partial<Record<Extension, () => Promise<AnyExtension | AnyExtension[]>>> = {
    color: () =>
        Promise.all([
            import("@tiptap/extension-color").then((module) => module.default),
            import("@tiptap/extension-text-style").then((module) => module.default),
        ]),
    highlight: () => import("@tiptap/extension-highlight").then((module) => module.default),
    image: () => import("@tiptap/extension-image").then((module) => module.default),
    link: () => import("@tiptap/extension-link").then((module) => module.default),
    subscript: () => import("@tiptap/extension-subscript").then((module) => module.default),
    superscript: () => import("@tiptap/extension-superscript").then((module) => module.default),
    textAlign: () => import("@tiptap/extension-text-align").then((module) => module.default),
    underline: () => import("@tiptap/extension-underline").then((module) => module.default),
    youtube: () => import("@tiptap/extension-youtube").then((module) => module.default),
};

const extensionMapping: Record<Control, Extension> = {
    Bold: "starterKit",
    Color: "color",
    Italic: "starterKit",
    Underline: "underline",
    Strike: "starterKit",
    Subscript: "subscript",
    Superscript: "superscript",
    Code: "starterKit",
    Highlight: "highlight",
    ClearFormatting: "starterKit",
    H1: "starterKit",
    H2: "starterKit",
    H3: "starterKit",
    H4: "starterKit",
    H5: "starterKit",
    H6: "starterKit",
    Paragraph: "starterKit",
    BulletList: "starterKit",
    OrderedList: "starterKit",
    CodeBlock: "starterKit",
    Blockquote: "starterKit",
    HorizontalRule: "starterKit",
    AlignLeft: "textAlign",
    AlignCenter: "textAlign",
    AlignRight: "textAlign",
    AlignJustify: "textAlign",
    Link: "link",
    Unlink: "link",
    Undo: "starterKit",
    Redo: "starterKit",
    Image: "image",
    Youtube: "youtube",
};

const extensionDefaultConfiguration = {
    image: {
        inline: true,
    },
    link: { openOnClick: false },
    textAlign: {
        types: ["heading", "paragraph"],
    },
    youtube: {
        controls: false,
        nocookie: true,
    },
};

function RichTextEditorLoader(props: IRichTextEditorProps) {
    const { controls } = props;
    const [extensions, setExtensions] = useState<Partial<Record<Extension, AnyExtension>>>(() =>
        Object.fromEntries(props.extensions?.map((extension) => [extension.name, extension]) ?? [["starterKit", StarterKit]])
    );
    const extensionsToLoad = useMemo(() => {
        const neededExtensions = [
            ...new Set(
                controls
                    .flat()
                    .map((feature) => extensionMapping[feature])
                    .filter((name) => extensionLoader[name])
            ),
        ];
        const loadedExtensions = Object.keys(extensions);
        return neededExtensions.filter((name) => !loadedExtensions.includes(name));
    }, [controls, extensions]);

    useEffect(() => {
        if (extensionsToLoad.length > 0) {
            Promise.all(extensionsToLoad.map((name) => extensionLoader[name]!())).then((loadedExtensions) => {
                if (loadedExtensions.length > 0) {
                    setExtensions((extensions) => ({
                        ...extensions,
                        ...Object.fromEntries(
                            loadedExtensions
                                .flat()
                                .map((extension) => [
                                    extension.name,
                                    extension.name in extensionDefaultConfiguration
                                        ? extension.configure(extensionDefaultConfiguration[extension.name])
                                        : extension,
                                ])
                        ),
                    }));
                }
            });
        }
    }, [controls, extensionsToLoad]);

    if (extensionsToLoad.length > 0) {
        return null;
    }

    return (
        <RichTextEditorProvider {...props} extensions={Object.values(extensions)}>
            <RichTextEditorMenu first>
                {controls
                    .map((list) => list.filter((item) => richTextEditorControls[item]))
                    .filter((list) => list.length > 0)
                    .map((list, i) => (
                        <Fragment key={i}>
                            {list.map((item, j) => {
                                const Component = richTextEditorControls[item] as () => ReactNode;
                                return <Component key={j} />;
                            })}
                            <RichTextEditorDivider />
                        </Fragment>
                    ))}
            </RichTextEditorMenu>
            <RichTextEditorContent />
        </RichTextEditorProvider>
    );
}

export default RichTextEditorLoader;
