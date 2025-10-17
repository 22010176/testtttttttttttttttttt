import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Bắt đầu viết nội dung...</p>",
  });

  const addImage = () => {
    const url = window.prompt("Nhập URL ảnh:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="p-4">
      <button onClick={addImage} className="mb-2 bg-blue-600 text-white px-3 py-1 rounded">
        Thêm ảnh
      </button>
      <EditorContent editor={editor} className="" />
    </div>
  );
}
