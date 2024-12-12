import { Fragment } from "react/jsx-runtime";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import RichTextEditorContent from "./RichTextEditorContent";
import RichTextEditorMenu from "./RichTextEditorMenu";
import {
    RichTextEditorAlignCenter,
    RichTextEditorAlignJustify,
    RichTextEditorAlignLeft,
    RichTextEditorAlignRight,
    RichTextEditorBlockquote,
    RichTextEditorBold,
    RichTextEditorBulletList,
    RichTextEditorClearFormatting,
    RichTextEditorCode,
    RichTextEditorCodeBlock,
    RichTextEditorColor,
    RichTextEditorH1,
    RichTextEditorH2,
    RichTextEditorH3,
    RichTextEditorH4,
    RichTextEditorH5,
    RichTextEditorH6,
    RichTextEditorHighlight,
    RichTextEditorHorizontalRule,
    RichTextEditorImage,
    RichTextEditorItalic,
    RichTextEditorLink,
    RichTextEditorOrderedList,
    RichTextEditorParagraph,
    RichTextEditorRedo,
    RichTextEditorStrike,
    RichTextEditorSubscript,
    RichTextEditorSuperscript,
    RichTextEditorUnderline,
    RichTextEditorUndo,
    RichTextEditorUnlink,
    RichTextEditorYoutube,
} from "./RichTextEditorControls";
import RichTextEditorProvider, { IRichTextEditorProviderProps } from "./RichTextEditorProvider";
import RichTextEditorDivider from "./RichTextEditorDivider";

export type Feature =
    | "Bold"
    | "Color"
    | "Italic"
    | "Underline"
    | "Strike"
    | "Subscript"
    | "Superscript"
    | "Code"
    | "Highlight"
    | "ClearFormatting"
    | "H1"
    | "H2"
    | "H3"
    | "H4"
    | "H5"
    | "H6"
    | "Paragraph"
    | "BulletList"
    | "OrderedList"
    | "CodeBlock"
    | "Blockquote"
    | "HorizontalRule"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "AlignJustify"
    | "Link"
    | "Unlink"
    | "Undo"
    | "Redo"
    | "Image"
    | "Youtube";

export type Extension = "color" | "highlight" | "image" | "link" | "starterKit" | "subscript" | "superscript" | "textAlign" | "underline" | "youtube";

export interface IRichTextEditorProps extends Omit<IRichTextEditorProviderProps, "children"> {
    features?: Feature[][];
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

const extensionMapping: Record<Feature, Extension> = {
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

const defaultFeatures: Feature[][] = [
    ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
    ["Link", "Unlink"],
    ["Undo", "Redo"],
    ["Image", "Youtube"],
];

function RichTextEditor(props: IRichTextEditorProps) {
    const { features = defaultFeatures } = props;
    const [extensions, setExtensions] = useState<Partial<Record<Extension, AnyExtension>>>(() =>
        Object.fromEntries(props.extensions?.map((extension) => [extension.name, extension]) ?? [["starterKit", StarterKit]])
    );
    const extensionsToLoad = useMemo(() => {
        const neededExtensions = [
            ...new Set(
                features
                    .flat()
                    .map((feature) => extensionMapping[feature])
                    .filter((name) => extensionLoader[name])
            ),
        ];
        const loadedExtensions = Object.keys(extensions);
        return neededExtensions.filter((name) => !loadedExtensions.includes(name));
    }, [extensions, features]);

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
    }, [extensionsToLoad, features]);

    if (extensionsToLoad.length > 0) {
        return null;
    }

    return (
        <RichTextEditor.Provider {...props} extensions={Object.values(extensions)}>
            <RichTextEditor.Menu>
                {features
                    .map((list) => list.filter((item) => RichTextEditor[item]))
                    .filter((list) => list.length > 0)
                    .map((list, i) => (
                        <Fragment key={i}>
                            {list.map((item, j) => {
                                const Component = RichTextEditor[item] as () => ReactNode;
                                return <Component key={j} />;
                            })}
                            <RichTextEditor.Divider />
                        </Fragment>
                    ))}
            </RichTextEditor.Menu>
            <RichTextEditor.Content />
        </RichTextEditor.Provider>
    );
}

RichTextEditor.Content = RichTextEditorContent;
RichTextEditor.Menu = RichTextEditorMenu;
/* controls */
RichTextEditor.AlignCenter = RichTextEditorAlignCenter;
RichTextEditor.AlignJustify = RichTextEditorAlignJustify;
RichTextEditor.AlignLeft = RichTextEditorAlignLeft;
RichTextEditor.AlignRight = RichTextEditorAlignRight;
RichTextEditor.Blockquote = RichTextEditorBlockquote;
RichTextEditor.Bold = RichTextEditorBold;
RichTextEditor.BulletList = RichTextEditorBulletList;
RichTextEditor.ClearFormatting = RichTextEditorClearFormatting;
RichTextEditor.Code = RichTextEditorCode;
RichTextEditor.CodeBlock = RichTextEditorCodeBlock;
RichTextEditor.Color = RichTextEditorColor;
RichTextEditor.Divider = RichTextEditorDivider;
RichTextEditor.H1 = RichTextEditorH1;
RichTextEditor.H2 = RichTextEditorH2;
RichTextEditor.H3 = RichTextEditorH3;
RichTextEditor.H4 = RichTextEditorH4;
RichTextEditor.H5 = RichTextEditorH5;
RichTextEditor.H6 = RichTextEditorH6;
RichTextEditor.Highlight = RichTextEditorHighlight;
RichTextEditor.HorizontalRule = RichTextEditorHorizontalRule;
RichTextEditor.Image = RichTextEditorImage;
RichTextEditor.Italic = RichTextEditorItalic;
RichTextEditor.Link = RichTextEditorLink;
RichTextEditor.OrderedList = RichTextEditorOrderedList;
RichTextEditor.Paragraph = RichTextEditorParagraph;
RichTextEditor.Provider = RichTextEditorProvider;
RichTextEditor.Redo = RichTextEditorRedo;
RichTextEditor.Strike = RichTextEditorStrike;
RichTextEditor.Subscript = RichTextEditorSubscript;
RichTextEditor.Superscript = RichTextEditorSuperscript;
RichTextEditor.Underline = RichTextEditorUnderline;
RichTextEditor.Undo = RichTextEditorUndo;
RichTextEditor.Unlink = RichTextEditorUnlink;
RichTextEditor.Youtube = RichTextEditorYoutube;

export default RichTextEditor;
