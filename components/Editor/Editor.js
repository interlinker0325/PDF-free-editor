import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";

// Using dynamic import of Jodit component as it can't render server-side
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const Editor = ({ editorContent, setEditorContent, setChangedContent, section, setSection }) => {
  const editor = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [model, setModel] = useState('');
  const [config, setConfig] = useState(null);

  const [improvedText, setImprovedText] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [isChanged, setIsChanged] = useState(false)

  const options = [
    'customParagraph', '|',
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
    setIsChanged(false);
    import('jodit-react').then((module) => {

      //add tooltip icon
      module.Jodit.modules.Icon.set('tooltip', '<img data-v-f5c15f4e="" srcset="https://img.icons8.com/?size=80&amp;id=50rlyzgyjENI&amp;format=png 1x, https://img.icons8.com/?size=160&amp;id=50rlyzgyjENI&amp;format=png 2x" width="80" height="80" alt="Info icon" class="loaded">')
      module.Jodit.modules.Icon.set('greenCheck', '<img src="https://img.icons8.com/?size=100&id=Zy5ghkQj2rKy&format=png&color=000000" />')
      module.Jodit.modules.Icon.set('math', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVDiNxY+xSgNBFEXPG7KEBW38Ab8gzU61naQSQbAR/Atb7QRRSeMfWKYxFkoKG60UtnDzEG1stbOxNCQL+6wWliU7BiycaoZ77+EM/PeRtsB73wPGwHpLZQocuwD8MDAGiIGDhQZpmsbz+fwTWA0AAIYd7/0OsA+MJ5PJOcBsNtsUkWpcAH0zmzbG36r61gEugDVgI0mSJ1V9EJHdqiUi93meP7YpOOCjVj5K0zQGtmudUegPzszOau9+URSnwEqlH0XRdQgggPPePwO9Zmhmt6q6FTQASjM7acmD+hUAVR0BL42s6Ha7N0sBFlmY2V2WZV/LAlDVK+C1ll3+Ngbo1O5lWZZ7zrmBiLwDw2UAfz4/dNtaTXH2UcAAAAAASUVORK5CYII=" />')
      module.Jodit.modules.Icon.set('chemistry', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGPSURBVDiN1ZKxa1NRFMZ/5yY1COYPKFiEiNpBHe55SQiZdFBEHAQHQZwchapLodClCEKhi4Pg6KaSzamCQnDJEMiTDqIoGXTRRcHFR+K7x8G8cHkNdfabDt8558flu0c4QM1mc8XMboUQPo5Go6dAKM/IosVOp3N4MpmsAZvAkZn9NoRwJ03TNwcCkiS5ZmY7wLEFbDOz55VK5d5wOPwKUC06rVbrZJ7nj83sXGnpM7AMLAEiItdDCKeBMwCumMrz/AUQL/80s/Usy04AZ0VkN+qtFLvVyDwV1U+ccxvFM4H3wCVVvQxcdc49YxboPANVtaJuNBrVXq+XL8hgn9y/R/5LwHg8vquqS2VfVY+r6lqSJPPAY8C3qN4B9rz3FwG63W7de78NvAMemtkrZh8wB4QQbgBfIsiqiOyq6sssyz6IyDpwaNar7AOkafoaWAXuA78i0AX+XmKhPTO7QvkOYrXb7aPT6fSBiNyM7B/AVr1ef9Tv938X5kJAIe/9eefc7RDCp1qttj0YDL6XZ/4A/MWDnkkEniQAAAAASUVORK5CYII=">')

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
          language: 'es',
          colors: ['#159957', '#f2f2f2', '#fcf9e7'],
          uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
          },
          allowTabNavigation: false,
          link: {
            noFollowCheckbox: false,
            openInNewTabCheckbox: false,
            modeClassName: '',
          },
          spellCheck: true,
          autofocus: true,
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
              icon: 'bin',
              exec: () => {
                if (editorContent && editorContent.parentNode) {
                  editorContent.parentNode.removeChild(editorContent);
                }
              }
            },
            '|',
            ,
            // AI assistant
            {
              name: 'aiAssistant',
              tooltip: 'AI Assistant',
              icon: 'ai_assistant',
              exec: (editor) => {
                if (editor.value) {
                  const sectionCheck = async () => {
                    setModel("Processing...")
                    axios
                      .post(`${process.env.NEXT_PUBLIC_WINDOWS_SERVER_URL}/sectionCheck`, null, {
                        params: {
                          content: editor.value,
                          title: section
                        },
                      })
                      .then(function (response) {
                        setLoadingStatus(false);
                        setImprovedText(response["data"].improvedText);
                      })
                      .catch(function (error) {
                        setImprovedText(error)
                      });
                  };
                  sectionCheck();
                }
              }
            },
            '|',
            {
              name: 'math equation',
              tooltip: 'Math Equation',
              icon: 'math',
              exec: (editor) => {
                document.getElementById('editorIcon')?.click();
              }
            },
            {
              name: 'chemistry equation',
              tooltip: 'Chemistry Equation',
              icon: 'chemistry',
              exec: (editor) => {
                document.getElementById('chemistryIcon')?.click();
              }
            },
            '|',
            // insert check button
            {
              name: 'insertCheck',
              tooltip: 'Apply Changes',
              icon: 'ok',
              exec: (editor) => {
                setChangedContent(editor.value);
                const updatedConfig = { ...config };
                updatedConfig.extraButtons[12].icon = 'ok';
                setConfig(updatedConfig);
                setIsChanged(false);
              }
            },

          ],
        }
      );

      // config.extraButtons[9].icon = 'ok'

      // add custom button by Jodit method
      // create custom paragraph type button
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
          else if (value == 'Título 2') {
            const tempElement = document.createElement('h3');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if (value == 'Título 3') {
            const tempElement = document.createElement('h4');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if (value == 'Cuerpo') {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if (value == 'Texto recuadro') {
            const tempElement = document.createElement('blockquote');
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if (value == 'Título de Tabla/Figura') {
            const tempElement = document.createElement('div');
            tempElement.style.cssText = 'text-align: center;';
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }
          else if (value == 'Nota de Tabla/Figura') {
            const tempElement = document.createElement('div');
            tempElement.style.cssText = 'font-size: 0.9rem; text-align: center'
            tempElement.innerHTML = editorContent.innerHTML;
            editorContent.parentNode.replaceChild(tempElement, editorContent);
            setEditorContent(tempElement);
          }

        }
      };
    })
  }, [editorContent]);

  // Dynamic change the insertCheck button icon
  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = model;
    const modelContent = tempDiv.textContent;

    if (modelContent != editorContent?.textContent && isBrowser && editorContent && !isChanged) {
      const updatedConfig = { ...config };
      updatedConfig.extraButtons[12].icon = 'greenCheck';
      setConfig(updatedConfig);
      setIsChanged(true);
    }
  }, [model])

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

  useEffect(() => {
    setModel(improvedText);
  }, [improvedText])

  const handleModelChange = (value) => {
    setModel(value);
  };

  useEffect(() => {
    if (editor.current) {
      const editorfield = Array.from(document.getElementsByClassName('jodit-wysiwyg'))[0];
      if (typeof window !== 'undefined' && window.WirisPlugin && editorfield) {
        const genericIntegrationProperties = {
          target: editorfield,
          toolbar: document.getElementById('mathtoolbar'),
        };
        const genericIntegrationInstance = new window.WirisPlugin.GenericIntegration(genericIntegrationProperties);
        genericIntegrationInstance.init();
        genericIntegrationInstance.listeners.fire('onTargetReady', {});

        window.WirisPlugin.currentInstance = genericIntegrationInstance;
      }
    }
  }, [editor.current])

  return (
    <div className="w-full h-full p-1">
      <div id="mathtoolbar" className='hidden'></div>
      <div className="flex justify-between">
        <span className="font-semibold text-[30px]">{section}</span>
      </div>
      <form className="w-full h-full mt-5">
        {isBrowser && (() => {
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
            console.error('Error in JoditEditor', error);
            return <h1>Error</h1>;
          }
        })()}
      </form>
    </div>
  );
};

export default Editor;