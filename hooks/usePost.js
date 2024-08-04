import {useCallback, useEffect, useRef, useState} from "react";
import {isUserTeacherOfCourse, isValidFileType, POST_REVIEW_STATUS} from "../utils";
import {createEntry, getMonograph, updateEntry, upload} from "../handlers/bll";
import {enqueueSnackbar} from "notistack";
import {checkCompliance, fileToHTML} from "../utils/server/windows";

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
  post_type: "",
};

export default function usePost({user, post, isSaved, setIsSaved, courses} = {}) {
  const [formState, setFormState] = useState(formBaseState);
  const [open, setOpen] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);// this is converted HTML content. once upload is completed, set iframe content by previewIframe from loaded monograph
  const [previewIframe, setPreviewIframe] = useState(null);

  // display WYSIWYG Editor
  const [editView, setEditView] = useState(false);
  // compliance pannel display
  const [complianceView, setComplianceView] = useState(false)
  // set post form view PostForm : PostView
  const [formView, setFormView] = useState(true)
  const [showPreview, setShowPreview] = useState(false);

  const [logicCheck, setLogicCheck] = useState(null)
  const [allPass, setAllPass] = useState(false);

  const [statusBarState, setStatusBarState] = useState({
    error: null,
    success: 'Los campos con (*) son requeridos.'
  });

  const refs = {
    attachments: useRef(),
    coverimage: useRef(),
    monograph: useRef(),
    agreedterms: useRef()
  };

  const setAgreedTerms = useCallback(
    async (e) => {
      e.preventDefault();
      const {agreedterms, ...restFormState} = formState;
      restFormState.agreedterms = !agreedterms;
      setFormState(restFormState);
    },
    [formState]
  );

  const setCoAuthors = useCallback(
    async (e, selectedCoAuthor) => {
      e.preventDefault();
      const {coauthors, ...restFormState} = formState;
      let selectedCoauthors = coauthors || [];
      selectedCoauthors.push(selectedCoAuthor);
      restFormState.coauthors = selectedCoauthors;
      setFormState(restFormState);
    },
    [formState]
  );

  const removeCoAuthor = useCallback(async (e, coAuthorId) => {
    e.preventDefault();
    const {coauthors, ...restFormState} = formState;
    const removeCoAuthorIndex = coauthors.findIndex(coAuthor => coAuthor.id === coAuthorId);
    coauthors.splice(removeCoAuthorIndex, 1);
    restFormState.coauthors = coauthors;
    setFormState(restFormState)
  }, [formState])

  const clearSubmitForm = () => {
    setFormState(post || formBaseState);
  };

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

  function getFrameContent() {
    const iframe = document.getElementById("documentWindow");
    return iframe.contentWindow.document.head.innerHTML +
      iframe.contentWindow.document.body.innerHTML;
  }

// first check all section title exist, if not display error and then save edited HTML
  const saveDocument = async (approval) => {
    setIsSaved(true);
    const iframeContent = getFrameContent();
    const htmlFile = new File([iframeContent], "monograph.html", {
      type: "text/html",
    });
    triggerLoading(true);
    const oldFileId = formState?.monograph?.id || null
    const file = await upload([htmlFile], true, oldFileId);
    const loadedMonograph = await getMonograph(file)
    setPreviewIframe(loadedMonograph);
    const {id, error, monographView, ...postData} = formState;

    const action = formState?.id ? updateEntry : createEntry
    const entry = await action({
      ...postData,
      ...(formState?.id ? {id: formState?.id} : {}),
      author: user.id,
      review: approval ? POST_REVIEW_STATUS.PENDING : POST_REVIEW_STATUS.DRAFT,
      monograph: file
    });
    console.log({entry})
    triggerLoading(false);
    setFormState({...formState, ["monograph"]: file,});
    enqueueSnackbar('Tu documento se ha guardado satisfactoriamente',
      {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      });

  };

  const requestApproval = useCallback(async () => {
    setOpen(false);
    triggerLoading(true);
    const iframeContent = getFrameContent();
    const checkResult = await checkCompliance(iframeContent);
    console.log({checkResult})
    setLogicCheck(checkResult.data);

    await saveDocument(true);

    setStatusBarState({
      error: null,
      success:
        "Tu publicación ha sido enviada a aprobación, ve a tu perfil para verla",
    });
    triggerLoading(false);
    enqueueSnackbar(
      'Tu publicación ha sido enviada para aprobación, en un par de semanas recibirás una notificación al respecto',
      {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      });
  }, [isSaved, formState.id]);

  const doSubmit = useCallback(
    async (e) => {
      e && e.preventDefault();
      triggerLoading(true);
      const {id, error, monographView, ...postData} = formState;

      if (isUserTeacherOfCourse(user, courses)) {
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
      console.log({entry})

      if (entry?.error) {
        console.error("No se pudo actualizar la entrada", entry?.error);
        setStatusBarState({
          success: null,
          error: "No se pudo guardar la entrada",
        });
      } else {
        setFormState({...entry, ...postData});
        setStatusBarState({
          error: null,
          success:
            'Publicación guardada. Debes "Solicitar aprobación" para ser enviada a aprobación',
        });
      }

      triggerLoading(false);
    },
    [formState, user, courses]
  );

  const handlePublication = () => {
    setOpen(true);
  };

  const onChange = useCallback(async (e, name) => {
    const {name: inputName, value} = e.target;
    const _files = refs[name]?.current?.files;

    let itemValue = value;

    if (_files && inputName === "monograph") {
      itemValue = await handleMonographFile(e, _files[0]);
    } else if (_files) {
      itemValue = await upload(_files, true);
    } else if (refs[name]) {
      itemValue = refs[name]?.current?.checked;
    }

    setFormState({
      ...formState, [name]: itemValue,
    });

  }, [refs, formState]);

// Handler function for monograph files
  const handleMonographFile = async (event, file) => {
    const fileType = file.name.split(".").pop();
    const fileName = file.name.split('.')[0];

    if (!isValidFileType(fileType)) {
      enqueueSnackbar("No logramos reconocer el formato del documento adjunto. Revisa que sea el archivo correcto, o inténtalo con otras versiones de archivo HTML, Word o PDF");
      event.target.value = null;
      return;
    }

    try {
      triggerLoading(true);
      const htmlData = await fileToHTML(file);
      const checkResult = await checkCompliance(htmlData.data);
      setLogicCheck(checkResult.data);
      const htmlFile = new File([htmlData.data], `${fileName}.html`, {
        type: "text/html",
      });
      const uploadedFiles = await upload([htmlFile], true);
      const loadedMonograph = await getMonograph(uploadedFiles);
      setPreviewIframe(loadedMonograph);
      triggerLoading(false);
      return uploadedFiles;
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };


  const handleSave = async () => {
    console.log("SAVING...")
    // alert(formState.title)
    const iframe = document.getElementById("documentWindow");
    const isContent = Boolean(iframe.contentWindow.document.body.innerText.trim());
    const isTitle = Boolean(formState.title.trim())
    const haveType = !!formState.post_type;
    console.log({formState})
    if (isContent && isTitle && haveType) {
      await saveDocument();
    } else if (!haveType) {
      enqueueSnackbar('Para guardar, seleccionar el tipo de publicación.',
        {
          variant: 'warning',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        });
    } else {
      enqueueSnackbar('Para guardar, anota el título en la sección de Formulario, incluye un documento Word o PDF, o pasa directamente al Editor donde puedes agregar bloques de texto e iniciar tu publicación directamente',
        {
          variant: 'warning',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        });
    }
  };

  useEffect(() => {
    if (!post) return
    setFormState(post);
    setPreviewIframe(post?.monographView);
  }, [post]);

  return {
    refs,
    open,
    previewIframe,
    formState,
    formBaseState,
    setFormState,
    setAgreedTerms,
    setCoAuthors,
    setPreviewIframe,
    removeCoAuthor,
    showPreview,
    setShowPreview,
    doSubmit,
    editView,
    setEditView,
    complianceView,
    setComplianceView,
    formView,
    setFormView,
    logicCheck,
    setLogicCheck,
    allPass,
    setAllPass,
    onChange,
    handleSave,
    handlePublication,
    saveDocument,
    triggerLoading,
    clearSubmitForm,
    requestApproval,
    statusBarState,
    setStatusBarState,
    showLoadingScreen,
    setShowLoadingScreen,
  }
}
