import React, { useCallback, useEffect, useRef, useState } from "react";
import ConfirmationDialog from "components/confirmation-dialog";
import { matchStyles } from "utils/match-styles";
import axios from "axios";
import dynamic from "next/dynamic";
import { parser } from "utils/html-parser";
import { Toaster, toast } from 'sonner'
import { FiAlertTriangle } from 'react-icons/fi';
// Using dynamic import of Jodit component as it can't render server-side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
// import 'jodit/build/jodit.min.css';
// import "https://cdnjs.cloudflare.com/ajax/libs/jodit/3.6.5/jodit.min.css"

const Editor = ({
  editorContent,
  setEditorContent,
  setChangedContent,
  section,
  setSection,
}) => {




function showCustomToast(text) {
  toast.custom((t) => (
    <div
      className={`flex items-center gap-3 p-4 border-l-4 rounded shadow-lg`}
      style={{
        backgroundColor: '#FF9800', // Light orange background
        borderColor: '#f59e0b', // Orange border
        color: '#fff', // Dark orange text
        width: '500px',
      }}
    >
      <FiAlertTriangle  size={48} style={{ color: '#fff' }} />
      <div>{text}</div>
    </div>
  ));
}

function moveToUpperBlock(currentElement, element){
  const iframe = document.getElementById("documentWindow");
  const iframeDoc = iframe.contentWindow.document; 
  console.log("🚀 ~ moveToUpperBlock ~ element:", element)
  console.log("🚀 ~ moveToUpperBlock ~ editorContent:", editorContent)

  console.log("🚀 ~ moveToUpperBlock ~ editorValue:", editorValue)
  console.log("🚀 ~ moveToUpperBlock ~ model:", model)

  if (currentElement) { 
    console.log("🚀 ~ moveToUpperBlock ~ currentElement:", currentElement)
    const newElement = iframeDoc.querySelector(`[data-content-id="${currentElement.getAttribute('data-content-id')}"]`);
    const selectedElement = newElement || editorContent 
    console.log("Selected element:", selectedElement);
    if (selectedElement) { 
      let previousSibling = selectedElement.previousElementSibling;

      if (previousSibling) {
        console.log("Element above (previous sibling):", previousSibling);
      
        const clickEvent = new MouseEvent("click", {
          bubbles: true,  
          cancelable: true, 
          view: window  
        }); 
        deleteBlock(element)
        previousSibling.dispatchEvent(clickEvent);
        console.log("Click event dispatched on the element above.");
      }
      else {
        let nextSibling = selectedElement.nextElementSibling;
        console.log("🚀 ~ moveToUpperBlock ~ nextSibling:", nextSibling)

        if (nextSibling) {
          console.log("Element above (previous sibling):", nextSibling);
         
          const clickEvent = new MouseEvent("click", {
            bubbles: true, 
            cancelable: true, 
            view: window 
          }); 
          deleteBlock(element)
          nextSibling.dispatchEvent(clickEvent);
          console.log("Click event dispatched on the element above.");
        } else {
          deleteBlock(element)
          setModel('')
          setEditorContent('')
          setEditorValue('')
        }
      }
    } else {
      console.log("Selected element not found in iframe document.");
    }
  }
}

function deleteBlock(content) {
    console.log("🚀 ~ deleteBlock ~ content:", content)
    
    try {
      if (content && content.parentNode) {
        

        // Remove the content block
        content.parentNode.removeChild(content);

        // Select the previous sibling if it exists
        
        const iframe = document.getElementById("documentWindow");
        const iframeDoc = iframe.contentWindow.document;
        const targetElement = iframeDoc.querySelector(`[data-content-id="${content.getAttribute('data-content-id')}"]`);
        console.log("🚀 ~ deleteBlock ~ targetElement:", targetElement)
        if (targetElement) {
          targetElement.parentNode.removeChild(targetElement);
        }
        else{
          editorContent.parentNode.removeChild(editorContent);
          console.log("🚀 ~ deleteBlock ~ editorContent:", editorContent)
        }
        
        // Reset states
        // setEditorContent(null);
        // setEditorValue('')
        // setModel(''); 
        setPendingChanges(false);
        setFormattedContent('');
        setImprovedText(''); 
        // // Clear editor selection if exists
        // if (editor.current?.jodit?.selection) {
        //   editor.current.jodit.selection.clear();
        // }
      } else {
        alert("Error: El bloque no se pudo borrar."); // Alert if block deletion fails
      }
    } catch (error) {
      console.error('Error deleting block:', error);
      alert("Error al intentar borrar el bloque."); // Alert on error
    }
}
  
  const editor = useRef(null);
  const [aiButton,setAiButton] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false);
  const [config, setConfig] = useState(null);
  const [model, setModel] = useState("");
  const [isFormatUpdated, setIsFormatUpdated] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  

  const [improvedText, setImprovedText] = useState("");

  // Add new state for tracking editor content
  const [editorValue, setEditorValue] = useState("");

  const [deleteContent, setDeleteContent] = useState("");

  const [pendingChanges, setPendingChanges] = useState(false);
  let isUpdated=false

  // useEffect(()=>{
  //   console.log('editorValue:',editorValue)
  // },[editorValue])

  // useEffect(()=>{
  //   console.log('model:',model)
  // },[model])


  // useEffect(()=>{
  //   console.log('editorValue:',editorValue)
  // },[editorValue])
  // useEffect(()=>{
  //   console.log('editorContent:',editorContent)
  // },[editorContent])
  

  // Add state for tracking formatted content
  const [formattedContent, setFormattedContent] = useState("");

  const options = [
    "customParagraph",
    "|",
    "bold",
    "underline",
    "italic",
    "|",
    "link",
    "|",
    "undo",
    "redo",
    "|",
    "eraser",
    "|",
    "insertTooltip",
  ];

  function AddBlock(){
    const newDiv = document.createElement("div");
    newDiv.innerText = "Nuevo párrafo";
    // console.log("🚀 ~ import ~ editorContent:", editorContent) 
    if(!editorContent){
      return
    }
    const nexteditorContent = editorContent.nextSibling;
    if (nexteditorContent) {
      // console.log("🚀 ~ import ~ nexteditorContent:", nexteditorContent)
      editorContent.parentNode.insertBefore(newDiv, nexteditorContent);
      
      // editorContent.parentNode.insertAdjacentElement('afterend',newDiv);

    } else {
      console.log("🚀 ~ import ~ nexteditorContent - 2:", nexteditorContent)
      editorContent.parentNode.appendChild(newDiv);
    }
    // make click event automatically to convert new Element
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    newDiv.dispatchEvent(clickEvent);
  }
 
  const iframe = document.getElementById("documentWindow");
  
  useEffect(() => {
    const safeAtob = (str) => {
      try {
        const decodedStr = decodeURIComponent(str);
        if (/^[A-Za-z0-9+/=]+$/.test(decodedStr)) {
          return atob(decodedStr);
        }
        return decodedStr;
      } catch (e) {
        return str;
      }
    };

    if (typeof window !== 'undefined') {
      window.atob = safeAtob;
    }

    setIsBrowser(true);
    import("jodit-react").then((module) => {
      if (module.Jodit && module.Jodit.modules && module.Jodit.modules.Icon) {
        const safeIconSet = (name, src, styles = {}) => {
          if (typeof src === 'string') {
            const styleString = Object.entries(styles)
              .map(([key, value]) => `${key}: ${value}`)
              .join(';');
            module.Jodit.modules.Icon.set(
              name,
              `<img src="${src}" style="${styleString}"/>`
            );
          }
        };

        safeIconSet("greenCheck", "https://img.icons8.com/?size=100&id=Zy5ghkQj2rKy&format=png&color=000000");
        safeIconSet("tooltip", "https://cdn0.iconfinder.com/data/icons/leading-international-corporate-website-app-collec/16/Info-512.png");
        safeIconSet("math", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVDiNxY+xSgNBFEXPG7KEBW38Ab8gzU61naQSQbAR/Atb7QRRSeMfWKYxFkoKG60UtnDzEG1stbOxNCQL+6wWliU7BiycaoZ77+EM/PeRtsB73wPGwHpLZQocuwD8MDAGiIGDhQZpmsbz+fwTWA0AAIYd7/0OsA+MJ5PJOcBsNtsUkWpcAH0zmzbG36r61gEugDVgI0mSJ1V9EJHdqiUi93meP7YpOOCjVj5K0zQGtmudUegPzszOau9+URSnwEqlH0XRdQgggPPePwO9Zmhmt6q6FTQASjM7acmD+hUAVR0BL42s6Ha7N0sBFlmY2V2WZV/LAlDVK+C1ll3+Ngbo1O5lWZZ7zrmBiLwDw2UAfz4/dNtaTXH2UcAAAAAASUVORK5CYII=");
        safeIconSet("chemistry", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGPSURBVDiN1ZKxa1NRFMZ/5yY1COYPKFiEiNpBHe55SQiZdFBEHAQHQZwchapLodClCEKhi4Pg6KaSzamCQnDJEMiTDqIoGXTRRcHFR+K7x8G8cHkNdfabDt8558flu0c4QM1mc8XMboUQPo5Go6dAKM/IosVOp3N4MpmsAZvAkZn9NoRwJ03TNwcCkiS5ZmY7wLEFbDOz55VK5d5wOPwKUC06rVbrZJ7nj83sXGnpM7AMLAEiItdDCKeBMwCumMrz/AUQL/80s/Usy04AZ0VkN+qtFLvVyDwV1U+ccxvFM4H3wCVVvQxcdc49YxboPANVtaJuNBrVXq+XL8hgn9y/R/5LwHg8vquqS2VfVY+r6lqSJPPAY8C3qN4B9rz3FwG63W7de78NvAMemtkrZh8wB4QQbgBfIsiqiOyq6sssyz6IyDpwaNar7AOkafoaWAXuA78i0AX+XmKhPTO7QvkOYrXb7aPT6fSBiNyM7B/AVr1ef9Tv938X5kJAIe/9eefc7RDCp1qttj0YDL6XZ/4A/MWDnkkEniQAAAAASUVORK5CYII=");
        safeIconSet("rightarrow", "https://cdn-icons-png.flaticon.com/256/724/724954.png");
        safeIconSet("arrowup", "https://cdn-icons-png.flaticon.com/512/608/608336.png");
        safeIconSet("arrowdown", "https://cdn-icons-png.flaticon.com/512/3313/3313001.png", {
          'font-weight': 'extra-bold',
          'width': '16.7px',
          'height': '14.1px'
        });
        safeIconSet("ai_assistant", "https://cdn-icons-png.flaticon.com/512/15917/15917116.png");

        setConfig({
          readonly: false,
          placeholder: "Nuevo párrafo",
          defaultActionOnPaste: "insert_only_text",
          defaultLineHeight: 1.5,
          enter: "div",
          buttons: options,
          buttonsMD: options,
          buttonsSM: options,
          buttonsXS: options,
          statusbar: false,
          sizeLG: 900,
          sizeMD: 700,
          sizeSM: 400,
          language: "es",
          colors: ["#159957", "#7DC9A5", "#f2f2f2", "#fcf9e7", "#fff", "#000"],
          uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            processFileName: (name) => {
              return name.toLowerCase();
            },
            defaultHandlerSuccess: (response) => {
              

              try {
                if (response.files && response.files.length) {
                  response.files.forEach(file => {
                    const image = editor.current?.createInside.element('img');
                    
                    if (image) {
                      
                      image.setAttribute('src', file);
                      image.style.width = '80%';
                      image.setAttribute('tabindex', '0');
                      editor.current?.selection?.insertNode(image);
                    }
                  });
                }
              } catch (error) {
                console.error('Error handling image upload:', error);
              } finally { 
              }
            },
            defaultHandlerError: (error) => {
              console.error('Error uploading image:', error);
            },
            url: null,
          },
          allowTabNavigation: false,
          link: {
            noFollowCheckbox: false,
            openInNewTabCheckbox: false,
            modeClassName: "",
          },
          spellCheck: true,
          autofocus: true,
          popup: {
            img: null,
          },
          enableDragAndDropFileToEditor: true,
          uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ["jpg", "png", "jpeg", "gif"],
            url: null,
          },
          disablePlugins: ["paste", "imageProperties"],
          // custom buttons
          extraButtons: [
            
            {
              name: "addNewBlock",
              tooltip: "Nuevo bloque",
              icon: "plus",
              exec: () => {
                const iframe = document.getElementById("documentWindow");
                const iframeDoc = iframe.contentWindow.document;
                const body = iframeDoc.getElementsByTagName("body");
                const newDiv = document.createElement("div");
                newDiv.innerText = "Nuevo párrafo"; 
                AddBlock()
                
                if (!body[0].textContent) {
                  const style = document.createElement("style");
                  const cssRules = `
                      body {
                        padding: 0;
                        margin: 0;
                        color: #606c71;
                        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                        text-align: left;
                      }

                      #container-ruller {
                          width: 100vw;
                          height: 48px;
                          background-image: linear-gradient(120deg, rgb(21, 87, 153), rgb(21, 153, 87)) !important;
                      }

                      #preview-content {
                          margin: 0 auto;
                          padding: 2rem 4rem;
                          max-width: 70rem;
                      }

                      h2 {
                          color: rgb(21, 153, 87);
                          font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                          font-size: 1.5rem;
                          font-weight: 400;
                          margin: 0 0 16px 0
                      }
                      
                      div {
                          padding: 10px;
                      }
                      
                      p {
                          border: 0 !important;
                          margin: 0 !important;
                      }
                      
                      section div, span, 
                      li {
                          margin: 15.6px 0;
                          color: rgb(96, 108, 113);
                          font-size: 1.1rem;
                          line-height: 26.4px;
                          text-align: left;
                          font-weight: 200;
                          font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                      }

                      .math-block {
                          display: flex;
                          justify-content: center;
                      }

                      img {
                          width: 80%;
                          height: auto;
                      }

                      .Wirisformula {
                          width: auto!important;
                          height: auto;
                          margin: auto;
                      }

                      table {
                          display: table;
                          border-color: gray;
                          border-collapse: collapse;
                          border-spacing: 0;
                          word-break: keep-all;
                          font-size: 0.8em;
                      }

                      tr {
                          display: table-row;
                      }

                      th {
                          display: table-cell;
                          font-weight: 700;
                          background-color: #159957 !important;
                          color: white;
                          padding: 0.5rem 1rem;
                          border-bottom: 1px solid #e9ebec;
                          text-align: left;
                      }

                      td {
                          padding: .5rem 1rem;
                          border-bottom: 1px solid #e9ebec;
                          text-align: left;
                      }

                      tbody {
                          display: table-row-group;
                          vertical-align: middle;
                          unicode-bidi: isolate;
                          border-color: inherit;
                      }
                      table tr:nth-child(odd) {
                          background-color: #f2f2f2;
                      }
                      a {
                          color: #1e6bb8;
                          text-decoration: none;
                      }
                      td svg {
                          height: 0.8rem;
                      }

                      blockquote {
                          border-left: 5px solid #ccc;
                          margin-bottom: 1em;
                          margin-left: 20px;
                          margin-right: 0;
                          padding-left: 1.5em;
                          padding-right: 1.5em;
                      }
                    `;
                  style.appendChild(document.createTextNode(cssRules));
                  iframeDoc.head.appendChild(style);
                  body[0].appendChild(newDiv);
                }
              },
            },
            // "image",
            // Replace the "image" string with this custom button configuration
            {
              name: 'customImage',
              tooltip: 'Insertar Image',
              icon: 'image',
              popup: (editor, current, self, close) => {
                console.log("🚀 ~ import ~ editor:", parser(editor.value))
                console.log('editorContent.innerHTML:',editorContent.innerHTML)
                const doc = parser(editor.value)
                console.log(doc.innerText);
                if (doc.innerText !== '') {
                  // alert('No puedes incluir una imagen o tabla en un bloque con texto. Inténtalo en un bloque nuevo');
                  // toast('My first toast')
                  showCustomToast('No puedes incluir una imagen o tabla en un bloque con texto. Inténtalo en un bloque nuevo')
                  return null; // Prevent the popup from being displayed
                }
            
                // Create form for image insertion
                const form = editor.create.fromHTML(`
                  <div class="jodit-form" style="padding: 15px; max-width: 300px;">
                    <div class="jodit-form__group">
                      <label style="display: block; margin-bottom: 8px; font-weight: bold;">Upload Image</label>
                      <input type="file" 
                            accept="image/*" 
                            class="jodit-form__input" 
                            style="margin-bottom: 15px; padding: 5px; width: 100%;"/>
                    </div>
                    <div class="jodit-form__group">
                      <label style="display: block; margin-bottom: 8px; font-weight: bold;">Image URL</label>
                      <input type="url" 
                            placeholder="Enter image URL" 
                            class="jodit-form__input url-input" 
                            style="margin-bottom: 15px; padding: 5px; width: 100%;"/>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 10px; padding: 10px 0;">
                      <button type="button" class="jodit-button cancel" style="padding: 5px 10px;">Cancel</button>
                      <button type="button" class="jodit-button insert" style="padding: 5px 10px;">Insert</button>
                    </div>
                  </div>
                `);
                
                // Handle file and URL insertion
                const fileInput = form.querySelector('input[type="file"]');
                const urlInput = form.querySelector('.url-input');
                const insertBtn = form.querySelector('.insert');
                const cancelBtn = form.querySelector('.cancel');
                
                cancelBtn.addEventListener('click', close);
                
                insertBtn.addEventListener('click', () => {
                  let img;
                  
                  // Handle file upload
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const blobURL = URL.createObjectURL(file);
                    console.log("🚀 ~ insertBtn.addEventListener ~ blobURL:", blobURL)
                    
                    img = editor.createInside.element('img');
                    img.setAttribute('src', blobURL);
                  } 
                  // Handle URL upload
                  else if (urlInput.value.trim() !== '') {
                    const url = urlInput.value.trim();
                    img = editor.createInside.element('img');
                    img.setAttribute('src', url);
            
                    // Optional: Validate URL format (basic check)
                    try {
                      new URL(url); // Throws an error if invalid URL
                    } catch {
                      alert('Invalid URL');
                      return;
                    }
                  }
                  
                  // Insert image if valid
                  if (img) {
                    img.style.width = '80%';
                    img.style.display = 'block';
                    img.style.margin = '0 auto';
                    img.setAttribute('tabindex', '0');
                    
                    editor.selection.insertNode(img);
                    
                    // Update parent container styles for centering
                    const parent = img.parentElement;
                    if (parent) {
                      parent.style.display = 'flex';
                      parent.style.justifyContent = 'center';
                      parent.style.alignItems = 'center';
                      parent.style.flexDirection = 'column';
                    }
                    
                    close();
                  }
                });
                
                return form;
              }
            },
            // {
            //   name: 'table',  // Keep the name as 'table' to use default functionality
            //   tooltip: 'insertar tabla',
            //   icon: 'table',
            //   exec: (editor, current, buttonBlock, close) => {
            //     // Check for text in current block
            //     const doc = parser(editor.value);
            //     if (doc.innerText !== '') {
            //       showCustomToast('No se pueden insertar tabla en bloques con texto, inserta un nuevo bloque para pégarla ahí');
            //       return null;
            //     }
                
            //     if (doc.innerText === '') {
            //       return editor.execCommand('table');
            //     }
            //   }
            // },
            
            {
              name: 'customTable',
              tooltip: 'insertar tabla',
              icon: 'table',
              popup: (editor, current, self, close) => {
                const doc = parser(editor.value);
                if (doc.innerText !== '') {
                  showCustomToast('No se pueden insertar mesa en bloques con texto, inserta un nuevo bloque para pégarla ahí');
                  return null;
                }
            
                // Create popup container with table grid
                const form = editor.create.fromHTML(`
                  <div class="jodit-form" style="padding: 15px;">
                    <div class="jodit-form__group">
                      <div class="jodit-grid-selector" style="width: 280px;">
                        <div class="grid-container" style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; margin-bottom: 10px;">
                          ${Array(100).fill().map((_, i) => `
                            <div class="grid-cell" 
                                 data-row="${Math.floor(i / 10) + 1}" 
                                 data-col="${(i % 10) + 1}"
                                 style="width: 25px; height: 25px; border: 1px solid #ccc; background: white; cursor: pointer;">
                            </div>
                          `).join('')}
                        </div>
                        <div class="size-display" style="margin: 10px 0; text-align: center;">
                          Table size: 0 x 0
                        </div>
                      </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 10px; padding: 10px 0;">
                      <button type="button" class="jodit-button cancel">Cancel</button>
                      <button type="button" class="jodit-button insert" disabled>Insert</button>
                    </div>
                  </div>
                `);
            
                const gridContainer = form.querySelector('.grid-container');
                const sizeDisplay = form.querySelector('.size-display');
                const insertBtn = form.querySelector('.insert');
                const cancelBtn = form.querySelector('.cancel');
                let selectedRows = 0;
                let selectedCols = 0;
            
                function updateGridSelection(row, col) {
                  const cells = gridContainer.querySelectorAll('.grid-cell');
                  cells.forEach(c => {
                    const cRow = parseInt(c.dataset.row);
                    const cCol = parseInt(c.dataset.col);
                    
                    if (cRow <= row && cCol <= col) {
                      c.style.background = '#159957';
                    } else {
                      c.style.background = 'white';
                    }
                  });
            
                  selectedRows = row;
                  selectedCols = col;
                  sizeDisplay.textContent = `Table size: ${row} x ${col}`;
                  insertBtn.disabled = false;
                }
            
                function handleCellClick(cell) {
                  if (cell.innerHTML === 'Nuevo párrafo') {
                    cell.innerHTML = '';
                  }
                }
            
                function handleCellBlur(cell) {
                  if (cell.innerHTML.trim() === '') {
                    cell.innerHTML = 'Nuevo párrafo';
                  }
                }
            
                function insertTable() {
                  if (selectedRows && selectedCols) {
                    const table = editor.createInside.element('table');
                    table.style.width = '100%';
                    table.style.borderCollapse = 'collapse';
            
                    // Create header row
                    const thead = editor.createInside.element('thead');
                    const headerRow = editor.createInside.element('tr');
                    
                    for (let j = 0; j < selectedCols; j++) {
                      const th = editor.createInside.element('th');
                      th.style.padding = '0.5rem 1rem';
                      th.style.backgroundColor = '#159957';
                      th.style.color = 'white';
                      th.style.borderBottom = '1px solid #e9ebec';
                      th.style.textAlign = 'left';
                      th.innerHTML = 'Nuevo párrafo';
                      
                      // Add click and blur event listeners to header cells
                      th.addEventListener('click', () => handleCellClick(th));
                      th.addEventListener('blur', () => handleCellBlur(th));
                      
                      headerRow.appendChild(th);
                    }
                    thead.appendChild(headerRow);
                    table.appendChild(thead);
            
                    // Create table body
                    const tbody = editor.createInside.element('tbody');
                    for (let i = 1; i < selectedRows; i++) {
                      const row = editor.createInside.element('tr');
                      if (i % 2 !== 0) {
                        row.style.backgroundColor = '#f2f2f2';
                      }
                      
                      for (let j = 0; j < selectedCols; j++) {
                        const td = editor.createInside.element('td');
                        td.style.padding = '0.5rem 1rem';
                        td.style.borderBottom = '1px solid #e9ebec';
                        td.style.textAlign = 'left';
                        td.innerHTML = 'Nuevo párrafo';
                        
                        // Add click and blur event listeners to body cells
                        td.addEventListener('click', () => handleCellClick(td));
                        td.addEventListener('blur', () => handleCellBlur(td));
                        
                        row.appendChild(td);
                      }
                      tbody.appendChild(row);
                    }
                    table.appendChild(tbody);
            
                    editor.selection.insertNode(table);
                    close();
                  }
                }
            
                // Handle hover effect
                gridContainer.addEventListener('mouseover', (e) => {
                  const cell = e.target;
                  if (cell.classList.contains('grid-cell')) {
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    updateGridSelection(row, col);
                  }
                });
            
                // Handle click on cells
                gridContainer.addEventListener('click', (e) => {
                  const cell = e.target;
                  if (cell.classList.contains('grid-cell')) {
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    updateGridSelection(row, col);
                    insertTable();
                  }
                });
            
                // Reset on mouse leave if no selection made
                gridContainer.addEventListener('mouseleave', () => {
                  if (!selectedRows && !selectedCols) {
                    const cells = gridContainer.querySelectorAll('.grid-cell');
                    cells.forEach(c => c.style.background = 'white');
                    sizeDisplay.textContent = 'Table size: 0 x 0';
                    insertBtn.disabled = true;
                  }
                });
            
                // Handle insert button click
                insertBtn.addEventListener('click', insertTable);
                cancelBtn.addEventListener('click', close);
            
                return form;
              }
            },
            // "table",
            
            {
              name: "addDividedBlock",
              tooltip: "Divide en columnas",
              icon: `<svg viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 160 0 0-256L64 160zm384 0l-160 0 0 256 160 0 0-256z"/></svg>`,

              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  // Create a container div with flex display
                  const container = document.createElement("div");
                  const subcontainer1 = document.createElement("div");
                  const subcontainer2 = document.createElement("div");
                  container.style.display = "flex";
                  container.style.padding = "0";
                  container.style.margin = "0";

                  // Style and clone existing editor content
                  const clonedEditorContent = editorContent.cloneNode(true);

                  // Create a new div element
                  const newDiv = document.createElement("div");
                  newDiv.innerText = "Nuevo párrafo";

                  subcontainer1.appendChild(clonedEditorContent);
                  subcontainer2.appendChild(newDiv);

                  container.appendChild(subcontainer1);
                  container.appendChild(subcontainer2);

                  // Calculate width for each child element
                  const childCount = container.children.length;
                  const childWidth = `${100 / childCount}%`;

                  // Apply calculated width to each child element
                  Array.from(container.children).forEach((child) => {
                    child.style.flex = `1 0 ${childWidth}`;
                    child.style.padding = "0";
                    child.style.margin = "0";
                  });

                  // Replace original editorContent's parent node with the container
                  editorContent.parentNode.replaceChild(container, editorContent);

                  // Remove the original editorContent
                  clonedEditorContent.insertAdjacentElement(
                    "beforebegin",
                    editorContent
                  );
                  clonedEditorContent.remove();

                  // Create and dispatch a click event on the new div
                  const clickEvent = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: false,
                  });
                  newDiv.dispatchEvent(clickEvent);
                }
              },
            },
            // move selected block up
            {
              name: "blockUp",
              tooltip: "Mueve bloque arriba",
              icon: "arrowup",
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  try {
                    const previousElement = editorContent.previousElementSibling;
                    if (previousElement) {
                      editorContent.parentNode.insertBefore(
                        editorContent,
                        previousElement
                      );
                    } else {
                      const previousSection =
                        editorContent.parentNode.previousElementSibling;
                      const divElements = Array.from(
                        previousSection.getElementsByTagName("div")
                      );
                      const lastDivOfPreviousSection =
                        divElements[divElements.length - 1];
                      previousSection.insertBefore(
                        editorContent,
                        lastDivOfPreviousSection
                      );
                    }
                  } catch {
                    alert("can not move");
                  }
                }
              },
            },
            // move selected block down
            {
              name: "blockDown",
              tooltip: "Mueve bloque abajo",
              icon: "arrowdown",
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  try {
                    const nextElement = editorContent.nextElementSibling;
                    if (nextElement) {
                      editorContent.parentNode.insertBefore(
                        nextElement,
                        editorContent
                      );
                    } else {
                      const nextSection =
                        editorContent.parentNode.nextElementSibling;
                      const firstDivOfNextSection = Array.from(
                        nextSection.getElementsByTagName("div")
                      )[0];
                      nextSection.insertBefore(
                        editorContent,
                        firstDivOfNextSection
                      );
                    }
                  } catch {
                    alert("Can't move");
                  }
                }
              },
            },
            // delete block button
            {
              name: "deleteBlock",
              tooltip: "Borrar bloque",
              icon: "bin",
              exec: (editor) => {
                const element = parser(editor.value) 
                // console.log("🚀 ~ import ~ element:", element)

                console.log("🚀 ~ import ~ editorContent:", editorContent) 
                if (!editorContent) {
                  console.log("🚀 ~ import ~ !editorContent:", !editorContent)
                  return;
                }
                
                setDeleteContent(element)

                let hasTable
                
                const column = editorContent.querySelector('td') ;
                const row = editorContent.querySelector('tr') ;
                const table = editorContent.querySelector('table') ;
                hasTable = table || row || column;
                console.log("🚀 ~ import ~ hasTable:", hasTable)
                
                const hasImage = editorContent.querySelector('img') || editorContent.querySelector('figure')
                
                if (hasImage) { 
                  setIsImageDialogOpen(true);
                } 
                else if (hasTable) { 
                  setIsTableDialogOpen(true);
                }
                else {
                   
                  const currentElement = editor.editor.querySelector('[data-content-id]');
                  
                  console.log("Current element:", currentElement);
                  if(currentElement){
                    moveToUpperBlock(currentElement,element)
                  }
                  else{
                    // console.log("🚀 ~ import ~ editor.editor:", editor.editor)
                    // console.log("🚀 ~ import ~ editorContent:", editorContent)
                    // console.log("🚀 ~ import ~ element:", element)
                    // const currentElement = editorContent.querySelector('[data-content-id]');
                    // console.log("🚀 ~ import ~ currentElement:", currentElement)

                    let previousSibling = editorContent.previousElementSibling;

                    if (previousSibling) {
                      console.log("Element above (previous sibling):", previousSibling);
                    
                      // Dispatch a click event on the previous sibling
                      const clickEvent = new MouseEvent("click", {
                        bubbles: true, // Ensures the event bubbles up through the DOM
                        cancelable: true, // Allows the event to be canceled
                        view: window // Specifies the view in which the event was generated
                      }); 
                      deleteBlock(element)
                      previousSibling.dispatchEvent(clickEvent);
                      console.log("Click event dispatched on the element above.");
                    }
                    // moveToUpperBlock(element,element)
                    // deleteBlock(element)
                    // editor.value = "";
                  }

            
                }  
              },
            },
            "|",
            ,
            // AI assistant
            {
              name: "aiAssistant",
              tooltip: "Asistente AI",
              icon: "ai_assistant",
              exec: (editor) => {
                if (editor.value) {
                  setAiButton(true)
                  const sectionCheck = async () => {
                    setModel("Processing...");
                    axios
                      .post(
                        `${process.env.NEXT_PUBLIC_WINDOWS_SERVER_URL}/sectionCheck`,
                        null,
                        {
                          params: {
                            content: String(editor.value),
                            title: section,
                          },
                        }
                      )
                      .then(function (response) {
                        setImprovedText(response["data"].improvedText);
                      })
                      .catch(function (error) {
                        setImprovedText(String(error));
                      });
                  };
                  sectionCheck();
                }
              },
            },
            "|",
            {
              name: "math equation",
              tooltip: "Ecuaciones Matemáticas",
              icon: "math",
              exec: (editor) => {
                const element = editor.value
                // console.log('math editor:', element)
                document.getElementById("editorIcon")?.click();
              },
            },
            {
              name: "chemistry equation",
              tooltip: "Ecuaciones Químicas",
              icon: "chemistry",
              exec: (editor) => {
                document.getElementById("chemistryIcon")?.click();
              },
            },
            "|",
            // insert check button
            {
              name: "insertCheck",
              tooltip: "Aplicar Cambios",
              icon: "greenCheck",
              exec: (editor) => {
                try {
                  const element = parser(editor.value) 
                  console.log('element main=>',element) 
                  element.querySelectorAll('br').forEach(br => br.remove());

                  setIsChanged(false)


                  let content = editor.value;
                  
                  // Create a temporary div to parse the HTML
                  const tempDiv = document.createElement('div'); 
                  const formattedElements = tempDiv.querySelectorAll('[data-editor-only]'); 
                  formattedElements.forEach(el => { 
                    el.removeAttribute('data-editor-only'); 
                    if (el.tagName === 'H2') {
                      el.className = 'title-1';
                    } else if (el.tagName === 'H3') {
                      el.className = 'title-2';
                    } else if (el.tagName === 'H4') {
                      el.className = 'title-3';
                    } else if (el.tagName === 'BLOCKQUOTE') {
                      el.className = 'text-box';
                    }
                  }); 
                  const iframe = document.getElementById("documentWindow");
                  if (iframe && iframe.contentWindow) {
                    // Determine which content to use: editorContent or element
                    const referenceElement = editorContent && editorContent.innerHTML === "Nuevo párrafo" ? editorContent : element;
                    // const referenceElement = element;
                  
                    const targetElement = iframe.contentWindow.document.querySelector(
                      `[data-content-id="${referenceElement.getAttribute('data-content-id')}"]`
                    );
                    console.log('targetElement - apply:',targetElement)
                    console.log('editorContent - apply:',editorContent)

                    const newElement = targetElement ?? editorContent
                    if (newElement) {

                      console.log("🚀 ~ import ~ newElement:", newElement,newElement.innerHTML)
                      const parsedContent = parser(content);
                      newElement.innerHTML = parsedContent.innerHTML;
                      
                      // console.log('content:',content)
                      console.log('newElement:',newElement)

                      const imgTag = newElement.querySelector('img');
                      // console.log('imgTag:',imgTag)
                      
                      // console.log('target exists')
                      
                      if (imgTag && !imgTag.classList.contains('Wirisformula')) {
                        console.log('image tag exists')
                        // Center the <img> tag
                        imgTag.style.display = 'block'; // Make it a block-level element
                        imgTag.style.margin = '0 auto'; // Center it horizontally within its container
                    
                        // Center the content of newElement
                        newElement.style.display = 'flex'; // Enable flexbox
                        newElement.style.justifyContent = 'center'; // Horizontally center contents
                        newElement.style.alignItems = 'center'; // Vertically center contents
                        newElement.style.height = '100%'; // Occupy full height of the parent container
                        newElement.style.flexDirection = 'column'; // Stack contents vertically (if needed)
                        
                        // console.log('Updated imgTag styles:', imgTag.style.cssText);
                        // console.log('Updated newElement styles:', newElement.style.cssText);
                      }
                      
                      // console.log('newElement:', newElement);
                      
                      newElement.querySelectorAll('br').forEach(br => br.remove());
                      console.log("🚀 ~ import ~ content:", content)
                  
                      setChangedContent(content);
                      setEditorContent(newElement);
                      setPendingChanges(false);
                      setIsChanged(false);
                    }
                  }
                  
                } catch (error) {
                  console.error("Error applying changes:", error);
                }
              }
            },
          ],
          events: {
            beforeCommand: (command) => {
              if (command === 'enter') {
                const selection = editor.current?.selection;
                if (selection) {
                  const currentBlock = selection.current();
                  if (currentBlock) {
                    const alignment = window.getComputedStyle(currentBlock).textAlign;
                    setTimeout(() => {
                      const newBlock = selection.current();
                      if (newBlock) {
                        newBlock.style.textAlign = alignment;
                      }
                    }, 0);
                  }
                }
              }
            },
            afterInit: (editor) => {
              if (editor.editor) {
                editor.editor.style.textAlign = 'left';
              }
            },
            change: (newContent, event) => {
              if (event && event.type === 'keydown') {
                setModel(newContent);
              } else {
                setModel(newContent);
              }
            },
            focus: () => {},
            blur: () => {}
          },
          processSVG: (svg) => {
            return svg;
          },
          defaultStyle: {
            // Remove text alignment from default style
          },
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
        });

        const img = editorContent?.querySelector("img");
        if (img) {
          const updatedConfig = { ...config }; 
          const hasImageButtons = updatedConfig.extraButtons?.some(
            button => button.name === "img_increase" || button.name === "img_decrease"
          );
  
          updatedConfig.extraButtons = (updatedConfig.extraButtons || []).filter(
            button => button.name !== "text_left" && button.name !== "text_right" && button.name !== "img_increase" && button.name !== "img_decrease"
          );

          updatedConfig.extraButtons = (updatedConfig.extraButtons || []).concat([
              {
                name: "img_increase",
                tooltip: "Aumentar",
                icon: "angle-up",
                exec: () => {
                  const img = editorContent.querySelector("img");
                  if (img) {
                    if (img?.style.width) {
                      const img_width = parseInt(img.style.width);
                      if (img_width <= 100) {
                        img.style.width = `${img_width + 5}%`;
                      }
                    } else {
                      img.style.width = "85%";
                    }
                  }
                },
              },
              {
                name: "img_decrease",
                tooltip: "Reducir",
                icon: "angle-down",
                exec: () => {
                  const img = editorContent.querySelector("img");
                  if (img) {
                    if (img?.style.width) {
                      const img_width = parseInt(img.style.width);
                      if (img_width >= 50) {
                        img.style.width = `${img_width - 5}%`;
                      }
                    } else {
                      img.style.width = "75%";
                    }
                  }
                },
              },
            ]);
            setConfig(updatedConfig); 
        }

        // const footnote = document.createElement("div");
        // footnote.style.cssText =
        //   "font-size: 0.9rem; text-align: justify; display: block; padding: 0px; margin: 0px !important; background: rgb(220, 252, 231); border: none; cursor: pointer;";
    
        // const targetStyle = footnote.style.cssText;
        // console.log('editorContent start:',editorContent)
        if (editorContent) {
          const textStyle = editorContent.style.cssText
          const isFootnote = matchStyles(textStyle) 
          
          if(isFootnote){
            const updatedConfig = { ...config };
            // console.log('updatedConfig:', updatedConfig);
          
            // Remove existing "text_left" and "text_right" buttons if they exist
            updatedConfig.extraButtons = (updatedConfig.extraButtons || []).filter(
              button => button.name !== "text_left" && button.name !== "text_right" && button.name !== "img_increase" && button.name !== "img_decrease"
            );
          
            // Concatenate new buttons
            updatedConfig.extraButtons = updatedConfig.extraButtons.concat([
              {
                name: "text_left",
                tooltip: "izquierda",
                icon: "angle-left",
                exec: () => {
                  const currentMargin = parseInt(editorContent.style.marginLeft || "0", 10);
                  editorContent.style.marginLeft = `${currentMargin - 10}px`; // Decrement margin
                },
              },
              {
                name: "text_right",
                tooltip: "derecha",
                icon: "angle-right",
                exec: () => {
                  const currentMargin = parseInt(editorContent.style.marginLeft || "0", 10);
                  editorContent.style.marginLeft = `${currentMargin + 10}px`; // Increment margin  
                  // console.log('editorContent right:', editorContent);
                },
              },
            ]);
          
            setConfig(updatedConfig);  
          }
        }
         



        // // If selected block is Footnote, add block size increase and decrease button
        // console.log('editorContent',editorContent)
        // if (editorContent?.classList) {
        //   const calssList = Array.from(editorContent?.classList);
        //   if (calssList.includes("footnote")) {
        //     const updatedConfig = { ...config };
        //     updatedConfig.extraButtons = (
        //       updatedConfig.extraButtons || []
        //     ).concat([
        //       {
        //         name: "block_increase",
        //         tooltip: "Aumentar",
        //         icon: "angle-up",
        //         exec: () => {
        //           const padding = parseInt(
        //             editorContent.style.padding?.split(" ")[1]
        //           );
        //           if (padding && padding > 5) {
        //             editorContent.style.setProperty(
        //               "padding",
        //               `0px ${padding - 5}px`,
        //               "important"
        //             );
        //           } else {
        //             editorContent.style.setProperty(
        //               "padding",
        //               `0px 5px`,
        //               "important"
        //             );
        //           }
        //         },
        //       },
        //       {
        //         name: "block_decrease",
        //         tooltip: "Reducir",
        //         icon: "angle-down",
        //         exec: () => {
        //           const padding = parseInt(
        //             editorContent.style.padding?.split(" ")[1]
        //           );
        //           if (padding && padding < 200) {
        //             editorContent.style.setProperty(
        //               "padding",
        //               `10px ${padding + 5}px`,
        //               "important"
        //             );
        //           } else {
        //             editorContent.style.setProperty(
        //               "padding",
        //               `10px 15px`,
        //               "important"
        //             );
        //           }
        //         },
        //       },
        //     ]);
        //     setConfig(updatedConfig);
        //   }
        // }

        // add custom button by Jodit method
        // create custom paragraph type button

        module.Jodit.defaultOptions.controls.customParagraph = {
          tooltip: "Selecciona el formato del texto",
          icon: "paragraph",
          list: [
            "Título 1",
            "Título 2",
            "Título 3",
            "Cuerpo",
            "Texto recuadro",
            "Título de Tabla/Figura",
            "Nota de Tabla/Figura",
            "Fórmula centrada",
          ],
          childTemplate: (editor, key, value) =>
            `<span class="${key}">${editor.i18n(value)}</span>`,
          exec(editor, _, { control }) {
            let value = control.args && control.args[0];
            if (editorContent) {
              
              let tempElement;
              const element = parser(editor.value)
              console.log('element - format:', element)
              const thead = element.querySelector("thead");
              const tbody = element.querySelector("tbody");  
              if(tbody || thead){
                return
              }

              console.log("🚀 ~ exec ~ element.querySelector('mjx-container') :", element.querySelector('mjx-container') )
              if (element.querySelector('mjx-container') && value!="Fórmula centrada") {
                // console.log('The element contains the "math-block" class.');
                return
              } 
              // else {
              //   console.log('The element does not contain the "math-block" class.');
              // }
              
              if (value == "Título 1") {
                const tempElement = document.createElement("h2");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                tempElement.innerHTML = tempElement.innerHTML.toUpperCase(); // Convert to uppercase
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Título 2") {
                const tempElement = document.createElement("h3");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Título 3") {
                const tempElement = document.createElement("h4");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Cuerpo") {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Texto recuadro") {
                const tempElement = document.createElement("blockquote");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Título de Tabla/Figura") {
                const tempElement = document.createElement("div");
                tempElement.style.cssText = "text-align: center;";
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);

                console.log('tempElement:',tempElement)
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Nota de Tabla/Figura") {
                const tempElement = document.createElement("div");
                tempElement.style.cssText = "font-size: 0.9rem; text-align: justify; display: block; padding: 0px; margin: 0px !important; background: rgb(220, 252, 231); border: none; cursor: pointer;";
                // tempElement.classList.add("footnote");
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              } else if (value == "Fórmula centrada") {
                const tempElement = document.createElement("div");
                tempElement.style.cssText = "text-align: center;";
                tempElement.innerHTML = element.innerHTML || ""; // Use editorContent
                editorContent.parentNode.replaceChild(tempElement, editorContent);
                setEditorContent(tempElement);

                setIsFormatUpdated(true)
                isUpdated=true
              }
              
              
              if (tempElement) {
                // console.log('tempElement:',tempElement)
                editor.value = tempElement.outerHTML;
                setPendingChanges(true);
              }
            }
            // if (editorContent) {
            //   let tempElement;
            //   switch(value) {
            //     case "Título 1":
            //       tempElement = document.createElement("h2");
            //       tempElement.innerHTML = editorContent.innerHTML.toUpperCase();
            //       break;
            //     case "Título 2":
            //       tempElement = document.createElement("h3");
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Título 3":
            //       tempElement = document.createElement("h4");
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Cuerpo":
            //       tempElement = document.createElement("div");
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Texto recuadro":
            //       tempElement = document.createElement("blockquote");
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Título de Tabla/Figura":
            //       tempElement = document.createElement("div");
            //       tempElement.style.cssText = "text-align: center;";
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Nota de Tabla/Figura":
            //       tempElement = document.createElement("div");
            //       tempElement.style.cssText = "font-size: 0.9rem; text-align: justify;";
            //       tempElement.classList.add("footnote");
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //     case "Fórmula centrada":
            //       tempElement = document.createElement("div");
            //       tempElement.style.cssText = "text-align: center;";
            //       tempElement.innerHTML = editorContent.innerHTML;
            //       break;
            //   }
            //   if (tempElement) {
            //     editor.value = tempElement.outerHTML;
            //     setPendingChanges(true);
            //   }
            // }
          },
        };
        // Create insert tooltip button
        module.Jodit.defaultOptions.controls.insertTooltip = {
          tooltip: "Insertar Nota",
          icon: "tooltip",
          popup: (editor, current, self, close) => {
            const selectedText = window.getSelection()?.toString();
            const form = editor.create.fromHTML(
              `<form  class="bg-white m-0">
                  <input type="text" class="shadow appearance-none border rounded text-gray-700 focus:outline-none "/>
                  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline">Insert</button>
              </form>`
            );
            editor.e.on(form, "submit", (e) => {
              e.preventDefault();
              const tooltipText = form.querySelector("input").value;
              var tooltipHTML =
                selectedText +
                '<sup class="custom-tooltip" style="color: #00ccff" title="' +
                tooltipText +
                '">[auto]</span>';
              editor.s.insertHTML(tooltipHTML);
            });

            return form;
          },
        };
      } else {
      }
    }).catch(error => {
    });
  }, [editorContent]);

  useEffect(() => {
    if (editorContent) {
      // console.log('editorContent - main:',editorContent)

      let content = editorContent.outerHTML;
      // console.log('editorContent.outerHTML =>', editorContent)
      let contentChange = content.replace(/border:\s*\d+(\.\d+)?px\s*solid\s*red;/g, "")
      // console.log('contentChange:',contentChange)
      // replace("2.5px solid red", "");
      if(!contentChange.includes("2.5px solid red")){
        setModel(contentChange);
        setChangedContent(editorContent.outerHTML);
      }
    } else {
      setModel("");        
      setChangedContent("");
    }
    try {
      const sectionTitleElement =
        editorContent.parentNode.getElementsByTagName("h2")[0];
      if (sectionTitleElement?.id !== "title") {
        setSection(sectionTitleElement.textContent);
      }
    } catch (e) {
      // console.log("Please select the correct section");
    }
  }, [editorContent]);

  useEffect(() => {
    setModel(improvedText);
  }, [improvedText]);
 

  function processImageTag(element) {
    // Early return if no element provided
    if (!element) {
      console.warn("No element provided to processImageTag");
      return null;
    }
  
    // Get image element - handle both direct img elements and containers with img children
    const img = element.tagName.toLowerCase() === 'img' ? element : element.querySelector("img");
    
    if (!img) {
      console.warn("No image element found");
      return null;
    }
  
    const src = img.src;
    
    // Early return if no src
    if (!src) {
      console.warn("Image has no src attribute");
      return null;
    }
  
    // Check if src is already a blob URL
    if (src.startsWith('blob:')) {
      console.log("Image is already using a blob URL");
      return src;
    }
  
    // Check if src is base64
    if (!src.startsWith('data:image/')) {
      console.warn("Image src is not a base64 string");
      return null;
    }

    if (src.startsWith('data:image/')) {
      console.warn("Image src is not a base64 string");
      return src;
    }
  
    // try {
    //   // Split the base64 string to get mime type and data
    //   const [mimeTypeSection, base64Data] = src.split(',');
    //   const mimeType = mimeTypeSection.split(':')[1].split(';')[0];
  
    //   // Convert base64 to blob more efficiently
    //   const byteString = atob(base64Data);
    //   const uint8Array = new Uint8Array(byteString.length);
      
    //   for (let i = 0; i < byteString.length; i++) {
    //     uint8Array[i] = byteString.charCodeAt(i);
    //   }
  
    //   const blob = new Blob([uint8Array], { type: mimeType });
    //   const blobURL = URL.createObjectURL(blob);
  
    //   // Update the image src to use the blob URL
    //   img.src = blobURL;
  
    //   // Set up cleanup when image is no longer needed
    //   img.onload = () => {
    //     // Only revoke the old blob URL if it exists
    //     if (src.startsWith('blob:')) {
    //       URL.revokeObjectURL(src);
    //     }
    //   };
  
    //   return blobURL;
    // } catch (error) {
    //   console.error("Error processing image:", error);
    //   return null;
    // }
  }

  // useEffect(() => {
  //   if(model && editorContent && model.length > 0 && model!=editorContent.outerHTML){
  //     console.log('model:',model)
  //     console.log('parser(model):',parser(model))
  //     const modelElement = parser(model)
  //     const img = modelElement.tagName.toLowerCase() === 'img' ? modelElement : modelElement.querySelector("img");
  //     if(!img){
  //       return
  //     }
  //     // console.log('processImageTag(parser(model)):',processImageTag(modelElement))
  //     const blob = processImageTag(modelElement)
  //     if(blob){
  //       const imgElement = document.createElement("img");
  //       // Set the Blob URL as the src of the <img> element
  //       imgElement.src = blob;
  //       console.log("🚀 ~ useEffect ~ imgElement:", imgElement.outerHTML)
  //       // setEditorContent(imgElement)
  //       // setModel('imgElement.outerHTML')
  //     }
  //   }
  // }, [model]);


  // useEffect(() => {
  //   console.log('model:',model)
  //   console.log('editorValue:',editorValue)
  //   console.log('editorContent:',editorContent)
  // }, [model,editorContent,editorValue]);

  // useEffect(() => {
  //   console.log('aiButton:',aiButton)
  // }, [aiButton]);

  // useEffect(() => {
    // console.log('isChanged:',isChanged)
    // if(isChanged){
    //   setIsChanged(false)
    // }
  // }, [isChanged]);


  useEffect(() => { 
    // console.log('element - model:',model)
    let contentChangeModel = model.replace(/border:\s*\d+(\.\d+)?px\s*solid\s*red;/g, "");
    // setEditorValue(model)
    const element = parser(model);
    // console.log('model changed', model);
    setIsChanged(true)
    // console.log('element', element);
    if (model !== '' && element && !contentChangeModel.includes("2.5px solid red")) {
      if (element.innerHTML !== "Nuevo párrafo") {
        if (aiButton) {
          setEditorValue(contentChangeModel);
          if (element.innerHTML && element.innerHTML !== 'Processing...') {
            // console.log('element.innerHTML=>', element.innerHTML);
            setAiButton(false);
          }
        }
      }
    } 
  }, [model]);

  const confirmDelete = () => {
    console.log('deleteContent:',deleteContent)
    moveToUpperBlock(deleteContent,deleteContent)
    // deleteBlock(deleteContent); 
    setIsImageDialogOpen(false); 
    setIsTableDialogOpen(false); 

  };

  const cancelDelete = () => {
    console.log('deleteContent:',deleteContent)
    setIsImageDialogOpen(false);
    setIsTableDialogOpen(false);  
  };


  const handleModelChange = useCallback((newContent) => {
    // Optimize model change handler with debouncing
    const joditInstance = editor.current?.jodit;
    if (!joditInstance) return;

    // Store current cursor position
    const selection = joditInstance.selection.save();

    // Only update editor value, not the actual content
    console.log("🚀 ~ handleModelChange ~ newContent:", newContent)
    setEditorValue(newContent);
    if (model !== newContent) { 
      setModel(newContent);
      setPendingChanges(true);
      
      // Restore cursor position immediately
      joditInstance.selection.restore(selection);
    }
  }, [model]);
    
  // Update config settings for better performance
  useEffect(() => {
    // ... existing config setup code ...

    setConfig({
      // ... existing config options ...
      
      // Add these performance optimizations
      observer: {
        timeout: 100  // Reduced from 300
      },
      height: 500, // Increased from 1000 to 1200
      useAceEditor: false, // Disable ACE editor
      beautifyHTML: false, // Disable HTML beautification
      defaultActionOnPaste: "insert_only_text",
      processPasteHTML: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      
      // Optimize events
      events: {
        ...config?.events,
        change: (newContent, event) => {
          if (event?.type === 'keydown') {
            requestAnimationFrame(() => {
              setModel(newContent);
            });
          } else {
            setModel(newContent);
          }
        },
        beforeCommand: function(command) {
          // Store selection before command
          const selection = this.selection.save();
          setTimeout(() => {
            this.selection.restore(selection);
          }, 0);
        }
      },
      
      // Disable unused features
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      
      // Optimize toolbar
      toolbarSticky: false,
      toolbarAdaptive: false
    });

  }, [editorContent]);


  useEffect(() => {
    const formulaElement = document.querySelector('.Wirisformula');
    
    if (formulaElement) {
      if (formulaElement.parentNode.tagName.toLowerCase() !== 'span') {
        const span = document.createElement('span');
        
        span.innerHTML = formulaElement.outerHTML; 
        span.style.display = 'inline-flex'; 
        span.style.alignItems = 'center'; 
        span.style.gap = '4px'; 

        formulaElement.parentNode.replaceChild(span, formulaElement);
        
        const parentDiv = span.closest('div'); // Finds the closest parent div
        
        // console.log("🚀 ~ useEffect ~ span:", span);
        // console.log("🚀 ~ useEffect ~ formulaElement:", formulaElement);
        // console.log("🚀 ~ useEffect ~ parentDiv:", parentDiv);
        
        if (parentDiv) {
          const parentDivString = parentDiv.outerHTML; // Get the outerHTML of the parentDiv
          console.log("🚀 ~ useEffect ~ parentDivString:", parentDivString)
          setModel(parentDivString); // Set the model to the string representation
        }
      } else {
        console.log("The Wirisformula element is already wrapped in a span.");
      }
    }
  }, [model]);
  
  

  useEffect(() => {
    if (editor.current) {
      const editorfield = Array.from(
        document.getElementsByClassName("jodit-wysiwyg")
      )[0];
    
      if (typeof window !== "undefined" && window.WirisPlugin && editorfield) {
        // Define generic integration properties
        const genericIntegrationProperties = {
          target: editorfield,
          toolbar: document.getElementById("mathtoolbar"),
          imageFormat: "svg",
          saveMode: "xml",
          editMode: "default",
          enableAccessibility: true,
          wirisEditorParameters: {
            fontFamily: "Arial",
            lineColor: "#606C71",
            fontSize: "24px",
            color: "#606C71",
            backgroundColor: "#606C71",
          },
          integrationParameters: {
            allowResize: false,
            enableAutoAlign: true,
            formulaAttributes: {
              style: "color: #606c71; display: inline; vertical-align: middle;",
              "data-mathml-style": "color: #606c71",
            },
          },
          imageAttributes: {
            style: "display: inline; vertical-align: middle; color: #606c71;",
            "data-custom-color": "#606c71",
          },
          editorParameters: {
            color: "#606c71",
            defaultStroke: "#606c71",
          },
        };
    
        // Create the Wiris integration instance
        const genericIntegrationInstance =
          new window.WirisPlugin.GenericIntegration(
            genericIntegrationProperties
          );
          editorfield.addEventListener("click", () => {
          if (!window.WirisPlugin.currentInstance) {
            window.WirisPlugin.currentInstance = genericIntegrationInstance;
          }
        });
          
        genericIntegrationInstance.init();

        genericIntegrationInstance.listeners.fire("onTargetReady", {});



        window.WirisPlugin.currentInstance = genericIntegrationInstance;
       }
    }
    
  }, [editor.current]);

  // Initialize editor value when component mounts
  useEffect(() => {
    if (editorContent) {
      // console.log("🚀 ~ useEffect ~ editorContent:", editorContent)
      const contentId = editorContent.getAttribute('data-content-id') || `content-${Date.now()}`;
      editorContent.setAttribute('data-content-id', contentId);
      
      const initialContent = editorContent.outerHTML;
      // console.log("editorContent:",editorContent)
      if(editorContent.innerHTML != 'Nuevo párrafo'){
        const changedContent = initialContent.replace(/border:\s*\d+(\.\d+)?px\s*solid\s*red;/g, "");
        // console.log("🚀 ~ useEffect ~ changedContent:", changedContent)
        const img = editorContent.querySelector("img");
        if(img){
          console.log('IMAGE')
          // setClicked(editorContent)
          // clickedDiv=editorContent
          const parent = img.parentElement;
          if (parent) {
            parent.style.display = 'flex';
            parent.style.justifyContent = 'center';
            parent.style.alignItems = 'center';
            parent.style.flexDirection = 'column';
            // console.log("🚀 ~ useEffect ~ parent:", parent)
            // setEditorValue(parent);
            // setModel(parent);
            // setPendingChanges(false);
          }
        }
        // else{
          setEditorValue(changedContent);
          setModel(changedContent);
          setPendingChanges(false);
        // }
      }
      else{
        setEditorValue('');
        setModel('');
        setPendingChanges(false);
      }
    }
  }, [editorContent]);

  return (
    <div className="w-full px-1">
      <Toaster position="top-center" />

      <div id="mathtoolbar" className="hidden"></div>
      <div className="flex justify-between">
        <span className="font-semibold text-[25px]">{section}</span>
      </div>
      <div className="w-full mt-1 h-[70%]">
        {isBrowser && (
          <>
            <JoditEditor
              ref={editor}
              value={editorValue}
              config={config}
              onChange={handleModelChange}
              tabIndex={1}
              className="w-full h-[200%]"
            />
          </>
        )}
      </div>
      <ConfirmationDialog
         isOpen={isImageDialogOpen}
         onClose={cancelDelete}
         onConfirm={confirmDelete}
         message="Si borras este bloque no podrás deshacer la acción ni recuperar la imagen, a no ser que la importes manualmente. ¿Deseas continuar?"
       />
       <ConfirmationDialog
         isOpen={isTableDialogOpen}
         onClose={cancelDelete}
         onConfirm={confirmDelete}
         message="Si borras este bloque no podras deshacer la acción ni recuperar la tabla, a no ser que la reconstruyas manualmente. ¿Deseas continuar?"
       />
    </div>
  );
};

export default Editor;


