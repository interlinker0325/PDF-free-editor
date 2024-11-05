import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

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
  const editor = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [model, setModel] = useState("");
  const [config, setConfig] = useState(null);

  const [improvedText, setImprovedText] = useState("");

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
        const safeIconSet = (name, src) => {
          if (typeof src === 'string') {
            module.Jodit.modules.Icon.set(name, `<img src="${src}"/>`);
          }
        };

        safeIconSet("greenCheck", "https://img.icons8.com/?size=100&id=Zy5ghkQj2rKy&format=png&color=000000");
        safeIconSet("tooltip", "https://cdn0.iconfinder.com/data/icons/leading-international-corporate-website-app-collec/16/Info-512.png");
        safeIconSet("math", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVDiNxY+xSgNBFEXPG7KEBW38Ab8gzU61naQSQbAR/Atb7QRRSeMfWKYxFkoKG60UtnDzEG1stbOxNCQL+6wWliU7BiycaoZ77+EM/PeRtsB73wPGwHpLZQocuwD8MDAGiIGDhQZpmsbz+fwTWA0AAIYd7/0OsA+MJ5PJOcBsNtsUkWpcAH0zmzbG36r61gEugDVgI0mSJ1V9EJHdqiUi93meP7YpOOCjVj5K0zQGtmudUegPzszOau9+URSnwEqlH0XRdQgggPPePwO9Zmhmt6q6FTQASjM7acmD+hUAVR0BL42s6Ha7N0sBFlmY2V2WZV/LAlDVK+C1ll3+Ngbo1O5lWZZ7zrmBiLwDw2UAfz4/dNtaTXH2UcAAAAAASUVORK5CYII=");
        safeIconSet("chemistry", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGPSURBVDiN1ZKxa1NRFMZ/5yY1COYPKFiEiNpBHe55SQiZdFBEHAQHQZwchapLodClCEKhi4Pg6KaSzamCQnDJEMiTDqIoGXTRRcHFR+K7x8G8cHkNdfabDt8558flu0c4QM1mc8XMboUQPo5Go6dAKM/IosVOp3N4MpmsAZvAkZn9NoRwJ03TNwcCkiS5ZmY7wLEFbDOz55VK5d5wOPwKUC06rVbrZJ7nj83sXGnpM7AMLAEiItdDCKeBMwCumMrz/AUQL/80s/Usy04AZ0VkN+qtFLvVyDwV1U+ccxvFM4H3wCVVvQxcdc49YxboPANVtaJuNBrVXq+XL8hgn9y/R/5LwHg8vquqS2VfVY+r6lqSJPPAY8C3qN4B9rz3FwG63W7de78NvAMemtkrZh8wB4QQbgBfIsiqiOyq6sssyz6IyDpwaNar7AOkafoaWAXuA78i0AX+XmKhPTO7QvkOYrXb7aPT6fSBiNyM7B/AVr1ef9Tv938X5kJAIe/9eefc7RDCp1qttj0YDL6XZ/4A/MWDnkkEniQAAAAASUVORK5CYII=");
        safeIconSet("rightarrow", "https://cdn-icons-png.flaticon.com/256/724/724954.png");
        safeIconSet("arrowup", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8AAADg4OClpaWSkpIPDw/Y2NjHx8caGhorKyswMDCVlZXc3Nzv7++3t7cdHR3m5ubS0tJ8fHyFhYWrq6txcXEkJCS+vr4+Pj45OTlMTExSUlJaWlpHR0cICAj19fVlZWWaRJuaAAADY0lEQVR4nO3c6XqiUAwG4OhUUCr7oq21ev9XOVJtB+EsyVk7z5P8DvD6gQgSBeDi+o21L/pTWZ6aYh9b8lN5O6weNbR5bM290tVTHWJ7xupWs3qNLQL4MzetVi+/0BRdJTRFVklMUY8rqSliVgpTtKyUpkhZaUxRVFpTBBXCFFyFMgVWIU1BVWhTQBXBFExFMgVSEU1BVGRTAJWBybvKyORZZWjyqjI2ebySsTB5y8rK5CkrS5OXrKxNHrJyYHKelROTY5Ujk1OVM5NDlUOTM5VTkyOVY5MTlXOTg/OVB5N1Vl5Mlll5Mlll5c1kkZVHk3FWXk2GKs8mI5V3k4EqgImsCmIiqgKZSKpgJoIqoAmtCmpCqgKbUKrgJoQqgkmrimLSqCKZlFcy0UyKrCKapFlFNUmyimwSqqKbBCqqaeOsSa6imobFMImoukHfI1dRTWVSYdqqpDRXUU3bFNaYvjWkW1MValdMqkwAiwJyVo/zVf1JW+yWEx5Fz2pcO1yIC22/RtzQKNhTVeOsWks0fb0SAoqcVUt+Idv7higoWNM2Ue7hQDOlQEdRszpAT2kvvzdDQ8Ga9B7s4UzoHr5zoqIgpZzbj0D4fBomo6VEFOwJqg0BNcmJjqJktYEj2vQ0gktGEbI6og/0XQ12KKh3yE1docA1DgnYoiBBZlUgT57Zc05mKKgzzFLj51iD6NstRrqNULDH7MHm1pjr27JkvnZDFCSIrKqxUXtU7ZYmUxQk2qy6e6PmwlOQkzlKm9XPpeeLqkuUkwVKk1Xzr/FV3pUJ12yBgrUiq3baKM1KuO/sUIo92Dw3SrKS5GSHkmbVzhuFWYmPJ2uU5Lhqlo2CrLJKtlZLFFSCrIRfuyyykudkjRJktdh395qdRY+q3+XYoiCfXTN1ssZ0Gqr6t0LWKMin93ZZqugsrm/j/XL53ipX6AJ1W0f7Pt5QfL5dC3UjVHWapon2F1UuULe0ktvGavnbiVhuUI6LUYxiFKMYxShGMYpRjGIUoxjFKEYxilGMYtT/gMJNmgVGoQacLoFRgHjumoU2qR9c3iv8v83U2nmUzXxsIEBpRwcET8q810UzJXMMfpiPVZ1UplPo88GjcsXwTh/v//LSD+GM6OeH6kmZ/6q7/lxuJlWe+y7C246LS1l/AcaKNidexH1dAAAAAElFTkSuQmCC");
        safeIconSet("arrowdown", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAYFBMVEX///8AAAD5+flmZmbIyMisrKyPj4+Tk5Obm5uoqKigoKCJiYmWlpa6urrDw8OMjIy0tLTS0tLz8/NPT0/s7Ozj4+NxcXFJSUl6enpAQEAICAiCgoJgYGA0NDQPDw8vLy9s7q0LAAADpklEQVR4nO2c22KqMBBFidVai9WC1ku1nv//y2NKsUBuM5PL9GH2cyCrK2RCBVJV8dk3zXyYptknOGt8Pg5HNc3x8MGNVbUnA6vLqWUGOzjAlDrwoj05we5onGBvHjCl3vjA2rOX7Mw3nptPL9nnho3sxQum1JqNrA6QXbjAZr6ZqfM0EzIhEzIhEzIhEzIhEzIhEzIhEzIhEzIhEzIhEzIhE7LMZLP9HnjCZGSzFtDl5nLd7a6XeUGyedel/5Hj5qs/6ReALQlZ83h6+8/Dthqc9bYqQra4Ddo7u5w8rlwWIFuOD6hBrZR6yU5mPFS22tiaZw5YiyZbm4dYrBnGwmixZNYun6etnu3n9j6jjyRzvB+wBYEZ7RKSWY0ZXVqusT4ea1FknjcqBmgeMOdMjiRzDtKoS28rj7UIssA7KD/TwDJ3x3Fda3Qy5zXW59vGPNTKWXLJZK/hLu/LdrsLN3NYo5IFjd2za6sG0MxhjUgGMKa0tAuonXWG0sgC863PqfK/3PYbizUSGcyYUufqFm7UxbRGIQMau98fwslMawQyqDFNZr6m68zUGp4MbEypo39lmmQZSRZ6+3CYLbBqPJrHkEHq2CMNrNLa0ZBkKLDr/VCUtNEtJ44suDyP0uDmi05NJEMZ6/+/w6FtSWQ4Ywva31MTyHA9vNKm82/xgJPhjI3+VccdWiPJyMbwaEsUGW5EJmDYw2sEGWJJUtZfXXDK12Ay3Mw3jFXoU9RAMpyxhQ0Ma20JIou8xqjWgmTIP9ZhDH+xbt2fFHU54Ga89/e6Vfj4bHn3gWGtpUzoF85qwQQG+DiKx1rQGNe1FrjG+uCmeoo46xi3NaAxHVwdig3YmA5uNYiLp/LbglvvYhJ+vsVkDWmsnDUCWBk09FB2yT+gJGMlrBGN6eQtuYgCW9ZahDGdfDdF0d+E51reUUtSSWtJvqLPYS2BMZ301pLtO5D6piiRMZ20dS2qjk2Tsq5F1rFp0llLakwn1fJOXsTdSWMtuTGdFNYyGNOJt5bFWAq0bGCxA5ppKLvELFSZt8KhW8tqTIdqrcDmQbSFKvGSZM87AazQzkF4a0WM6WCtFdygCmetmDEdzAwtvKUXvK5lr2PTQK0xbIIGW96LG9OBWGPaNi5sLeNtTxwaG1hoQBl3APRbYzSm416oWI3puKwxG9OxW+PbMHEQ20LFUmDNmHt0/gljOtOboj9iTGdkjXFTTkvmjw/y1Bn0tWA4/wF3FDc+MwStlQAAAABJRU5ErkJggg");
        onSet("arrowdown", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAYFBMVEX///8AAAD5+flmZmbIyMisrKyPj4+Tk5Obm5uoqKigoKCJiYmWlpa6urrDw8OMjIy0tLTS0tLz8/NPT0/s7Ozj4+NxcXFJSUl6enpAQEAICAiCgoJgYGA0NDQPDw8vLy9s7q0LAAADpklEQVR4nO2c22KqMBBFidVai9WC1ku1nv//y2NKsUBuM5PL9GH2cyCrK2RCBVJV8dk3zXyYptknOGt8Pg5HNc3x8MGNVbUnA6vLqWUGOzjAlDrwoj05we5onGBvHjCl3vjA2rOX7Mw3nptPL9nnho3sxQum1JqNrA6QXbjAZr6ZqfM0EzIhEzIhEzIhEzIhEzIhEzIhEzIhEzIhEzIh7LMZLP9HnjCZGSzFtDl5nLd7a6XeUGyedel/5Hj5qs/6ReALQlZ83h6+8/Dthqc9bYqQra4Ddo7u5w8rlwWIFuOD6hBrZR6yU5mPFS22tiaZw5YiyZbm4dYrBnGwmixZNYun6etnu3n9j6jjyRzvB+wBYEZ7RKSWY0ZXVqusT4ea1FknjcqBmgeMOdMjiRzDtKoS28rj7UIssA7KD/TwDJ3x3Fda3Qy5zXW59vGPNTKWXLJZK/hLu/LdrsLN3NYo5IFjd2za6sG0MxhjUgGMKa0tAuonXWG0sgC863PqfK/3PYbizUSGcyYUufqFm7UxbRGIQMau98fwslMawQyqDFNZr6m68zUGp4MbEypo39lmmQZSRZ6+3CYLbBqPJrHkEHq2CMNrNLa0ZBkKLDr/VCUtNEtJ44suDyP0uDmi05NJEMZ6/+/w6FtSWQ4Ywva31MTyHA9vNKm82/xgJPhjI3+VccdWiPJyMbwaEsUGW5EJmDYw2sEGWJJUtZfXXDK12Ay3Mw3jFXoU9RAMpyxhQ0Ma20JIou8xqjWgmTIP9ZhDH+xbt2fFHU54Ga89/e6Vfj4bHn3gWGtpUzoF85qwQQG+DiKx1rQGNe1FrjG+uCmeoo46xi3NaAxHVwdig3YmA5uNYiLp/LbglvvYhJ+vsVkDWmsnDUCWBk09FB2yT+gJGMlrBGN6eQtuYgCW9ZahDGdfDdF0d+E51reUUtSSWtJvqLPYS2BMZ301pLtO5D6piiRMZ20dS2qjk2Tsq5F1rFp0llLakwn1fJOXsTdSWMtuTGdFNYyGNOJt5bFWAq0bGCxA5ppKLvELFSZt8KhW8tqTIdqrcDmQbSFKvGSZM87AazQzkF4a0WM6WCtFdygCmetmDEdzAwtvKUXvK5lr2PTQK0xbIIGW96LG9OBWGPaNi5sLeNtTxwaG1hoQBl3APRbYzSm416oWI3puKwxG9OxW+PbMHEQ20LFUmDNmHt0/gljOtOboj9iTGdkjXFTTkvmjw/y1Bn0tWA4/wF3FDc+MwStlQAAAABJRU5ErkJggg==");


        setConfig({
          readonly: false,
          placeholder: "Edite aquí su contenido!",
          //           defaultActionOnPaste: "insert_as_html",
          //           defaultLineHeight: 1.5,
          //           enter: "p",
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
            // add new div blank block bellow selected one
            {
              name: "addNewBlock",
              tooltip: "Add New Block",
              icon: "plus",
              exec: () => {
                const iframe = document.getElementById("documentWindow");
                const iframeDoc = iframe.contentWindow.document;
                const body = iframeDoc.getElementsByTagName("body");
                const newDiv = document.createElement("div");
                newDiv.innerText = "Nuevo párrafo";
                if (editorContent && editorContent.parentNode) {
                  const nextElement = editorContent.nextSibling;
                  if (nextElement) {
                    editorContent.parentNode.insertBefore(newDiv, nextElement);
                  } else {
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
            "image",
            "table",
            {
              name: "addDividedBlock",
              tooltip: "Add Divided Block",
              icon: "rightarrow",
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
              tooltip: "Move Block Up",
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
              tooltip: "Move Block Down",
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
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  editorContent.parentNode.removeChild(editorContent);
                }
              },
            },
            "|",
            ,
            // AI assistant
            {
              name: "aiAssistant",
              tooltip: "AI Assistant",
              icon: "ai_assistant",
              exec: (editor) => {
                if (editor.value) {
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
              tooltip: "Math Equation",
              icon: "math",
              exec: (editor) => {
                document.getElementById("editorIcon")?.click();
              },
            },
            {
              name: "chemistry equation",
              tooltip: "Chemistry Equation",
              icon: "chemistry",
              exec: (editor) => {
                document.getElementById("chemistryIcon")?.click();
              },
            },
            "|",
            // insert check button
            {
              name: "insertCheck",
              tooltip: "Apply Changes",
              icon: "greenCheck",
              exec: (editor) => {
                // setChangedContent(editor.value);
                console.log("editor", editor);
                let content = editor.value;
                content = content.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br\s*\/?>/g, '');
                setChangedContent(content);
              },
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
              // Set default alignment for the editor container
              if (editor.editor) {
                editor.editor.style.textAlign = 'left';
              }

              // Ensure cursor starts from the left
              editor.s?.focus();
            },
            change: (newContent) => {
              // Keep existing alignment logic
              const selection = editor.current?.selection;
              if (selection) {
                const currentBlock = selection.current();
                if (currentBlock && !currentBlock.style.textAlign) {
                  currentBlock.style.textAlign = 'left';
                }
              }

              // Check for images and add resize buttons if needed
              const images = editor.current?.editor?.querySelectorAll('img');
              if (images?.length && config) {
                images.forEach(img => {
                  // Ensure each image has the necessary attributes and event listeners
                  if (!img.getAttribute('tabindex')) {
                    img.setAttribute('tabindex', '0');
                    img.addEventListener('click', () => {
                      editor.current?.selection?.select(img);
                    });
                  }
                });

                // Add image buttons if they don't exist
                const hasImageButtons = config.extraButtons?.some(
                  button => button.name === 'img_increase' || button.name === 'img_decrease'
                );

                if (!hasImageButtons) {
                  const updatedConfig = { ...config };
                  updatedConfig.extraButtons = (updatedConfig.extraButtons || []).concat([
                    {
                      name: "img_increase",
                      tooltip: "Aumentar",
                      icon: "angle-up",
                      exec: () => {
                        const selectedImage = editor.current?.selection?.current()?.querySelector('img') ||
                          editor.current?.editor?.querySelector('img:focus');
                        if (selectedImage) {
                          const currentWidth = parseInt(selectedImage.style.width) || 80;
                          if (currentWidth < 100) {
                            selectedImage.style.width = `${currentWidth + 5}%`;
                          }
                        }
                      },
                    },
                    {
                      name: "img_decrease",
                      tooltip: "Reducir",
                      icon: "angle-down",
                      exec: () => {
                        const selectedImage = editor.current?.selection?.current()?.querySelector('img') ||
                          editor.current?.editor?.querySelector('img:focus');
                        if (selectedImage) {
                          const currentWidth = parseInt(selectedImage.style.width) || 80;
                          if (currentWidth > 50) {
                            selectedImage.style.width = `${currentWidth - 5}%`;
                          }
                        }
                      },
                    },
                  ]);
                  setConfig(updatedConfig);
                }
              }
            },
            focus: (e) => {
              // Ensure cursor position is maintained when focusing
              const selection = editor.current?.selection;
              if (selection && !selection.isCollapsed) {
                selection.save();
              }
            },
            blur: (e) => {
              // Restore cursor position when editor loses focus
              const selection = editor.current?.selection;
              if (selection) {
                selection.restore();
              }
            },
            afterInsertImage: (image) => {
              // Set default width for newly inserted images
              image.style.width = '80%';

              // Ensure the image is selectable
              image.setAttribute('tabindex', '0');

              // Add click handler to make the image the current selection
              image.addEventListener('click', () => {
                editor.current?.selection?.select(image);
              });

              // Add image resize buttons if they don't exist
              const updatedConfig = { ...config };
              if (!updatedConfig.extraButtons?.some(
                button => button.name === 'img_increase' || button.name === 'img_decrease'
              )) {
                updatedConfig.extraButtons = (updatedConfig.extraButtons || []).concat([
                  {
                    name: "img_increase",
                    tooltip: "Aumentar",
                    icon: "angle-up",
                    exec: () => {
                      const selectedImage = editor.current?.selection?.current()?.querySelector('img') ||
                        editor.current?.editor?.querySelector('img:focus');
                      if (selectedImage) {
                        const currentWidth = parseInt(selectedImage.style.width) || 80;
                        if (currentWidth < 100) {
                          selectedImage.style.width = `${currentWidth + 5}%`;
                        }
                      }
                    },
                  },
                  {
                    name: "img_decrease",
                    tooltip: "Reducir",
                    icon: "angle-down",
                    exec: () => {
                      const selectedImage = editor.current?.selection?.current()?.querySelector('img') ||
                        editor.current?.editor?.querySelector('img:focus');
                      if (selectedImage) {
                        const currentWidth = parseInt(selectedImage.style.width) || 80;
                        if (currentWidth > 50) {
                          selectedImage.style.width = `${currentWidth - 5}%`;
                        }
                      }
                    },
                  },
                ]);
                setConfig(updatedConfig);
              }
            },
            beforeImageInsert: (image) => {
              try {
                // Validate image before insertion
                if (!image.src) {
                  console.error('Invalid image source');
                  return false;
                }
                return true;
              } catch (error) {
                console.error('Error in beforeImageInsert:', error);
                return false;
              }
            },
            errorHandler: (error) => {
              console.error('Jodit Editor error:', error);

            }
          },
          processSVG: (svg) => {
            return svg;

          },
          defaultStyle: {
            textAlign: 'left'  // Remove this as we'll handle alignment differently
          },
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
        });

        const img = editorContent?.querySelector("img");
        if (img) {
          const updatedConfig = { ...config };
          // Check if buttons don't already exist before adding them
          const hasImageButtons = updatedConfig.extraButtons?.some(
            button => button.name === "img_increase" || button.name === "img_decrease"
          );

          if (!hasImageButtons) {
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
        }

        // // If selected block is Footnote, add block size increase and decrease button
        if (editorContent?.classList) {
          const calssList = Array.from(editorContent?.classList);
          if (calssList.includes("footnote")) {
            const updatedConfig = { ...config };
            updatedConfig.extraButtons = (
              updatedConfig.extraButtons || []
            ).concat([
              {
                name: "block_increase",
                tooltip: "Aumentar",
                icon: "angle-up",
                exec: () => {
                  const padding = parseInt(
                    editorContent.style.padding?.split(" ")[1]
                  );
                  if (padding && padding > 5) {
                    editorContent.style.setProperty(
                      "padding",
                      `0px ${padding - 5}px`,
                      "important"
                    );
                  } else {
                    editorContent.style.setProperty(
                      "padding",
                      `0px 5px`,
                      "important"
                    );
                  }
                },
              },
              {
                name: "block_decrease",
                tooltip: "Reducir",
                icon: "angle-down",
                exec: () => {
                  const padding = parseInt(
                    editorContent.style.padding?.split(" ")[1]
                  );
                  if (padding && padding < 200) {
                    editorContent.style.setProperty(
                      "padding",
                      `10px ${padding + 5}px`,
                      "important"
                    );
                  } else {
                    editorContent.style.setProperty(
                      "padding",
                      `10px 15px`,
                      "important"
                    );
                  }
                },
              },
            ]);
            setConfig(updatedConfig);
          }
        }

        // add custom button by Jodit method
        // create custom paragraph type button

        module.Jodit.defaultOptions.controls.customParagraph = {
          tooltip: "Select the type of the block",
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
            let value = control.args && control.args[0]; // h1, h2 ...
            // change div tag to h2 tag
            if (value == "Título 1") {
              const tempElement = document.createElement("h2");
              tempElement.innerHTML = editorContent.innerHTML.toUpperCase();
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Título 2") {
              const tempElement = document.createElement("h3");
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Título 3") {
              const tempElement = document.createElement("h4");
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Cuerpo") {
              const tempElement = document.createElement("div");
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Texto recuadro") {
              const tempElement = document.createElement("blockquote");
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Título de Tabla/Figura") {
              const tempElement = document.createElement("div");
              tempElement.style.cssText = "text-align: center;";
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Nota de Tabla/Figura") {
              const tempElement = document.createElement("div");
              tempElement.style.cssText =
                "font-size: 0.9rem; text-align: justify;";
              tempElement.classList.add("footnote");
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            } else if (value == "Fórmula centrada") {
              const tempElement = document.createElement("div");
              tempElement.style.cssText = "text-align: center;";
              tempElement.innerHTML = editorContent.innerHTML;
              editorContent.parentNode.replaceChild(tempElement, editorContent);
              setEditorContent(tempElement);
            }
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
      let content = editorContent.outerHTML;
      let contentChange = content.replace("2.5px solid red", "none");
      setModel(contentChange);
      setChangedContent(editorContent.outerHTML);
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
      console.log("Please select the correct section");
    }
  }, [editorContent]);

  useEffect(() => {
    setModel(improvedText);
  }, [improvedText]);

  const handleModelChange = (value) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");

    // Add inline style to Wiris formula images
    doc.querySelectorAll("img.Wirisformula").forEach((img) => {
      img.style.display = "inline";
      img.style.verticalAlign = "middle";
      img.style.width = "auto";
      img.style.height = "auto";
      img.style.resize = "none";
      img.style.maxWidth = "100%";
      img.addEventListener("dblclick", function () {
        if (window.WirisPlugin && window.WirisPlugin.currentInstance) {
          window.WirisPlugin.currentInstance.openExistingFormulaEditor(this);
        }
      });
    });

    setModel(doc.body.innerHTML);
  };

  useEffect(() => {
    if (editor.current) {
      const editorfield = Array.from(
        document.getElementsByClassName("jodit-wysiwyg")
      )[0];
      if (typeof window !== "undefined" && window.WirisPlugin && editorfield) {
        const genericIntegrationProperties = {
          target: editorfield,
          toolbar: document.getElementById("mathtoolbar"),
          imageFormat: "svg",
          saveMode: "xml",
          editMode: "default",
          enableAccessibility: true,
          wirisEditorParameters: {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#000000",
            backgroundColor: "transparent",
          },
          integrationParameters: {
            allowResize: false,
            enableAutoAlign: true,
          },
          imageAttributes: {
            style: "display: inline; vertical-align: middle;",
          },
        };
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

  return (
    <div className="w-full px-1">
      <div id="mathtoolbar" className="hidden"></div>
      <div className="flex justify-between">
        <span className="font-semibold text-[25px]">{section}</span>
      </div>
      <div className="w-full mt-1 h-[70%]">
        {isBrowser &&
          (() => {
            try {
              return (
                <JoditEditor
                  ref={editor}
                  value={model}
                  config={config}
                  onChange={handleModelChange}
                  tabIndex={1}
                  className="w-full"
                />
              );
            } catch (error) {
              return <h1>Error</h1>;
            }
          })()}
      </div>
    </div>
  );
};


export default Editor;
