import { useState, useRef, useCallback } from "react";
import axios from "axios";
import useUser from "utils/useUser";
import withSession from "utils/withSession";
import {
  createEntry,
  updateEntry,
  upload,
  publishEntry,
  getHTML,
} from "handlers/bll";
import {
  request,
  GET_ALL_COURSES,
  GET_ALL_STUDENTS,
} from "utils/graphqlRequest";
import { POST_REVIEW_STATUS, isUserTeacherOfCourse } from "utils";

import Main from "components/Main/Main";
import PostForm from "components/Posts/PostForm";
import PostView from "components/Posts/PostView";
import TopBar from "components/TopBar/TopBar";
import Loader from "components/Loader/Loader";

import { toast } from "react-hot-toast";

import { Tooltip } from "@mui/material";

const notifyError = (warningMessage) =>
  toast.error(warningMessage, {
    duration: 5000,
  });

const formBaseState = {
  title: "",
  description: "",
  coverimage: "",
  course: null,
  attachments: null,
  monograph: null,
  error: false,
  tags: "",
  coauthors: null,
  agreedterms: false,
  review: POST_REVIEW_STATUS.PENDING,
  type: "",
};

const NewPost = ({ setIsSaved, ...props }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const { user } = useUser({ redirectTo: "/" });
  const [showPreview, setShowPreview] = useState(false);
  // display WYSIWYG Editor
  const [editView, setEditView] = useState(false);
  // compliance pannel display
  const [complianceView, setCompliaceView] = useState(false)
  // set post form state
  const [formState, setFormState] = useState(formBaseState);
  // this is converted html content. once upload is completed, set iframe content by previewIframe from loaded monograph
  const [previewIframe, setPreviewIframe] = useState(null);

  // set post form view PostForm : PostView
  const [formView, setFormView] = useState(true)
  const clearSubmitForm = () => {
    setFormState(formBaseState);
  };
  const refs = {
    attachments: useRef(),
    coverimage: useRef(),
    monograph: useRef(),
    agreedterms: useRef(),
  };

  const [statusBarState, setStatusBarState] = useState({
    error: null,
    success:
      "Los campos con (*) son requeridos.",
  });

  const triggerLoading = (show) => {
    if (show) {
      document
        .getElementsByTagName("body")[0]
        .classList.add("htmlBackgroundBackdrop");
      setShowLoadingScreen(true);
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("htmlBackgroundBackdrop");
      setShowLoadingScreen(false);
    }
  };

  const doSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      triggerLoading(true);
      const { id, error, monographView, ...postData } = formState;

      if (isUserTeacherOfCourse(user, props.courses)) {
        postData.review = POST_REVIEW_STATUS.APPROVED;
      }

      let entry;
      if (postData.id) {
        entry = await updateEntry(postData);
      } else {
        entry = await createEntry({
          author: user.id,
          ...postData,
        });
      }

      if (entry?.error) {
        console.error("No se pudo actualizar la entrada", entry?.error);
        setStatusBarState({
          success: null,
          error: "No se pudo guardar la entrada",
        });
      } else {
        setFormState({ ...entry, ...postData });
        setStatusBarState({
          error: null,
          success:
            'Publicación guardada. Debes "Solicitar aprobación" para ser enviada a aprobación',
        });
      }

      triggerLoading(false);
    },
    [formState]
  );

  const onChange = useCallback(
    async (e, name) => {
      let itemValue;
      if (refs[name]) {
        const _files = refs[name]?.current?.files;
        if (_files) {
          triggerLoading(true);
          if (e.target.name === "monograph") {
            let file_type = _files[0].name.split(".").pop();
            if (file_type == "html") {
              const files = await upload(_files, true);
              itemValue = files;
              console.log('this is files==>', files);
              const loadedMonograph = await getHTML(
                `/api/${files.url.replace(
                  "https://www.datocms-assets.com/",
                  ""
                )}`
              );
              setPreviewIframe(loadedMonograph);
            }
            else if (
              file_type == "pdf" ||
              file_type == "docx" ||
              file_type == "doc" ||
              file_type == "rtf"
            ) {
              const formData = new FormData();
              formData.append("file", _files[0]);

              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_WINDOWS_SERVER_URL}/filetohtml`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      "ngrok-skip-browser-warning": "true"
                    },
                  }
                );
                const htmlFile = new File([response.data], "response.html", {
                  type: "text/html",
                });
                console.log("HTML conversion succeed. Now file uploading...");
                const files = await upload([htmlFile], true);
                itemValue = files;
                const loadedMonograph = await getHTML(
                  `/api/${files.url.replace(
                    process.env.NEXT_PUBLIC_DATOCMS_STORAGE_URL,
                    ""
                  )}`
                );
                setPreviewIframe(loadedMonograph);
              } catch (error) {
                console.log("Error uploading file:", error);
              }
            }
            else {
              notifyError("No logramos reconocer el formato del documento adjunto. Revisa que sea el archivo correcto, o inténtalo con otras versiones de archivo HTML, Word o PDF");
              e.target.value = null;
            }
          } else {
            const files = await upload(_files, true);
            itemValue = files;
          }
          triggerLoading(false);
        } else {
          itemValue = refs[name].current.checked;
        }
      } else {
        itemValue = e.target.value;
      }
      delete formState[name];
      setFormState({ [name]: itemValue, ...formState });
    },
    [formState]
  );

  const requestApproval = useCallback(async () => {
    triggerLoading(true);
    await publishEntry(formState.id);
    setStatusBarState({
      error: null,
      success:
        "Tu publicación ha sido enviada a aprobación, ve a tu perfil para verla",
    });
    triggerLoading(false);
  }, [formState]);


  const doShowPreview = useCallback(
    async (e) => {
      e.preventDefault();
      if (!previewIframe && formState?.monograph) {
        const loadedMonograph = await getHTML(
          `/api/${formState?.monograph.url.replace(
            "https://www.datocms-assets.com/",
            ""
          )}`
        );
        setPreviewIframe(loadedMonograph);
      }
      setShowPreview(true);
    },
    [formState]
  );

  const setAgreedterms = useCallback(
    async (e) => {
      e.preventDefault();
      const { agreedterms, ...restFormState } = formState;
      restFormState.agreedterms = !agreedterms;
      setFormState(restFormState);
    },
    [formState]
  );

  const setCoAuthors = useCallback(
    async (e, selectedCoAuthor) => {
      e.preventDefault();
      const { coauthors, ...restFormState } = formState;
      let selectedCoauthors = coauthors || [];
      selectedCoauthors.push(selectedCoAuthor);
      restFormState.coauthors = selectedCoauthors;
      setFormState(restFormState);
    },
    [formState]
  );

  const removeCoAuthor = useCallback(
    async (e, coAuthorId) => {
      e.preventDefault();
      const { coauthors, ...restFormState } = formState;
      const removeCoAuthorIndex = coauthors.findIndex(
        (coAuthor) => coAuthor.id === coAuthorId
      );
      coauthors.splice(removeCoAuthorIndex, 1);
      restFormState.coauthors = coauthors;
      setFormState(restFormState);
    },
    [formState]
  );

  const formHasChanged = formState !== formBaseState;

  // first check all section title exist, if not display error and then save edited html
  const saveDocument = async () => {
    let errorFlag = false;
    const iframe = document.getElementById("documentWindow");
    // check section title
    const sectionTitleElements =
      iframe.contentWindow.document.body.getElementsByTagName("h2");
    const sectionTitles = [];
    for (let i = 0; i < sectionTitleElements.length; i++) {
      sectionTitles.push(sectionTitleElements[i].textContent);
    }
    const essay = ["Bibliografía"];
    const theory = ["Bibliografía"];
    const science = [
      "Resumen",
      "Introducción",
      "Metodología",
      "Resultados",
      "Conclusiones",
      "Bibliografía",
    ];
    let type = [];
    if (formState.type == "essay") type = essay;
    if (formState.type == "theory") type = theory;
    if (formState.type == "science") type = science;
    const sectionTitlesLower = sectionTitles.map((item) =>
      item.toLowerCase().trim()
    );
    const typeLower = type.map((item) => item.toLowerCase().trim());
    typeLower.forEach((item) => {
      // Check if the item is not present in the second list
      if (!sectionTitlesLower.includes(item)) {
        notifyError(
          `La sección ${item} no aparece en los títulos de las secciones`
        );
        errorFlag = true;
      }
    });
    // upload edited html document
    if (errorFlag == false) {
      setIsSaved(true);
      const iframeContent =
        iframe.contentWindow.document.head.innerHTML +
        iframe.contentWindow.document.body.innerHTML;
      const htmlFile = new File([iframeContent], "monograph.html", {
        type: "text/html",
      });
      triggerLoading(true);
      const files = await upload([htmlFile], true);
      const loadedMonograph = await getHTML(
        `/api/${files.url.replace("https://www.datocms-assets.com/", "")}`
      );
      setPreviewIframe(loadedMonograph);
      triggerLoading(false);
      delete formState["monograph"];
      setFormState({ ["monograph"]: files, ...formState });
    }
  };

  const warning = () => {
    alert("Warning")
  }

  return (
    <Main>
      <TopBar>
        <div className="flex flex-row justify-between w-full">
          <div>
            {(statusBarState.error || statusBarState.success) && (
              <h5
                className={
                  statusBarState.error
                    ? "text-error text-2xl"
                    : "text-primary text-2xl"
                }
              >
                {statusBarState.error || statusBarState.success}
              </h5>
            )}
          </div>
          <div className="flex items-center">
            <a
              className={`${formView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
              onClick={() => {
                setFormView(true);
                setShowPreview(false);
                setEditView(false);
                setCompliaceView(false);
              }}
              children="Formulario"
            />
            <a
              className={`${showPreview ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-16 text-2xl`}
              onClick={() => {
                setShowPreview(true);
                setFormView(false);
                setEditView(false);
                setCompliaceView(false);
              }}
              children="Vista previa"
            />
            <a
              className={`${editView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
              onClick={() => {
                setEditView(true);
                setShowPreview(false);
                setFormView(false);
                setCompliaceView(false);
              }}
              children="Editor"
            />
            <a
              className={`${complianceView ? 'text-zinc-400' : 'text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-8 text-2xl`}
              onClick={() => {
                setCompliaceView(true);
                setEditView(false);
                setShowPreview(false);
                setFormView(false);
              }}
              children="Cumplimiento"
            />
            <div className="cursor-pointer ml-3" onClick={warning}>
              <Tooltip title='Tu documento ahora cumple con todos los requerimientos, puedes enviarlo a publicar cuando gustes' arrow>
                <img src='/warning.png' className="w-8"></img>
              </Tooltip>
            </div>
            <a
              className={`text-other cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'} ml-3 text-2xl`}
              onClick={saveDocument}
              children="Guardar"
            />
          </div>
        </div>
      </TopBar>
      <PostForm
        refs={refs}
        form={formState}
        doSubmit={doSubmit}
        clearForm={clearSubmitForm}
        onChange={onChange}
        requestApproval={requestApproval}
        formHasChanged={formHasChanged}
        user={user}
        setAgreedterms={setAgreedterms}
        setCoAuthors={setCoAuthors}
        removeCoAuthor={removeCoAuthor}
        formView={formView}
        {...props}
      />
      <PostView
        post={formState}
        user={user}
        previewIframe={previewIframe}
        editView={editView}
        showPreview={showPreview}
        complianceView={complianceView}
        setIsSaved={setIsSaved}
        {...props}
      />
      <Loader show={showLoadingScreen} />
    </Main>
  );
};
export default NewPost;

export const getServerSideProps = withSession(async function ({ req }) {
  const currentUser = req.session.get("user");
  if (!currentUser) {
    return { props: {} };
  }
  const { allUsers, allCourses } = await request([
    GET_ALL_COURSES(currentUser.id),
    GET_ALL_STUDENTS,
  ]);
  return {
    props: { courses: allCourses, students: allUsers },
  };
});
