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
  type: "essay",
};

const NewPost = (props) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const { user } = useUser({ redirectTo: "/" });
  const [showPreview, setShowPreview] = useState(false);
  const [editView, setEditView] = useState(false);
  const [suggestionView, setSuggestionView] = useState(false);
  const [formState, setFormState] = useState(formBaseState);
  const [previewIframe, setPreviewIframe] = useState(null);
  const [isSaved, setIsSaved] = useState(true);
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
      "Los campos con (*) son requeridos. Debes guardar tu publicación para enviar a aprobación.",
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
              const loadedMonograph = await getHTML(
                `/api/${files.url.replace(
                  "https://www.datocms-assets.com/",
                  ""
                )}`
              );
              setPreviewIframe(loadedMonograph);
            }
            if (
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

  const hidePreview = (e) => {
    if (isSaved == true) {
      e.preventDefault();
      setShowPreview(false);
      setEditView(false);
      setSuggestionView(false);
    } else {
      notifyError("El documento no fue guardado.");
    }
  };

  const editViewSet = (e) => {
    e.preventDefault();
    setEditView(!editView);
    if (editView == true) {
      setSuggestionView(false);
    }
  };

  const suggestionViewSet = (e) => {
    e.preventDefault();
    setSuggestionView(!suggestionView);
  };

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

  return (
    <Main>
      {showPreview && (
        <TopBar>
          <a
            className="text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1"
            onClick={hidePreview}
            children="<div Volver a archivo"
          />
          <div>
            {editView && (
              <a
                className="text-other mr-8 text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1"
                onClick={suggestionViewSet}
                children={`${
                  suggestionView ? "Ocultar Sugerencia" : "Mostrar sugerencia"
                }`}
              />
            )}
            <a
              className="text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1"
              onClick={editViewSet}
              children={!editView ? "Editar documento" : "Cerrar editor"}
            />
            <a
              className="text-other ml-8 text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1"
              onClick={saveDocument}
              children="Guardar documento"
            />
          </div>
        </TopBar>
      )}
      {!showPreview && (
        <TopBar>
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
        </TopBar>
      )}
      {showPreview ? (
        <PostView
          post={formState}
          user={user}
          previewIframe={previewIframe}
          editView={editView}
          suggestionView={suggestionView}
          setIsSaved={setIsSaved}
          {...props}
        />
      ) : (
        <PostForm
          refs={refs}
          form={formState}
          doSubmit={doSubmit}
          clearForm={clearSubmitForm}
          onChange={onChange}
          requestApproval={requestApproval}
          formHasChanged={formHasChanged}
          setShowPreview={doShowPreview}
          user={user}
          setAgreedterms={setAgreedterms}
          setCoAuthors={setCoAuthors}
          removeCoAuthor={removeCoAuthor}
          {...props}
        />
      )}
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
