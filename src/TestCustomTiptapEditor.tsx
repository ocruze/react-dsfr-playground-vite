import { useState } from "react";

import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import StarterKit from "@tiptap/starter-kit";

const initialContent = `
<p>
this is a basic example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor?
</p>
`;

const TestCustomTiptapEditor = () => {
    const [content, setContent] = useState(initialContent);

    return (
        <>
            <RichTextEditor.Provider content={content} extensions={[StarterKit]} onUpdate={({ editor }) => setContent(editor.getHTML())}>
                <RichTextEditor.Menu first>
                    <RichTextEditor.Bold />
                </RichTextEditor.Menu>
                <RichTextEditor.Content />
            </RichTextEditor.Provider>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default TestCustomTiptapEditor;
