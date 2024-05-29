import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Using dynamic import of Jodit component as it can't render in server side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Editor = ({
  editorContent,
  setChangedContent,
  section,
  setSection,
  ...props
}) => {
  const editor = useRef(null);
  // check if the content is loaded perfectly
  const [isBrowser, setIsBrowser] = useState(false);
  // value of the Editor
  const [model, setModel] = useState("");

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    setModel(editorContent.innerHTML);
    setChangedContent(editorContent.innerHTML);
    try {
      const sectionTitleElement = editorContent.parentNode.getElementsByTagName("h2")[0];
      if (sectionTitleElement?.id !== 'title') {
        setSection(sectionTitleElement.textContent);
      }
    } catch (e) {
      console.log("Please select the correct section");
    }
  }, [editorContent]);

  const handleModelChange = (value) => {
    console.log('this is value===>', value);
    setChangedContent(value);
    setModel(value);
  };

  const config = useMemo(() => ({
    readonly: false,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
    },
    buttons: [
      "undo", "redo", "bold", "italic", "link", "align", "image", "source", "fullsize"
    ],
    placeholder: "Edite aquí su contenido!",
  }), []);

  return (
    <div className="w-full h-full p-1">
      <Head>
        <title>Jodit Rich Text Editor</title>
      </Head>
      <div className="flex justify-between">
        <span className="font-semibold text-[30px]">{section}</span>
      </div>
      <form className="w-full h-full mt-5">
        {isBrowser && (
          <JoditEditor
            ref={editor}
            value={model}
            config={config}
            onChange={handleModelChange}
            className="w-full h-[70%] mt-10 bg-white"
          />
        )}
      </form>
    </div>
  );
};

export default Editor;