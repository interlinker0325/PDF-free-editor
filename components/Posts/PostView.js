import { useState, useRef, useEffect, use } from "react";
import IFrame from "components/IFrame/IFrame";
import { isPostApproved } from "utils";
import Editor from "components/Editor/Editor";
import Compliace from "components/Compliance/Compliance"
let options = { year: "numeric", month: "long", day: "numeric" };
import ErrorBoundary from "components/Editor/ErrorBoundary";

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
}) => {
  // when the element of the Iframe Preview, editorContent is set as clicked Element
  const [editorContent, setEditorContent] = useState("Select the tag");
  // once the editorContent(html object of the Iframe) is changed, changedContent is set as its html string
  // once the value of Editor is changed, it is set as editor's html string
  const [changedContent, setChangedContent] = useState("");
  // section title of the edited content. set from preview IFrame
  const [section, setSection] = useState("Sección Título");
  // show file list as link if set true in post view
  const [showFiles, setshowFiles] = useState(false);
  const [sectionTitles, setSectionTitles] = useState([]);
  const toggleShowFiles = () => setshowFiles(!showFiles);
  const [isAnexos, setIsAnexos] = useState(false);

  // standard section titles
  const sections = {
    'Ensayo': ['conclusiones', 'bibliografía', 'anexos'],
    'Doc. Académico': ['bibliografía', 'anexos'],
    'Art. Científico': ['resumen', 'introducción', 'metodología', 'resultados', 'conclusiones', 'bibliografía', 'anexos'],
  };

  const check = (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
      <path fill="#2775db" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
      <path fill="#fff" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
    </svg>
  );

  const pendiente = (<div className="text-red-600">Pendiente</div>)
  const order = (<div className="text-red-600">Ordenar</div>)
  const baseSectionCheckBadge = {
    'Ensayo': [pendiente, pendiente, pendiente],
    'Doc. Académico': [pendiente, pendiente],
    'Art. Científico': [pendiente, pendiente, pendiente, pendiente, pendiente, pendiente, pendiente],
  }

  const [sectionCheckBadge, setSectionCheckBadge] = useState(baseSectionCheckBadge)

  const gratidudeSections = ['agradecimiento', 'agradecimientos', 'reconocimiento', 'gratitud', 'honor']

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

  const postApproved = isPostApproved(post);
  let formattedDate = new Date(post.createdAt).toLocaleDateString(
    "es-ES",
    options
  );

  // section compliance check
  useEffect(() => {
    console.log('splendiferous');
    const iframe = document.getElementById("documentWindow");
    const standardTitles = sections[post.type];
    if (iframe) {
      // get section titles when first loaded
      iframe.onload = function () {
        try {
          setIsAnexos(false);
          setSectionCheckBadge(baseSectionCheckBadge);
          const sectionTitleElements = iframe.contentWindow.document.body.getElementsByTagName("h2");
          Array.from(sectionTitleElements).map((sectionElement, index) => {
            const title = sectionElement.textContent.toLowerCase().trim();
            if (title == 'anexos') {
              setIsAnexos(true);
            }
            if (standardTitles.includes(title)) {
              // section order check
              // scientific paper check
              if (post.type == 'Art. Científico') {
                if (sectionElement.textContent.toLowerCase().trim() == standardTitles[index]) {
                  sectionElement.style.border = 'none';
                  sectionElement.title = '';
                  setSectionCheckBadge(prevState => {
                    // console.log(index);
                    const updatedState = [...prevState[post?.type]];
                    updatedState[index] = check;
                    return {
                      ...prevState,
                      [post.type]: updatedState,
                    };
                  })
                }
                else {
                  // if the title belong to standard titles but the position doesn't equal to origin postion. In this case, first find the index in standard title and then set state to 'order'
                  setSectionCheckBadge(prevState => {
                    const updatedState = [...prevState[post.type]];
                    updatedState[index] = pendiente;
                    updatedState[standardTitles.indexOf(title)] = order;
                    return {
                      ...prevState,
                      [post.type]: updatedState,
                    };
                  });
                  sectionElement.style.border = '2.5px solid red';
                  sectionElement.title = 'Esta sección no corresponde al orden requerido: Resumen, Palabras Clave (opcional), introducción, Metodología, Resultados, Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                }
              }
            }
            else {
              setSectionCheckBadge(prevState => {
                const updatedState = [...prevState[post.type]];
                if (updatedState[index] != order && index < sectionCheckBadge[post.type].length) {
                  console.log(index);
                  // updatedState[index] = pendiente;
                };
                return {
                  ...prevState,
                  [post.type]: updatedState,
                };
              })
              // un-neccessary section title check in scientific paper
              if (post.type == 'Art. Científico') {
                sectionElement.style.border = '2.5px solid red';
                sectionElement.title = 'Esta sección no corresponde al orden requerido: Resumen, Palabras Clave (opcional), introducción, Metodología, Resultados, Conclusiones, Bibliografía, y Anexos (opcional).';
              }
            }
          });
          // anxios optional section checkc
          Array.from(sectionTitleElements).map((sectionElement, index) => {
            const title = sectionElement.textContent.toLowerCase().trim();
            if (gratidudeSections.includes(title)) {
              console.log('I set it to true');
              setIsAnexos(true);
              sectionElement.title = 'Toda información sobre agradecimiento y reconocimiento debe estar en la sección final de Anexos. Mueve esta sección al área correspondiente, o declara el título correspondiente de Anexos arriba de esta sección para continuar';
              // If anxios exist, set badge to 'order'
              setSectionCheckBadge(prevState => {
                const updatedState = [...prevState[post.type]];
                if (Array.from(sectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                  updatedState[6] = order;
                };
                return {
                  ...prevState,
                  [post.type]: updatedState,
                };
              });
            }
            // people may include graphs and images or tables below the bibliography, so these are anexus, but do not include the correspondent "Anexos" title, so the anexus section is not declare, this is another "Pendiente" bridge on anexos.
            if (title == 'bibliografía') {
              const bibliographySection = Array.from(sectionTitleElements)[index]?.parentNode;
              if (bibliographySection.querySelector('img') || bibliographySection.querySelector('table')) {
                setIsAnexos(true);
                bibliographySection.style.border = '2.5px solid red';
                bibliographySection.title = 'Hay elementos no reconocidos en la bibliografía, elimínalos o revisa si debes agregar una sección de anexos al final';
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post.type]];
                  if (Array.from(sectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                    updatedState[5] = order;
                    console.log('good');
                    updatedState[6] = order;
                  }
                  else {
                    updatedState[5] = order;
                    console.log('genius');
                    updatedState[6] = pendiente;
                  }
                  return {
                    ...prevState,
                    [post.type]: updatedState,
                  };
                });
              }
              else {
                bibliographySection.style.border = 'none';
                bibliographySection.title = '';
              }
            }
          });
          // if anexos section isn't detected, set the value to null
          if (!isAnexos && post.type) {
            console.log('But this is false what is the reason?');
            setSectionCheckBadge(prevState => {
              const updatedState = [...prevState[post.type]];
              updatedState[sectionCheckBadge[post?.type].length - 1] = null;
              return {
                ...prevState,
                [post.type]: updatedState,
              };
            });
            // essay paper section check
            if (post.type == 'Ensayo') {
              Array.from(sectionTitleElements).some((title, index) => {
                if (title.textContent.toLowerCase().trim() == 'conclusiones') {
                  if (index == sectionTitleElements.length - 2) {
                    setSectionCheckBadge(prevState => {
                      title.style.border = 'none';
                      title.title = '';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
            if (post.type == 'Doc. Académico') {
              Array.from(sectionTitleElements).some((title, index) => {
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
          }
          // If anexos exist
          if (isAnexos) {
            if (post.type == 'Ensayo') {
              Array.from(sectionTitleElements).some((title, index) => {
                if (title.textContent.toLowerCase().trim() == 'conclusiones') {
                  if (index == sectionTitleElements.length - 3) {
                    setSectionCheckBadge(prevState => {
                      title.style.border = 'none';
                      title.title = '';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() == 'anexos') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[2] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[2] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
            if (post.type == 'Doc. Académico') {
              Array.from(sectionTitleElements).some((title, index) => {
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() == 'anexos') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
          }

        } catch (error) {
          console.error("Error accessing iframe content:", error);
        }
      };
      // get section titles after some changes
      try {
        setIsAnexos(false);
        setSectionCheckBadge(baseSectionCheckBadge);
        const sectionTitleElements = iframe.contentWindow.document.body.getElementsByTagName("h2");
        Array.from(sectionTitleElements).map((sectionElement, index) => {
          const title = sectionElement.textContent.toLowerCase().trim();
          if (title == 'anexos') {
            setIsAnexos(true);
          }
          if (standardTitles.includes(title)) {
            // section order check
            // scientific paper check
            if (post.type == 'Art. Científico') {
              if (sectionElement.textContent.toLowerCase().trim() == standardTitles[index]) {
                sectionElement.style.border = 'none';
                sectionElement.title = '';
                setSectionCheckBadge(prevState => {
                  // console.log(index);
                  const updatedState = [...prevState[post?.type]];
                  updatedState[index] = check;
                  return {
                    ...prevState,
                    [post.type]: updatedState,
                  };
                })
              }
              else {
                // if the title belong to standard titles but the position doesn't equal to origin postion. In this case, first find the index in standard title and then set state to 'order'
                setSectionCheckBadge(prevState => {
                  const updatedState = [...prevState[post.type]];
                  updatedState[index] = pendiente;
                  updatedState[standardTitles.indexOf(title)] = order;
                  return {
                    ...prevState,
                    [post.type]: updatedState,
                  };
                });
                sectionElement.style.border = '2.5px solid red';
                sectionElement.title = 'Esta sección no corresponde al orden requerido: Resumen, Palabras Clave (opcional), introducción, Metodología, Resultados, Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
              }
            }
          }
          else {
            setSectionCheckBadge(prevState => {
              const updatedState = [...prevState[post.type]];
              if (updatedState[index] != order && index < sectionCheckBadge[post.type].length) {
                console.log(index);
                // updatedState[index] = pendiente;
              };
              return {
                ...prevState,
                [post.type]: updatedState,
              };
            })
            // un-neccessary section title check in scientific paper
            if (post.type == 'Art. Científico') {
              sectionElement.style.border = '2.5px solid red';
              sectionElement.title = 'Esta sección no corresponde al orden requerido: Resumen, Palabras Clave (opcional), introducción, Metodología, Resultados, Conclusiones, Bibliografía, y Anexos (opcional).';
            }
          }
        });
        // anxios optional section checkc
        Array.from(sectionTitleElements).map((sectionElement, index) => {
          const title = sectionElement.textContent.toLowerCase().trim();
          if (gratidudeSections.includes(title)) {
            setIsAnexos(true);
            sectionElement.title = 'Toda información sobre agradecimiento y reconocimiento debe estar en la sección final de Anexos. Mueve esta sección al área correspondiente, o declara el título correspondiente de Anexos arriba de esta sección para continuar';
            // If anxios exist, set badge to 'order'
            setSectionCheckBadge(prevState => {
              const updatedState = [...prevState[post.type]];
              if (Array.from(sectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                updatedState[6] = order;
              };
              return {
                ...prevState,
                [post.type]: updatedState,
              };
            });
          }
          // people may include graphs and images or tables below the bibliography, so these are anexus, but do not include the correspondent "Anexos" title, so the anexus section is not declare, this is another "Pendiente" bridge on anexos.
          if (title == 'bibliografía') {
            const bibliographySection = Array.from(sectionTitleElements)[index]?.parentNode;
            if (bibliographySection.querySelector('img') || bibliographySection.querySelector('table')) {
              setIsAnexos(true);
              bibliographySection.style.border = '2.5px solid red';
              bibliographySection.title = 'Hay elementos no reconocidos en la bibliografía, elimínalos o revisa si debes agregar una sección de anexos al final';
              setSectionCheckBadge(prevState => {
                const updatedState = [...prevState[post.type]];
                if (Array.from(sectionTitleElements).some(element => element.textContent.toLowerCase().trim().includes("anxeos"))) {
                  updatedState[5] = order;
                  console.log('good');
                  updatedState[6] = order;
                }
                else {
                  updatedState[5] = order;
                  console.log('genius');
                  updatedState[6] = pendiente;
                }
                return {
                  ...prevState,
                  [post.type]: updatedState,
                };
              });
            }
            else {
              bibliographySection.style.border = 'none';
              bibliographySection.title = '';
            }
          }
        });
        setTimeout(() => {
          // if anexos section isn't detected, set the value to null
          if (!isAnexos && post.type) {
            setSectionCheckBadge(prevState => {
              const updatedState = [...prevState[post.type]];
              updatedState[sectionCheckBadge[post?.type].length - 1] = null;
              return {
                ...prevState,
                [post.type]: updatedState,
              };
            });
            // essay paper section check
            if (post.type == 'Ensayo') {
              Array.from(sectionTitleElements).some((title, index) => {
                if (title.textContent.toLowerCase().trim() == 'conclusiones') {
                  if (index == sectionTitleElements.length - 2) {
                    setSectionCheckBadge(prevState => {
                      title.style.border = 'none';
                      title.title = '';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
            if (post.type == 'Doc. Académico') {
              Array.from(sectionTitleElements).some((title, index) => {
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
          }
          // If anexos exist
          if (isAnexos) {
            if (post.type == 'Ensayo') {
              Array.from(sectionTitleElements).some((title, index) => {
                if (title.textContent.toLowerCase().trim() == 'conclusiones') {
                  if (index == sectionTitleElements.length - 3) {
                    setSectionCheckBadge(prevState => {
                      title.style.border = 'none';
                      title.title = '';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() == 'anexos') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[2] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Conclusiones, Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[2] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
            if (post.type == 'Doc. Académico') {
              Array.from(sectionTitleElements).some((title, index) => {
                // essay paper bibliografia section check
                if (title.textContent.toLowerCase().trim() == 'bibliografía') {
                  if (index == sectionTitleElements.length - 2) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[0] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
                if (title.textContent.toLowerCase().trim() == 'anexos') {
                  if (index == sectionTitleElements.length - 1) {
                    title.style.border = 'none';
                    title.title = '';
                    setSectionCheckBadge(prevState => {
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = check;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                  else {
                    setSectionCheckBadge(prevState => {
                      title.style.border = '2.5px solid red';
                      title.title = 'Esta sección no corresponde al orden requerido para las secciones finales: Bibliografía, y Anexos (opcional). Ajusta su posición para continuar';
                      const updatedState = [...prevState[post.type]];
                      updatedState[1] = order;
                      return {
                        ...prevState,
                        [post.type]: updatedState,
                      };
                    });
                  }
                }
              })
            }
          }
        }, 0.1);

      } catch (error) {
        console.error("Error accessing iframe content:", error);
      }
    }
  }, [complianceView, changedContent]);

  return (
    <article className="flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap">
      <div className="flex flex-row items-center justify-between border-[1px] border-transparent rounded-none border-b-black">
        <h2 id="title" className="col-span-4 text-4xl cursor-pointer">{post.title}</h2>
        {isCurrentUserAuthor && !editMode && !postApproved && (
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
            <Compliace form={post} sectionTitles={sectionTitles} sections={sections} sectionCheckBadge={sectionCheckBadge} check={check} />
          </aside>
        )}
      </div>
      <div className="p-2 mt-2 w-[100%] inline-block text-center">
        <span className="font-semibold text-[1.2rem] text-red-600">
          Límites de publicación
        </span>
        <span className="ps-2">(Incorrección política, Falta de coherencia, Exceder el nivel aceptable de contenido generado por IA, Longitud del título)</span>
      </div>
    </article>
  );
};

export default PostView;
