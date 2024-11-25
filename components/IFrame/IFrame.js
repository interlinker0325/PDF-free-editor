import React, { useEffect, useState } from "react";

const IFrame = ({
  url,
  className = "",
  editView,
  setEditorContent,
  changedContent,
  setIsSaved,
  setSection,
  setMonograColor,
  ...props
}) => {
  const [editElement, setEditElement] = useState();

 
  
  const mathIndicators = [
    'math', 'mrow', 'mstyle', 'mi', 'mo', 'mn', 'mtext', 'ms', 'mglyph',
    'msub', 'msup', 'msubsup', 'munder', 'mover', 'munderover',
    'mfenced', 'mfrac', 'msqrt', 'mroot', 'mtable', 'mtr', 'mtd',
    'maligngroup', 'malignmark', 'annotation', 'annotation-xml',
    'menclose', 'maction', 'mpadded', 'mphantom', 'merror',
    'mjx-container', 'mjx-math', 'mjx-mi', 'mjx-mo', 'mjx-mn', 'mjx-mrow', 'mjx-mfrac'
  ];
  

  const handleClick = (event) => {
    event.preventDefault();
    var clickedElement = event.target;
    console.log('clickedElement:',clickedElement)
    console.log('clickedElement.tagName:',clickedElement.tagName)

    // if target is tr or td, select table tag for editing
    if (clickedElement.tagName === 'TD' || clickedElement.tagName === 'TH') {
      clickedElement = clickedElement.parentElement.parentElement.parentElement;
    }
    if (clickedElement.tagName === "IMG" || clickedElement.tagName === "FIGURE") {
      clickedElement = clickedElement.closest("div")
    }
    const tagNames = ['HTML', 'P', 'SPAN', 'FIGURE', 'IMG', 'UL', 'SVG', 'SUP', 'BODY', 'SECTION'];
    const ids = ['preview-content', 'preview', 'container-ruller'];

    if(clickedElement.tagName.includes('MathJax') || clickedElement.closest('math-block')){
      console.log('clickedElement.tagName:',clickedElement.tagName)
    }

    if (mathIndicators.includes(clickedElement.tagName.toLowerCase())) {
      console.log('MATH:',clickedElement.tagName)
    }

    else{
      if (tagNames.includes(clickedElement.tagName) || ids.includes(clickedElement.id) || clickedElement.tagName.includes('MathJax') || clickedElement.closest('math-block')) {
        // Do nothing for these elements
      } else {
        setEditorContent(clickedElement);
        setEditElement(clickedElement);


        const iframe = document.getElementById("documentWindow");

        if (editView && iframe && iframe.contentWindow && iframe.contentWindow.document) {
          const iframeDoc = iframe.contentWindow.document;
          const elements = iframeDoc.querySelectorAll('h2, h3, h4, div, table, li, a, blockquote, section, mjx-container, math, mrow, msub, mi, mo, msqrt, mfrac, mn, svg, sup, strong');

          elements.forEach(element => {
            element.style.background = 'none';
          });
        }
        // Set the background color of the newly clicked element
        clickedElement.style.background = "#dcfce7";

      }
    }
  };

  const handleMouseOver = (event) => {
    var hoveredElement = event.target;
    if (hoveredElement.tagName === 'TD' || hoveredElement.tagName === 'TH') {
      hoveredElement = hoveredElement.parentElement.parentElement.parentElement;
    }
    const tagNames = ['HTML', 'P', 'SPAN', 'FIGURE', 'IMG', 'UL', 'SVG', 'SUP', 'BODY', "SECTION"];
    const ids = ['preview-content', 'preview', 'container-ruller'];
    if (tagNames.includes(hoveredElement.tagName) || ids.includes(hoveredElement.id) || mathIndicators.includes(hoveredElement.tagName.toLowerCase())) {
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
    const tagNames = ['HTML', 'P', 'SPAN', 'FIGURE', 'IMG', 'UL', 'SVG', 'SUP', 'BODY', "SECTION"];
    const ids = ['preview-content', 'preview', 'container-ruller'];
    if (tagNames.includes(leftElement.tagName) || ids.includes(leftElement.id) || leftElement.tagName.includes('MJX')) {
    } else {
      if (!leftElement.style) return;
      // Only reset the background if the element is not the previously clicked element
      if (leftElement.style.background == 'rgb(186, 230, 253)') {
        leftElement.style.background = "none";
      }
      leftElement.style.cursor = "auto";
    }
  };

  // remove background and editorContent from clicked element when user left editor
  useEffect(() => {
    setEditElement(null);
    setEditorContent(null);
    const iframe = document.getElementById("documentWindow");
    if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
      const iframeDoc = iframe.contentWindow.document;
      const elements = iframeDoc.querySelectorAll('h2, h3, h4, div, table, li, a, blockquote, body');
      elements.forEach(element => {
        element.style.background = 'none';
      });

      if (iframe.contentWindow.document.body.textContent) {
        setMonograColor(true)
      } else setMonograColor(false);
    }
  }, [editView])


  useEffect(() => {
    const iframe = document.getElementById("documentWindow");
    const iframeDoc = iframe.contentWindow.document;

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
        const script = iframeDoc.createElement("script");
        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.async = true;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
        iframeDoc.head.appendChild(script);
      }
    };

    if (editView) {
      if (iframe) {
        iframe.addEventListener('load', () => {
          addIframeEventListeners();
          injectMathJax();
        });
        if (editView && iframe && iframe.contentWindow && iframe.contentWindow.document) {
          addIframeEventListeners();
        };
      };
    }
    else {
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        iframeDoc.removeEventListener("click", handleClick);
        iframeDoc.removeEventListener("mouseover", handleMouseOver);
        iframeDoc.removeEventListener("mouseout", handleMouseOut);
      }
    };

    return () => {
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        iframeDoc.removeEventListener("click", handleClick);
        iframeDoc.removeEventListener("mouseover", handleMouseOver);
        iframeDoc.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [editView]);

  useEffect(() => {
    // Only update the iframe content if changedContent exists and we have an editElement
    if (!changedContent || !editElement) return;

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
      } catch (error) {
        console.error('Error removing child:', error);
      }
    }

    setIsSaved(false);

    // Re-render MathJax content
    if (window.MathJax) {
      window.MathJax.typeset();
    }

    // Update tooltip numbers
    const iframe = document.getElementById("documentWindow");
    const iframeDoc = iframe.contentWindow.document;
    const tooltipElements = iframeDoc.querySelectorAll('sup');
    Array.from(tooltipElements).forEach((element, index) => {
      element.textContent = '[' + (index + 1) + ']';
    });
  }, [changedContent]);

  return (
    <>
      <iframe
        id="documentWindow"
        src={url}
        className={`border-none w-full h-[93%] my-4 overflow-unset overflow-none ${className}`}
        {...props}
      />
    </>
  );
};

export default IFrame;