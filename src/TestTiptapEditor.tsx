// import Highlight from "@tiptap/extension-highlight";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import StarterKit from "@tiptap/starter-kit";
// import Subscript from "@tiptap/extension-subscript";
// import Superscript from "@tiptap/extension-superscript";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";
// import Youtube from "@tiptap/extension-youtube";

import RichTextEditor from "./components/RichTextEditor/RichTextEditor";

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

// const extensions = [
//     Highlight,
//     Image.configure({
//         inline: true,
//     }),
//     Link.configure({ openOnClick: false }),
//     StarterKit,
//     Subscript,
//     Superscript,
//     TextAlign.configure({
//         types: ["heading", "paragraph"],
//     }),
//     Underline,
//     Youtube.configure({
//         controls: false,
//         nocookie: true,
//     }),
// ];

const TestTiptapEditor = () => {
    return (
        <>
            <RichTextEditor content={initialContent} />
            {/* <RichTextEditor.Provider content={initialContent} extensions={extensions}>
                <RichTextEditor.Menu>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strike />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                    <RichTextEditor.Code />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Divider />
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.H5 />
                    <RichTextEditor.H6 />
                    <RichTextEditor.Paragraph />
                    <RichTextEditor.Divider />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.CodeBlock />
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.HorizontalRule />
                    <RichTextEditor.Divider />
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignRight />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.Divider />
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                    <RichTextEditor.Divider />
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                    <RichTextEditor.Divider />
                    <RichTextEditor.Image />
                    <RichTextEditor.Youtube />
                    <RichTextEditor.Divider />
                </RichTextEditor.Menu>
                <RichTextEditor.Content />
            </RichTextEditor.Provider> */}
        </>
    );
};

// CodeBlockLowlight: https://tiptap.dev/docs/editor/extensions/nodes/code-block-lowlight
// Mention: https://tiptap.dev/docs/editor/extensions/nodes/mention
// Table: https://tiptap.dev/docs/editor/extensions/nodes/table
// TaskList: https://tiptap.dev/docs/editor/extensions/nodes/task-list

export default TestTiptapEditor;
