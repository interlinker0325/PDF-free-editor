// noinspection JSNonASCIINames

import {useEffect, useState} from "react";
import IFrame from "components/IFrame/IFrame";
import {isPostDraft} from "utils";
import Editor from "components/Editor/Editor";
import Compliance from "components/Compliance/Compliance"
import ErrorBoundary from "components/Editor/ErrorBoundary";

let options = {year: "numeric", month: "long", day: "numeric"};

const PostView = ({
  user,
  post,
  courses,
  editMode = false,
  previewIframe,
  editView,
  showPreview,
  complianceView,
  setIsSaved,
  logicCheck,
  setAllPass,
}) => {
  // when the element of the Iframe Preview, editorContent is set as clicked Element
  const [editorContent, setEditorContent] = useState("Select the tag");
  // once the editorContent(HTML object of the Iframe) is changed, changedContent is set as its html string
  // once the value of Editor is changed, it is set as editor's HTML string
  const [changedContent, setChangedContent] = useState("");
  // section title of the edited content. set from preview IFrame
  const [section, setSection] = useState("Sección Título");
  // show a file list as a link if set true in a post's view
  const [showFiles, setShowFiles] = useState(false);
  const [sectionTitles, setSectionTitles] = useState([]);
  const toggleShowFiles = () => setShowFiles(prev => !prev);
  const [isAnexos, setIsAnexos] = useState(false);

  // standard section titles
  const sections = {
    'Ensayo': ['conclusiones', 'bibliografía', 'anexos'],
    'Doc. Académico': ['bibliografía', 'anexos'],
    'Art. Científico': ['resumen', 'introducción', 'metodología', 'resultados', 'conclusiones', 'bibliografía', 'anexos'],
  };

  const check = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
      <path fill="#2775db" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
      <path fill="#fff" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
    </svg>
  );

  const pendiente = (<div className="text-red-600">Pendiente</div>);
  const order = (<div className="text-red-600">Ordenar</div>);
  const revisa = (<div className="text-orange-400">Revisar</div>);
  const baseSectionCheckBadgeConfig = {
    'Ensayo': 3,
    'Doc. Académico': 2,
    'Art. Científico': 7,
  };
  const baseSectionCheckBadge = {};
  for (let [key, count] of Object.entries(baseSectionCheckBadgeConfig)) {
    baseSectionCheckBadge[key] = new Array(count).fill(pendiente);
  }
  const baseNumerationCheckBadge = {
    'tables': check,
    'figures': check,
    'anexos': check,
  };
  const baseNoteCheckBadge = {
    'tables': check,
    'figures': check,
  };

  const [sectionCheckBadge, setSectionCheckBadge] = useState(baseSectionCheckBadge);
  const [numerationCheckBadge, setNumerationCheckBadge] = useState(baseNumerationCheckBadge);
  const [noteCheckBadge, setNoteCheckBadge] = useState(baseNoteCheckBadge);
  const [coherenceCheckBadge, setCoherenceCheckBadge] = useState(check);
  const [titleLengthCheckBadge, setTitleLengthCheckBadge] = useState('Revisar');
  const [wordCheckBadge, setWordCheckBadge] = useState(check);

  const gratidudeSections = ['agradecimiento', 'agradecimientos', 'reconocimiento', 'gratitud', 'honor'];
  const inAppropriateWords = ['cabrón', 'cabrona', 'caca', 'cagada', 'cago', 'me cago', 'chinga', 'chingado', 'comecaca', 'come caca', 'comecoño', 'comecoños', 'come coño', 'come coños', 'comeculo', 'comeculos', 'come culo', 'come culos', 'comemierda', 'come mierda', 'comepicha', 'comepichas', 'come picha', 'come pichas', 'comepito', 'comepitos', 'come pito', 'come pitos', 'coño', 'culada', 'culeada', 'culiada', 'culero', 'fantoche', 'gilipollas', 'guey', 'hijo de puta', 'hijo deputa', 'hijoputa', 'idiota', 'imbécil', 'joder', 'lamecoño', 'lamecoños', 'lame coño', 'lame coños', 'lameculo', 'lameculos', 'lame culo', 'lame culos', 'lamepicha', 'lamepichas', 'lame picha', 'lame pichas', 'lamepito', 'lamepitos', 'lame pito', 'lame pitos', 'lameverga', 'lamevergas', 'lame verga', 'lame vergas', 'malparido', 'malparidos', 'mal parido', 'mal paridos', 'marica', 'maricón', 'maricones', 'mequetrefe', 'mequetrefes', 'metepicha', 'metepichas', 'mete picha', 'mete pichas', 'metepinga', 'metepingas', 'mete pinga', 'mete pingas', 'metepito', 'metepitos', 'mete pito', 'mete pitos', 'meteverga', 'metevergas', 'mete verga', 'mete vergas', 'mierda', 'papanatas', 'patán', 'pedorro', 'pedorros', 'pelele', 'peleles', 'pelmazo', 'pelmazos', 'pelotudo', 'pelotudos', 'pendejo', 'pendeja', 'picha', 'pinga', 'playo', 'ponecoños', 'ponecoño', 'pone coños', 'pone coño', 'poneculo', 'poneculos', 'pone culo', 'pone culos', 'ponepicha', 'ponepichas', 'pone picha', 'pone pichas', 'ponepinga', 'ponepingas', 'pone pinga', 'pone pingas', 'poneverga', 'ponevergas', 'pone verga', 'pone vergas', 'puta', 'puto', 'puteada', 'soplacoños', 'soplacoño', 'sopla coños', 'sopla coño', 'soplaculo', 'soplaculos', 'sopla culo', 'sopla culos', 'soplapedo', 'soplapedos', 'sopla pedo', 'sopla pedos', 'soplapinga', 'soplapingas', 'sopla pinga', 'sopla pingas', 'soplaverga', 'soplavergas', 'sopla verga', 'sopla vergas', 'tarado', 'tarados', 'tetas', 'tocapichas', 'tocapicha', 'toca pichas', 'toca picha', 'tocapelotas', 'toca pelota', 'tocapenes', 'tocapene', 'toca penes', 'toca pene', 'tocapichas', 'tocapicha', 'toca pichas', 'toca picha', 'tocavergas', 'tocaverga', 'toca vergas', 'toca verga', 'tontos', 'tontas', 'verga', 'vergas', 'violador', 'violadores'];

  // author of the post
  const author = post?.author;
  // check if current user is author of this post
  const isCurrentUserAuthor = author?.id === user?.id;

  const files = Array.isArray(post?.attachments)
    ? post?.attachments?.map((file) => (
      <a
        href={`/api/download?uri=${file.url.replace(
          "https://www.datocms-assets.com",
          ""
        )}&mimeType=${file.mimeType}&filename=${file.filename}`}
        key={`Attachment_${file.url}`}
        className="!text-other hover:!text-primary !m-0 !no-underline"
        download={file.filename}
      >
        {file.title || file.filename}
      </a>
    ))
    : [];

  let course = post?.course;
  if (courses) course = courses.find((someCourse) => someCourse.id === course);

  const postDraft = isPostDraft(post);
  let formattedDate = new Date(post.createdAt).toLocaleDateString(
    "es-ES",
    options
  );

  useEffect(() => {
    // section compliance check
    const iframe = document.getElementById("documentWindow");
    const standardTitles = sections[post.post_type];
    setCoherenceCheckBadge(check);
    setWordCheckBadge(check);
    // Title length check
    const title = document.getElementById('title')
    const title_length = title.textContent.length;
    if (title_length >= 25 && title_length <= 160) {
      setTitleLengthCheckBadge(check);
      title.style.border = 'none';
      title.title = '';
    }
    else {
      title.style.padding = '10px 20px'
      title.style.border = "solid red 2.5px";
      title.title = "El título debe tener entre 25 y 160 caracteres";
      setTitleLengthCheckBadge('Revisar');
    }
    if (iframe.contentWindow.document.body.textContent) {
      // get section titles after some changes
      try {
        setIsAnexos(false);
        setSectionCheckBadge(baseSectionCheckBadge);
        setNumerationCheckBadge(baseNumerationCheckBadge);
        setNoteCheckBadge(baseNoteCheckBadge);
        const sectionTitleElements = iframe.contentWindow.document.body.getElementsByTagName("h2");
        const subSectionTitleElements = iframe.contentWindow.document.body.querySelectorAll("h2, h3, h4");
        const divElements = iframe.contentWindow.document.body.getElementsByTagName('div');
        const liElements = iframe.contentWindow.document.body.getElementsByTagName('li');

        // Inappropriate words and Logic check of divElements
        Array.from(divElements).forEach((divElement) => {
          if (divElement.id !== 'preview-content' && divElement.id !== 'preview') {
            let logic_flag = false;
            let word_flag = '';

            // Check for logic flags
            logicCheck?.tags?.forEach((tag, index) => {
              if (divElement.textContent.includes(tag)) {
                logic_flag = index + 1;
              }
            });

            // Check for inappropriate words
            inAppropriateWords.forEach((word) => {
              const wordsArray = divElement.textContent.split(/\W+/);
              if (wordsArray.includes(word)) {
                word_flag = word;
              }
            });

            // Apply styles and titles based on the checks
            if (word_flag) {
              divElement.style.border = 'solid red 2.5px';
              divElement.title = `No puedes usar la palabra inapropiada "${word_flag}" en este documento.`;
              setWordCheckBadge('Revisar');
            } else if (logic_flag) {
              divElement.style.border = 'solid 2.5px red';
              divElement.title = logicCheck?.reasons[logic_flag - 1];
              setCoherenceCheckBadge('Revisar');
            } else {
              divElement.style.border = 'none';
              divElement.title = '';
            }
          }
        });
        // li elements check
        Array.from(liElements).forEach((liElement) => {
          if (liElement.id !== 'preview-content' && liElement.id !== 'preview') {
            let logic_flag = false;
            let word_flag = '';

            // Check for logic flags
            logicCheck?.tags?.forEach((tag, index) => {
              if (liElement.textContent.includes(tag)) {
                logic_flag = index + 1;
              }
            });

            // Check for inappropriate words
            inAppropriateWords.forEach((word) => {
              const regex = new RegExp(`\\b${word}\\b`, 'i');
              if (regex.test(liElement.textContent)) {
                word_flag = word;
              }
            });

            // Apply styles and titles based on the checks
            if (word_flag) {
              liElement.style.border = 'solid red 2.5px';
              liElement.title = `No puedes usar la palabra inapropiada "${word_flag}" en este documento.`;
              setWordCheckBadge('Revisar');
            } else if (logic_flag) {
              liElement.style.border = 'solid 2.5px red';
              liElement.title = logicCheck?.reasons[logic_flag - 1];
              setCoherenceCheckBadge('Revisar');
            } else {
              liElement.style.border = 'none';
              liElement.title = '';
            }
          }
        });


        Array.from(sectionTitleElements).forEach((sectionElement, index) => {
          const title = sectionElement.textContent.toLowerCase().trim();
          if (title === 'anexos') {
            setIsAnexos(true);
          }
          if (standardTitles?.includes(title)) {
            // section order check
            // scientific paper check
            if (post.post_type === 'Art. Científico') {
              if (sectionElement.textContent.toLowerCase().trim() === standardTitles[index]) {
                sectionElement.style.border = 'none';
                sectionElement.title = '';
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post?.post_type]];
                  updatedState[index] = check;
                  return {
                    ...prevState,
                    [post.post_type]: updatedState,
                  };
                })
              } else {
                // if the title belong to standard titles but the position doesn't equal to origin postion. In this case, first find the index in standard title and then set state to 'order'
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post.post_type]];
                  updatedState[index] = pendiente;
                  updatedState[standardTitles?.indexOf(title)] = order;
                  return {
                    ...prevState,
                    [post.post_type]: updatedState,
                  };
                });
                sectionElement.style.border = '2.5px solid red';
                sectionElement.title = 'Esta sección no tiene el nombre o el orden requerido: Resumen, Palabras Clave, Introducción, Metodología,  Resultados, Conclusiones, Bibliografía y Anexos (opcional) Ajusta su posición para continuar';
              }
            }
          } else {
            if (post.post_type) {
              setSectionCheckBadge(prevState => {
                const updatedState = [...prevState[post.post_type]];
                if (updatedState[index] !== order && index < sectionCheckBadge[post.post_type].length) {
                  // updatedState[index] = pendiente;
                }
                return {
                  ...prevState,
                  [post.post_type]: updatedState,
                };
              })
            }
            // un-neccessary section title check in scientific paper
            if (post.post_type === 'Art. Científico') {
              sectionElement.style.border = '2.5px solid red';
              sectionElement.title = 'Esta sección no tiene el nombre o el orden requerido: Resumen, Palabras Clave, Introducción, Metodología,  Resultados, Conclusiones, Bibliografía y Anexos (opcional)';
            }
          }
        });
        if (post.post_type) {
          // anxios optional section check
          Array.from(subSectionTitleElements).forEach((sectionElement) => {
            const title = sectionElement.textContent.toLowerCase().trim();
            if (gratidudeSections.includes(title)) {
              setIsAnexos(true);
              sectionElement.style.border = '2.5px solid red';
              sectionElement.title = 'Toda información sobre agradecimiento y reconocimiento debe debe estar en la sección final de Anexos.\n1. Mueve esta sección al área correspondiente, debajo de la Bibliografía. \n2. Declara el título correspondiente de Anexos arriba de esta sección con formato "Título 1".\n3. Cambia el título de esta sección a "Anexo 1: Reconocimiento"  y cambia su formato a "Título 2".';
              // If anxios exist, set badge to 'order'
              setSectionCheckBadge(prevState => {
                const updatedState = [...prevState[post.post_type]];
                if (Array.from(subSectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                  updatedState[6] = order;
                }
                return {
                  ...prevState,
                  [post.post_type]: updatedState,
                };
              });
            }
            else {
              sectionElement.style.border = 'none';
              sectionElement.title = '';
            }
          });
          Array.from(sectionTitleElements).forEach((sectionElement, index) => {
            const title = sectionElement.textContent.toLowerCase().trim();
            // people may include graphs and images or tables below the bibliography, so these are anexus, but do not include the correspondent "Anexos" title, so the anexus section is not declare, this is another "Pendiente" bridge on anexos.
            if (title === 'bibliografía') {
              const bibliographySection = Array.from(sectionTitleElements)[index]?.parentNode;
              if (bibliographySection.querySelector('img') || bibliographySection.querySelector('table')) {
                setIsAnexos(true);
                bibliographySection.style.border = '2.5px solid red';
                bibliographySection.title = 'Hay elementos no reconocidos en la bibliografía, elimínalos o revisa si debes agregar una sección de anexos al final';
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post.post_type]];
                  if (Array.from(sectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                    updatedState[5] = order;
                    updatedState[6] = order;
                  } else {
                    updatedState[5] = order;
                    updatedState[6] = pendiente;
                  }
                  return {
                    ...prevState,
                    [post.post_type]: updatedState,
                  };
                });
              } else {
                const bibliographySection = Array.from(sectionTitleElements)[index]?.parentNode;
                bibliographySection.style.border = 'none';
                bibliographySection.title = '';
              }
            } else {
              const tempSection = Array.from(sectionTitleElements)[index]?.parentNode;
              tempSection.style.border = 'none';
              tempSection.title = '';
            }
          });
          // if anexos section isn't detected, set the value to null
          if (!isAnexos && post.post_type) {
            setSectionCheckBadge(prevState => {
              const updatedState = [...prevState[post.post_type]];
              updatedState[sectionCheckBadge[post?.post_type].length - 1] = null;
              return {
                ...prevState,
                [post.post_type]: updatedState,
              };
            });
          }
          // essay paper section check
          if (post.post_type === 'Ensayo') {
            Array.from(sectionTitleElements).some((title, index) => {
              if (title.textContent.toLowerCase().trim() === 'conclusiones') {
                if (index === sectionTitleElements.length - 2) {
                  setSectionCheckBadge(prevState => {
                    title.style.border = 'none';
                    title.title = '';
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[0] = check;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                } else {
                  setSectionCheckBadge(prevState => {
                    title.style.border = '2.5px solid red';
                    title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[0] = order;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                }
              }
              // essay paper bibliografia section check
              if (title.textContent.toLowerCase().trim() === 'bibliografía') {
                if (index === sectionTitleElements.length - 1) {
                  title.style.border = 'none';
                  title.title = '';
                  setSectionCheckBadge(prevState => {
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[1] = check;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                } else {
                  setSectionCheckBadge(prevState => {
                    title.style.border = '2.5px solid red';
                    title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[1] = order;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                }
              }
            })
          }
          if (post.post_type === 'Doc. Académico') {
            Array.from(sectionTitleElements).some((title, index) => {
              // essay paper bibliografia section check
              if (title.textContent.toLowerCase().trim() === 'bibliografía') {
                if (index === sectionTitleElements.length - 1) {
                  title.style.border = 'none';
                  title.title = '';
                  setSectionCheckBadge(prevState => {
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[0] = check;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                } else {
                  setSectionCheckBadge(prevState => {
                    title.style.border = '2.5px solid red';
                    title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                    const updatedState = [...prevState[post.post_type]];
                    updatedState[0] = order;
                    return {
                      ...prevState,
                      [post.post_type]: updatedState,
                    };
                  });
                }
              }
            })
          }
          // If anexos exist
          if (isAnexos) {
            if (post.post_type === 'Ensayo') {
              Array.from(sectionTitleElements).some((title, index) => {
                if (title.textContent.toLowerCase().trim() === 'conclusiones') {
                  if (index === sectionTitleElements.length - 3) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  } else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  }
                }
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() === 'bibliografía') {
                  if (index === sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  } else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() === 'anexos') {
                  if (index === sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[2] = check;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  } else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[2] = order;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
            if (post.post_type === 'Doc. Académico') {
              Array.from(sectionTitleElements).some((title, index) => {
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() === 'bibliografía') {
                  if (index === sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  } else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() === 'anexos') {
                  if (index === sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  } else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.post_type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.post_type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
          }

          // methodology subsection check
          const methodologySubsections = ["dato", "información", "fuente", "teórico", "teoría", "concept", "descrip", "analisis", "metodolog"]
          const subsectionElements = iframe.contentWindow.document.body.getElementsByTagName('h3')
          Array.from(subsectionElements).forEach((subsection) => {
            // if subsection is methodology subsection
            if (methodologySubsections.includes(subsection.textContent.toLowerCase().trim())) {
              const sectionTitleOfSubsection = subsection.parentNode.querySelector('h2')?.textContent.toLowerCase().trim();
              if (sectionTitleOfSubsection === 'resumen' || sectionTitleOfSubsection === 'introducción') {
                subsection.style.border = 'solid 2.5px red';
                subsection.title = 'Toda información sobre datos y temas metodológicos deben estar en la sección Metodología. Mueve estas secciones al área correspondiente, o declara la Metodología arriba de esta sección para continuar';
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post.post_type]];
                  updatedState[2] = order;
                  return {
                    ...prevState,
                    [post.post_type]: updatedState,
                  };
                });
              }
              else {
              subsection.style.border = 'none';
              subsection.title = ''}
            }
          });
        }

        // numeration compliance check
        const tablePattern = /^Tabla \d+:/;
        const figurePattern = /^Figura \d+:/;
        let tableIndex = 0;
        let tableNumber = 0;
        let figureIndex = 0;
        let figureNumber = 0;
        Array.from(divElements).map((divElement) => {
          if (!divElement.querySelector('div')) {

            if (tablePattern.test(divElement.textContent)) {
              tableIndex++;
              tableNumber = divElement.textContent.split(':')[0].split(' ')[1];
              if (tableIndex != tableNumber) {
                divElement.style.border = 'solid 2.5px red';
                divElement.title = 'Revisa la numeración de esta sección, y adecúa sus referencias dentro del documento';
                setNumerationCheckBadge(prevState => {
                  return {
                    ...prevState,
                    'tables': revisa,
                  };
                });
              }
              else {
                divElement.style.border = 'none';
                divElement.title = '';
              }
            };
            if (figurePattern.test(divElement.textContent)) {
              figureIndex++;
              figureNumber = divElement.textContent.split(':')[0].split(' ')[1];
              if (figureIndex != figureNumber) {
                divElement.style.border = 'solid 2.5px red';
                divElement.title = 'Revisa la numeración de esta sección, y adecúa sus referencias dentro del documento';
                setNumerationCheckBadge(prevState => {
                  return {
                    ...prevState,
                    'figures': revisa,
                  };
                });
              }
              else {
                divElement.style.border = 'none';
                divElement.title = '';
              }
            };
          }
        })
        let anexosIndex = 0;  // Initialized here
        const anexosPattern = /^Anexo \d+:/;
        // Anxeos numeration check
        Array.from(sectionTitleElements).forEach((sectionTitleElement) => {
          if (sectionTitleElement.textContent.toLowerCase().trim() === "anexos") {
            const h3Elements = sectionTitleElement.querySelectorAll('h3');

            Array.from(h3Elements).forEach((h3Element) => {
              const textContent = h3Element.textContent.trim();

              if (anexosPattern.test(textContent)) {
                // Increment anexos index
                anexosIndex++;
                // Extract the number from the Anexo pattern and parse it
                const parsedNumber = parseInt(textContent.split(':')[0].split(' ')[1], 10);

                if (anexosIndex !== parsedNumber) {
                  // If numbers don't match, highlight the <h3> and set a warning badge
                  h3Element.style.border = 'solid 2.5px red';
                  h3Element.title = 'Revisa la numeración de esta sección';
                  setNumerationCheckBadge(prevState => ({
                    ...prevState,
                    'anexos': 'revisa',
                  }));
                } else {
                  // If numbers match, reset border and tooltip
                  h3Element.style.border = 'none';
                  h3Element.title = '';
                  // Uncomment this if you want to clear the error badge when everything's correct
                  // setNumerationCheckBadge(prevState => ({
                  //     ...prevState,
                  //     'anexos': 'check',
                  // }));
                }
              } else {
                // If pattern doesn't match, highlight the <h3> and set a warning badge
                h3Element.style.border = 'solid 2.5px red';
                h3Element.title = 'Los títulos de los anexos deben empezar con el texto: Anexo #: ';
                setNumerationCheckBadge(prevState => ({
                  ...prevState,
                  'anexos': 'revisa',
                }));
              }
            });
          }
        });

        // Figure and Table Note check
        // Figure check
        const notePattern = /^Fuente:/;
        const figureElements = iframe.contentWindow.document.body.getElementsByTagName('figure');
        Array.from(figureElements).forEach((figure) => {
          const noteElement = figure.parentNode.nextElementSibling;
          const hasNote = noteElement.style.cssText.includes('0.9rem');

          if (!hasNote) {
            figure.style.border = 'solid 2.5px red';
            figure.title = 'Esta Figura requiere una nota inferior empezando por el texto: "Fuente:"';
            setNoteCheckBadge(prevState => ({
              ...prevState,
              'figures': revisa,
            }));
          } else {
            figure.style.border = 'none';
            figure.title = '';
            // check if a note element starts with Fuente:
            if (notePattern.test(noteElement.textContent)) {
              noteElement.style.border = 'none';
              noteElement.title = '';
            } else {
              setNoteCheckBadge(prevState => ({
                ...prevState,
                'figures': revisa,
              }));
              noteElement.style.border = 'solid 2.5px red';
              noteElement.title = 'Esta nota debe empezar con el texto: “Fuente: “';
            }
          }
        })
        // table note check
        const tableElements = iframe.contentWindow.document.body.getElementsByTagName('table');
        Array.from(tableElements).forEach((table) => {
          const hasNote = table.nextElementSibling.style.cssText.includes('0.9rem');
          if (!hasNote) {
            table.style.border = 'solid 2.5px red';
            table.title = 'Esta Tabla requiere una nota inferior empezando por el texto: "Fuente:"';
            setNoteCheckBadge(prevState => ({
              ...prevState,
              'tables': revisa,
            }));
          } else {
            table.style.border = 'none';
            table.title = '';
            const noteElement = table.nextElementSibling;
            // check if a note element starts with Fuente:
            if (notePattern.test(noteElement.textContent)) {
              noteElement.style.border = 'none';
              noteElement.title = '';
            } else {
              setNoteCheckBadge(prevState => ({
                ...prevState,
                'tables': revisa,
              }));
              noteElement.style.border = 'solid 2.5px red';
              noteElement.title = 'Esta nota debe empezar con el texto: “Fuente: “';
            }
          }
        })

      } catch (error) {
        console.error("Error accessing iframe content:", error);
      }
    }
  }, [complianceView, changedContent, editorContent, editView, showPreview]);

  useEffect(() => {
    if (!setAllPass) return;
    // Check the document if pass the all requirements
    const formPass = Boolean(post.course && post.coverimage && post.description && post.tags && post.agreedterms);

    const type = post.post_type;
    const sectionPass = !Boolean(sectionCheckBadge[type]?.filter((item) => {
      return item?.props.children === "Pendiente";
    }).length);
    const documentPass = Boolean((titleLengthCheckBadge !== 'Revisar') && (wordCheckBadge !== 'Revisar') && (coherenceCheckBadge !== 'Revisar') && type && sectionPass);

    const numericPass = !Boolean(Object.values(numerationCheckBadge).filter((item) => {
      return item?.props.children === "Revisar"
    }).length);

    const notePass = !Boolean(Object.values(noteCheckBadge).filter((item) => {
      return item?.props.children === "Revisar"
    }).length);

    setAllPass(Boolean(formPass && documentPass && numericPass && notePass))

  }, [post, titleLengthCheckBadge, sectionCheckBadge, numerationCheckBadge, noteCheckBadge])


  return (
    <article
      className={(showPreview || editView || complianceView) ? "flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap" : 'hidden'}>
      <div
        className="flex flex-row items-center justify-between border-[1px] border-transparent rounded-none border-b-black">
        <h2 id="title" className="col-span-4 text-4xl cursor-pointer">{post.title}</h2>
        {isCurrentUserAuthor && !editMode && postDraft && (
          <a
            href={`/posts/${post.id}/edit`}
            className="align-self-end text-primary text-2xl"
          >
            {"Editar Publicación >"}
          </a>
        )}
      </div>
      <div className="grid grid-cols-10 gap-5 h-[75vh]">
        <aside className='h-[76vh] col-span-6 pr-5 border-[1px] border-transparent border-r-black'>
          <IFrame
            className=""
            srcDoc={previewIframe || post.monographView}
            editView={editView}
            setEditorContent={setEditorContent}
            setIsSaved={setIsSaved}
            changedContent={changedContent}
            setSection={setSection}
          />
        </aside>
        {editView && (
          <aside className="col-span-4 flex flex-col gap-4 pl-5 rounded-none h-full">
            <ErrorBoundary>
              <Editor
                setChangedContent={setChangedContent}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                section={section}
                setSection={setSection}
              />
            </ErrorBoundary>
          </aside>
        )}
        {showPreview && (
          <aside className="col-span-2 flex flex-col gap-4 pl-5">
            {course && (
              <h3 className="text-lg font-caslon">
                <span className="text-primary font-roboto text-xl pr-2">
                  Curso:
                </span>
                {course.name}
              </h3>
            )}
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Autor(es):
              </span>
              {author?.fullname || user?.fullname}
            </h4>
            {Array.isArray(post?.coauthors) && post?.coauthors.length > 0 && (
              <h4 className="text-lg font-caslon">
                {post?.coauthors
                  .map((coauthor) => coauthor.fullname)
                  .join(", ")}
              </h4>
            )}
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Tutor(a):
              </span>
              {course?.professor?.fullname}
            </h4>
            <h4 className="text-lg font-caslon">
              <span className="text-primary font-roboto text-xl pr-2">
                Fecha publicación:
              </span>
              {formattedDate}
            </h4>
            <a
              onClick={toggleShowFiles}
              className="text-other hover:text-primary underline underline-offset-2"
            >
              Contenido Adjunto &gt;
            </a>
            <div className="w-full pl-4 flex flex-col gap-0">
              {showFiles && files}
            </div>
          </aside>
        )}
        {complianceView && (
          <aside className="col-span-4 flex flex-col pl-5">
            <Compliance
              form={post}
              sectionTitles={sectionTitles}
              sections={sections}
              sectionCheckBadge={sectionCheckBadge}
              numerationCheckBadge={numerationCheckBadge}
              noteCheckBadge={noteCheckBadge}
              check={check}
              coherenceCheckBadge={coherenceCheckBadge}
              titleLengthCheckBadge={titleLengthCheckBadge}
              wordCheckBadge={wordCheckBadge}
            />
          </aside>
        )}
      </div>
    </article>
  );
};

export default PostView;
