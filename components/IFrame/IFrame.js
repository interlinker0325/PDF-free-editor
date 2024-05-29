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
  // set as clicked element - html object
  const [editElement, setEditElement] = useState();

  const titleHandleClick = (e) => {
    let clickedElement = e.target;
    setEditorContent(clickedElement);
    setSection('Título del trabajo');
  };

  const handleClick = function (event) {
    event.preventDefault();
    var clickedElement = event.target;
    setEditorContent(clickedElement);
    setEditElement(clickedElement);
    console.log('element is clicked');
  };

  const handleMouseOver = function (event) {
    var hoveredElement = event.target;
    hoveredElement.style.cursor = "pointer";
    if (!hoveredElement.style) return;
    hoveredElement.style.background = "#bae6fd";
    console.log('mouse over');
  };

  const handleMouseOut = function (event) {
    var leftElement = event.target;
    if (!leftElement.style) return;
    leftElement.style.background = "none";
    leftElement.style.cursor = "auto";
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

    if (editView) {
      if (paperTitle) {
        paperTitle.addEventListener('click', titleHandleClick);
      }
      if (iframe) {
        iframe.addEventListener('load', addIframeEventListeners);
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
    if (!editElement) return;
    // Set the Iframe's content as Editor's content
    editElement.innerHTML = changedContent;
    setIsSaved(false);
  }, [changedContent]);

  return (
    <iframe
      id="documentWindow"
      src={url}
      className={`border-none w-full h-full my-4 overflow-unset overflow-none ${className}`}
      {...props}
    />
  );
};

export default IFrame;