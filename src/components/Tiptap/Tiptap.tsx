import { fr } from "@codegouvfr/react-dsfr";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from "react";

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    const addImage = useCallback(() => {
        const url = window.prompt("URL");
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        const url = window.prompt("URL");
        if (url) {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
        }
    }, [editor]);

    return (
        <div>
            <div className={fr.cx("fr-grid-row")}>
                <ButtonsGroup
                    buttons={[
                        {
                            onClick: () => editor?.chain().focus().toggleBold().run(),
                            disabled: !editor?.can().chain().focus().toggleBold().run(),
                            priority: editor?.isActive("bold") ? "secondary" : "tertiary no outline",
                            iconId: "ri-bold",
                            title: "Gras",
                        },
                        {
                            onClick: () => editor?.chain().focus().toggleItalic().run(),
                            disabled: !editor?.can().chain().focus().toggleItalic().run(),
                            priority: editor?.isActive("italic") ? "secondary" : "tertiary no outline",
                            iconId: "ri-italic",
                            title: "Italique",
                        },
                        {
                            onClick: () => editor?.chain().focus().toggleStrike().run(),
                            disabled: !editor?.can().chain().focus().toggleStrike().run(),
                            priority: editor?.isActive("strike") ? "secondary" : "tertiary no outline",
                            iconId: "ri-strikethrough",
                            title: "Barré",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />

                <ButtonsGroup
                    buttons={[
                        {
                            onClick: () => editor?.chain().focus().toggleCode().run(),
                            disabled: !editor?.can().chain().focus().toggleCode().run(),
                            priority: editor?.isActive("code") ? "secondary" : "tertiary no outline",
                            iconId: "ri-code-s-slash-line",
                            title: "Code",
                        },
                        {
                            onClick: () => editor?.chain().focus().setParagraph().run(),
                            priority: editor?.isActive("paragraph") ? "secondary" : "tertiary no outline",
                            iconId: "ri-paragraph",
                            title: "Paragraphe",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />

                {/* <Button onClick={() => editor?.chain().focus().unsetAllMarks().run()}>Clear marks</Button>
            <Button onClick={() => editor?.chain().focus().clearNodes().run()}>Clear nodes</Button> */}

                <ButtonsGroup
                    buttons={([1, 2, 3, 4, 5, 6] as const).map((level) => ({
                        onClick: () => editor?.chain().focus().toggleHeading({ level }).run(),
                        priority: editor?.isActive("heading", { level }) ? "secondary" : "tertiary no outline",
                        title: `Titre ${level}`,
                        iconId: `ri-h-${level}`,
                        // ri-h-1, ri-h-2, ri-h-3, ri-h-4, ri-h-5, ri-h-6
                    }))}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />

                <ButtonsGroup
                    buttons={[
                        {
                            onClick: () => editor?.chain().focus().toggleBulletList().run(),
                            priority: editor?.isActive("bulletList") ? "secondary" : "tertiary no outline",
                            iconId: "ri-list-unordered",
                            title: "Liste à puces",
                        },
                        {
                            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
                            priority: editor?.isActive("orderedList") ? "secondary" : "tertiary no outline",
                            iconId: "ri-list-ordered",
                            title: "Liste ordonnée",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />

                <ButtonsGroup
                    buttons={[
                        {
                            onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
                            priority: editor?.isActive("codeBlock") ? "secondary" : "tertiary no outline",
                            iconId: "ri-code-block",
                            title: "Bloc de code",
                        },
                        {
                            onClick: () => editor?.chain().focus().toggleBlockquote().run(),
                            priority: editor?.isActive("blockquote") ? "secondary" : "tertiary no outline",
                            iconId: "ri-double-quotes-l",
                            title: "Citation",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />

                {/* <Button onClick={() => editor?.chain().focus().setHorizontalRule().run()}>Horizontal rule</Button>
            <Button onClick={() => editor?.chain().focus().setHardBreak().run()}>Hard break</Button> */}

                <ButtonsGroup
                    buttons={[
                        {
                            onClick: () => editor?.chain().focus().undo().run(),
                            disabled: !editor?.can().chain().focus().undo().run(),
                            priority: "tertiary no outline",
                            iconId: "ri-arrow-go-back-line",
                            title: "Défaire",
                        },
                        {
                            onClick: () => editor?.chain().focus().redo().run(),
                            disabled: !editor?.can().chain().focus().redo().run(),
                            priority: "tertiary no outline",
                            iconId: "ri-arrow-go-forward-line",
                            title: "Refaire",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />
                <ButtonsGroup
                    buttons={[
                        {
                            iconId: "ri-links-line",
                            onClick: () => addLink(),
                            priority: "tertiary no outline",
                            title: "Insérer un lien",
                        },
                        {
                            iconId: "ri-image-line",
                            onClick: () => addImage(),
                            priority: "tertiary no outline",
                            title: "Insérer image",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                    buttonsSize="small"
                />
            </div>
            <div className={fr.cx("fr-grid-row")}>
                <ButtonsGroup
                    buttons={[
                        {
                            children: "Id Communauté",
                            onClick: () => editor?.chain().focus().insertContent("toto").run(),
                            priority: "tertiary no outline",
                            title: "Insérer l'id de la communauté",
                        },
                    ]}
                    buttonsEquisized
                    inlineLayoutWhen="always"
                />
            </div>
        </div>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    Image.configure(),
    Link.configure({ protocols: ["mailto"] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];

const initialContent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor?. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const Tiptap = () => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        console.log(content);
    }, [content]);

    return (
        <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
            onUpdate={(props) => {
                setContent(props.editor.getHTML());
            }}
        ></EditorProvider>
    );
};

export default Tiptap;
