import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

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
    setModel(editorContent.outerHTML);
    setChangedContent(editorContent.outerHTML);
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
    // console.log('this is value===>', value);
    setChangedContent(value);
    setModel(value);
  };

  const options = [
    'paragraph', '|',
    'bold',
    'strikethrough',
    'underline',
    'italic', '|',
    'ul',
    'ol', '|',
    'outdent', 'indent',  '|',
    'font',
    'fontsize',
    'brush',
    'image',
    'video',
    'table',
    'link', '|',
    'undo', 'redo', '|',
    'hr',
    'eraser',
    'copyformat', '|',
    'symbol',
    'fullsize',
    'print',
    'about',
    'source', '|',
];

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: '',
      defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.5,
      enter: 'div',
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      language: 'sp',
      colors: ['#159957', '#f2f2f2', '#fcf9e7'],
    }),
    [],
  );

  return (
    <div className="w-full h-full p-1">
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
            className="w-full"
          />
        )}
      </form>
    </div>
  );
};

export default Editor;