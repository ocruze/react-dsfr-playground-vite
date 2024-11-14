import { useRef } from "react";
import Button from "@codegouvfr/react-dsfr/Button";

import TinyMCEditor from "./components/TinyMCE/TinyMCEditor";

export default function TestTinyMCEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <TinyMCEditor
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    content_css: "tinymce-5-dark", // "dark",
                    skin: "tinymce-5-dark", // "oxide-dark",
                    height: 500,
                    menubar: false,
                    plugins: ["advlist", "anchor", "autolink", "help", "image", "link", "lists", "searchreplace", "table", "wordcount"],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />

            <Button onClick={log}>Log editor content</Button>
        </>
    );
}
