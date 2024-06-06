import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faL } from '@fortawesome/free-solid-svg-icons';
// import { Jodit } from 'jodit-react';

// Using dynamic import of Jodit component as it can't render server-side
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Editor = ({ editorContent, setEditorContent, setChangedContent, section, setSection }) => {
  const editor = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [model, setModel] = useState('');
  const [config, setConfig] = useState(null)

  const options = [
    'customParagraph', 'paragraph', '|',
    'bold',
    'underline',
    'italic', '|',
    'brush',
    'image',
    'table',
    'link', '|',
    'undo', 'redo', '|',
    'eraser', '|'
  ];

  useEffect(() => {
    setIsBrowser(true);
    import('jodit-react').then((module) => {

      //add tooltip icon
      module.Jodit.modules.Icon.set('tooltip', '<img data-v-f5c15f4e="" srcset="https://img.icons8.com/?size=80&amp;id=50rlyzgyjENI&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=50rlyzgyjENI&amp;format=png 2x" width="80" height="80" alt="Info icon" class="loaded">')

      setConfig(
        {
          readonly: false,
          placeholder: 'Edite aquí su contenido!',
          defaultActionOnPaste: 'insert_as_html',
          defaultLineHeight: 1.5,
          enter: 'p',
          buttons: options,
          buttonsMD: options,
          buttonsSM: options,
          buttonsXS: options,
          statusbar: false,
          sizeLG: 900,
          sizeMD: 700,
          sizeSM: 400,
          language: 'en',
          colors: ['#159957', '#f2f2f2', '#fcf9e7'],
          uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
          },
          allowTabNavigation: false,
          controls: {
            paragraph: module.Jodit.atom({
              list: {
                h1: 'Título 1',
                h2: 'Título 2',
                h3: 'Título 3',
                h4: 'Cuerpo',
                h5: 'Texto recuadro',
                blockquote: 'Título de Tabla/Figura',
                div: 'Nota de Tabla/Figura',
              }
            })
          },
          // custom buttons
          extraButtons: [
            // add insert tooltip button
            {
              name: 'insertTooltip',
              tooltip: 'Insert Tooltip',
              icon: 'tooltip',
              exec: () => {
                alert('Hello from insert tooltip')
              }
            },
            // add new div blank block bellow selected one
            {
              name: 'addNewBlock',
              tooltip: 'Add New Block',
              icon: 'plus',
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  const newDiv = document.createElement('div');
                  newDiv.innerText = 'new paragraph';
                  const nextElement = editorContent.nextSibling;
                  if (nextElement) {
                    editorContent.parentNode.insertBefore(newDiv, nextElement);
                  } else {
                    editorContent.parentNode.appendChild(newDiv);
                  }
                  // make click event automatically to convert new Element
                  const clickEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                  });
                  newDiv.dispatchEvent(clickEvent);
                }
              }
            },
            // move selected block up
            {
              name: 'blockUp',
              tooltip: 'Move Block Up',
              icon: 'angle-up',
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  const previousElement = editorContent.previousElementSibling;
                  if (previousElement) {
                    editorContent.parentNode.insertBefore(editorContent, previousElement);
                  } else {
                    alert('can not move')
                  }
                }
              },
            },
            // move selected block down
            {
              name: 'blockDown',
              tooltip: 'Move Block Down',
              icon: 'angle-down',
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  const nextElement = editorContent.nextElementSibling;
                  if (nextElement) {
                    editorContent.parentNode.insertBefore(nextElement, editorContent);
                  } else {
                    alert('Cannot move down - there are no more elements below.')
                  }
                }
              },
            },
            // delete block button
            {
              name: 'deleteBlock',
              tooltip: 'Delete Block',
              icon: 'cancel',
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  editorContent.parentNode.removeChild(editorContent);
                }
              }
            },
            '|'
          ],
        }
      );

      // add custom button by Jodit method
      module.Jodit.defaultOptions.controls.customParagraph = {
        tooltip: 'Select the type of the block',
        icon: 'paragraph',
        list: ['Título 1', 'Título 2', 'Título 3', 'Cuerpo', 'Texto recuadro', 'Título de Tabla/Figura', 'Nota de Tabla/Figura'],

        childTemplate: (editor, key, value) =>
          `<span class="${key}">${editor.i18n(value)}</span>`,

        exec(editor, _, { control }) {
          let value = control.args && control.args[0]; // h1, h2 ...
          // change div tag to h2 tag
          if (value == 'Título 1') {
            const tempElement = document.createElement('h2');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Título 2') {
            const tempElement = document.createElement('h3');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Título 3') {
            const tempElement = document.createElement('h4');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Cuerpo') {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Texto recuadro') {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Título de Tabla/Figura') {
            const tempElement = document.createElement('div');
            tempElement.style.cssText = 'text-align: center;';
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if(value == 'Nota de Tabla/Figura') {
            const tempElement = document.createElement('div');
            tempElement.style.cssText = 'font-size: 0.9rem; text-align: center'
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          console.log('this is the value ==>', value);

        }
      };
    })
  }, [editorContent]);

  useEffect(() => {
    setModel(editorContent ? editorContent.outerHTML : '');
    setChangedContent(editorContent ? editorContent.outerHTML : '');
    try {
      const sectionTitleElement = editorContent.parentNode.getElementsByTagName('h2')[0];
      if (sectionTitleElement?.id !== 'title') {
        setSection(sectionTitleElement.textContent);
      }
    } catch (e) {
      console.log('Please select the correct section');
    }
  }, [editorContent]);

  const handleModelChange = (value) => {
    setChangedContent(value);
    setModel(value);
  };




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
            tabIndex={1}
            className="w-full"
          />
        )}
      </form>
    </div>
  );
};

export default Editor;