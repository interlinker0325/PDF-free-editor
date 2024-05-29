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
    setEditorContent(clickedElement)
    setSection('Título del trabajo')
  }

  const handleClick = function (event) {
    event.preventDefault();
    var clickedElement = event.target;
    // var parentElement = clickedElement.parentNode;
    setEditorContent(clickedElement);
    setEditElement(clickedElement);
  };

  const handleMouseOver = function (event) {
    var hoveredElement = event.target;
    // var parentElement = hoveredElement.parentNode;
    // hoveredElement.style.border = "1px solid #000";
    hoveredElement.style.cursor = "pointer";
    if (!hoveredElement.style) return;
    hoveredElement.style.border = "1px solid #000";
  };

  const handleMouseOut = function (event) {
    var leftElement = event.target;
    // var parentElement = leftElement.parentNode;
    if (!leftElement.style) return;
    leftElement.style.border = "1px solid #fff";
    leftElement.style.cursor = "auto";
  };

  useEffect(() => {
    const paperTitle = document.getElementById('title');
    if(editView) {
      paperTitle.addEventListener('click', titleHandleClick)
    }
    const iframe = document.getElementById("documentWindow");
    if (editView && iframe) {
      iframe?.contentWindow?.document?.addEventListener("click", handleClick);
      iframe?.contentWindow?.document?.addEventListener(
        "mouseover",
        handleMouseOver
      );
      iframe?.contentWindow?.document?.addEventListener(
        "mouseout",
        handleMouseOut
      );
    }
    // Cleanup function
    return () => {
      if (iframe) {
        iframe?.contentWindow?.document?.removeEventListener(
          "click",
          handleClick
        );
        iframe?.contentWindow?.document?.removeEventListener(
          "mouseover",
          handleMouseOver
        );
        iframe?.contentWindow?.document?.removeEventListener(
          "mouseout",
          handleMouseOut
        );
      }
    };
  }, [editView]);

  useEffect(() => {
    if (!editElement) return;
    const tempContainer = document.createElement('div');
    // Set the innerHTML of the container to the HTML string
    editElement.innerHTML = changedContent ;
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
