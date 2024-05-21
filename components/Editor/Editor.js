import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const QuillEditorComponent = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    return ReactQuill;
  },
  {
    ssr: false,
  }
);

const Editor = ({
  editorContent,
  setChangedContent,
  section,
  setSection,
  ...props
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const [model, setModel] = useState("");

  useEffect(() => {
    setModel(editorContent.innerHTML);
    console.log(editorContent.innerHTML);
    setChangedContent(editorContent.innerHTML);
    try {
      const sectionTitleElement = editorContent.parentNode.getElementsByTagName("h2")[0];
      if (sectionTitleElement?.id != 'title') {
        setSection(sectionTitleElement.textContent);
      }
    } catch (e) {
      console.log("Please select correct section");
    }
  }, [editorContent]);

  const handleModelChange = (content, delta, source, editor) => {
    setChangedContent(content);
    setModel(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'align'
  ];

  return (
    <div className="w-full h-full p-1">
      <div className="flex justify-between">
        <span className="font-semibold text-[30px]">{section}</span>
      </div>
      <form className="w-full h-full mt-5">
        {isBrowser && (
          <>
            <QuillEditorComponent
              value={model}
              onChange={handleModelChange}
              modules={modules}
              formats={formats}
              theme="snow"
            />
          </>
        )}
      </form>
    </div>
  );
};

export default Editor;