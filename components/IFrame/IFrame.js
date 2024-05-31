import React, { useState, useEffect } from "react";

const IFrame = ({
  url,
  className = "",
  editView,
  setEditorContent,
  changedContent,
  setIsSaved,
  setSection,
  ...props
}) => {
  const [editElement, setEditElement] = useState();

  const titleHandleClick = (e) => {
    let clickedElement = e.target;
    setEditorContent(clickedElement);
    setSection('Título del trabajo');
  };

  const handleClick = (event) => {
    event.preventDefault();
    var clickedElement = event.target;
    // if target is tr or td, select table tag for editing
    if (clickedElement.tagName === 'TD' || clickedElement.tagName === 'TH') {
      clickedElement = clickedElement.parentElement.parentElement.parentElement;
    }
    const tagNames = ['SECTION', 'HTML', 'P', 'SPAN', 'FIGURE', 'IMG'];
    const ids = ['preview-content', 'preview', 'container-ruller'];
    if (tagNames.includes(clickedElement.tagName) || ids.includes(clickedElement.id)) {
      // Do nothing for these elements
    } else {
      setEditorContent(clickedElement);
      setEditElement(clickedElement);


      const iframe = document.getElementById("documentWindow");

      if (editView && iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        const elements = iframeDoc.querySelectorAll('h2, div, table');

        elements.forEach(element => {
          element.style.background = 'none';
        });
      }

      // Set the background color of the newly clicked element
      clickedElement.style.background = "#dcfce7";

    }
  };

  const handleMouseOver = (event) => {
    var hoveredElement = event.target;
    if (hoveredElement.tagName === 'TD' || hoveredElement.tagName === 'TH') {
      hoveredElement = hoveredElement.parentElement.parentElement.parentElement;
    }
    const tagNames = ['SECTION', 'HTML', 'P', 'SPAN', 'FIGURE', 'IMG'];
    const ids = ['preview-content', 'preview', 'container-ruller'];
    if (tagNames.includes(hoveredElement.tagName) || ids.includes(hoveredElement.id)) {
    } else {
      hoveredElement.style.cursor = "pointer";
      if (!hoveredElement.style) return;
      if (hoveredElement.style.background !== 'rgb(220, 252, 231)') {
        hoveredElement.style.background = "#bae6fd";
      }
    }
  };

  const handleMouseOut = (event) => {
    var leftElement = event.target;
    if (leftElement.tagName === 'TD' || leftElement.tagName === 'TH') {
      leftElement = leftElement.parentElement.parentElement.parentElement;
    }
    const tagNames = ['SECTION', 'HTML', 'P', 'SPAN', 'FIGURE', 'IMG'];
    const ids = ['preview-content', 'preview', 'container-ruller'];
    if (tagNames.includes(leftElement.tagName) || ids.includes(leftElement.id)) {
    } else {
      if (!leftElement.style) return;
      // Only reset the background if the element is not the previously clicked element
      if (leftElement.style.background == 'rgb(186, 230, 253)') {
        leftElement.style.background = "none";
      }
      leftElement.style.cursor = "auto";
    }
  };

  useEffect(() => {
    const paperTitle = document.getElementById('title');
    const iframe = document.getElementById("documentWindow");

    const addIframeEventListeners = () => {
      if (editView && iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.addEventListener("click", handleClick);
        iframeDoc.addEventListener("mouseover", handleMouseOver);
        iframeDoc.addEventListener("mouseout", handleMouseOut);
      }
    };

    const injectMathJax = () => {
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        const script = iframeDoc.createElement("script");
        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.async = true;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
        iframeDoc.head.appendChild(script);
      }
    };

    if (editView) {
      if (paperTitle) {
        paperTitle.addEventListener('click', titleHandleClick);
      }
      if (iframe) {
        iframe.addEventListener('load', () => {
          addIframeEventListeners();
          injectMathJax();
        });
      }
    }

    // Cleanup function
    return () => {
      if (paperTitle) {
        paperTitle.removeEventListener('click', titleHandleClick);
      }
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.removeEventListener("click", handleClick);
        iframeDoc.removeEventListener("mouseover", handleMouseOver);
        iframeDoc.removeEventListener("mouseout", handleMouseOut);
      }
      if (iframe) {
        iframe.removeEventListener('load', addIframeEventListeners);
      }
    };
  }, [editView]);

  useEffect(() => {
    if (!editElement) return
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = changedContent;
    editElement.innerHTML = '';

    while (tempContainer.firstChild) {
      const firstChild = tempContainer.firstChild;

      while (firstChild.firstChild) {
        const childNode = firstChild.firstChild;
        editElement.appendChild(childNode);
      }

      try {
        tempContainer.removeChild(firstChild);
      }
      catch {
      }
    }


    setIsSaved(false);
    // Re-render MathJax content
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [changedContent]);

  return (
    <>
      <iframe
        id="documentWindow"
        src={url}
        className={`border-none w-full h-full my-4 overflow-unset overflow-none ${className}`}
        {...props}
      />
    </>
  );
};

export default IFrame;