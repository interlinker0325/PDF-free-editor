import { useCallback, useEffect, useRef, useState } from "react";
import { isAdmin, isUserTeacherOfCourse, isValidFileType, isValidImageType, POST_REVIEW_STATUS } from "../utils";
import { createEntry, getMonograph, updateEntry, upload } from "../handlers/bll";
import { enqueueSnackbar } from "notistack";
import { checkCompliance, fileToHTML } from "../utils/server/windows";

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

export default function usePost({ user, post, isSaved, setIsSaved, courses } = {}) {
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

  const removeCoAuthor = useCallback(async (e, coAuthorId) => {
    e.preventDefault();
    const { coauthors, ...restFormState } = formState;
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

  const saveDocument = async (approval) => {
    try {
      triggerLoading(true);
      const iframeContent = getFrameContent();
      const htmlFile = new File([iframeContent], "monograph.html", {
        type: "text/html",
      });
      const oldFileId = formState?.monograph?.id || null
      const file = await upload([htmlFile], true, oldFileId);
      const loadedMonograph = await getMonograph(file)
      setPreviewIframe(loadedMonograph);
      const { id, error, monographView, ...postData } = formState;
      console.log("FORM STATE:", formState);
      const action = formState?.id ? updateEntry : createEntry;
      const entry = await action({
        ...postData,
        ...(formState?.id ? { id: formState?.id } : {}),
        author: formState?.author?.id || user?.id,
        review: isAdmin(user?.role?.id) ? postData.review : approval ? POST_REVIEW_STATUS.PENDING : POST_REVIEW_STATUS.DRAFT,
        monograph: file
      });
      console.log({ entry })
      setIsSaved(true);
      setFormState({ ...formState, ["monograph"]: file, });
      enqueueSnackbar('Tu documento se ha guardado satisfactoriamente',
        {
          variant: 'success',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Algo salio mal guardando la publicación',
        {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        });
    } finally {
      triggerLoading(false);
    }
  };

  const requestApproval = useCallback(async () => {
    setOpen(false);
    triggerLoading(true);
    // TODO: Validate with Hao
    // const iframeContent = getFrameContent();
    // const checkResult = await checkCompliance(iframeContent);
    // console.log({checkResult})
    // setLogicCheck(checkResult.data);

    // if (checkResult.data?.isTrue === "true") {
    await saveDocument(true);

    setStatusBarState({
      error: null,
      success:
        "Tu publicación ha sido enviada a aprobación, ve a tu perfil para verla",
    });
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
    // } else if (checkResult.data?.reasons?.length) {
    //   checkResult.data.reasons.map(reason => (
    //     enqueueSnackbar(
    //       reason,
    //       {
    //         variant: 'warning',
    //         preventDuplicate: true,
    //         anchorOrigin: {
    //           vertical: 'bottom',
    //           horizontal: 'center'
    //         }
    //       })
    //   ))
    // } else {
    //   enqueueSnackbar(
    //     'Se produjo un error con nuestra IA. Por favor, inténtalo de nuevo más tarde.',
    //     {
    //       variant: 'error',
    //       preventDuplicate: true,
    //       anchorOrigin: {
    //         vertical: 'bottom',
    //         horizontal: 'center'
    //       }
    //     });
    // }
    triggerLoading(false);

  }, [formState.id, courses]);

  const handlePublication = () => {
    setOpen(true);
  };

  const onChange = useCallback(async (e, name) => {
    const { name: inputName, value } = e.target;
    const _files = refs[name]?.current?.files;
    const file_length = _files?.length;

    let itemValue = value;

    if (_files && inputName === "monograph") {
      if (!e.target.files || e.target.files.length === 0) {
        // No files selected, user canceled the upload
        return;
      }
      itemValue = await handleMonographFile(e, _files[file_length - 1]);
      e.target.value = '';
    } else if (_files && inputName === "coverimage") {   //image validate
      itemValue = await handleImageFile(e, _files);
    } else if (_files) {
      triggerLoading(true);                 //loading is added
      itemValue = await upload(_files, true);
      triggerLoading(false);                //loading is
    } else if (refs[name]) {
      itemValue = refs[name]?.current?.checked;
    }

    setFormState({
      ...formState, [name]: itemValue,
    });

  }, [refs, formState]);

  //image validate fuction
  const handleImageFile = async (event, _files) => {
    let itemValue;
    const imageType = _files[_files.length - 1].name.split(".").pop();

    if (!isValidImageType(imageType)) {
      enqueueSnackbar("No logramos reconocer el formato del documento adjunto. Revisa que sea el archivo correcto, o inténtalo con otras versiones de archivo Image.");
      event.target.value = null;
      return;
    }
    triggerLoading(true);
    try {
      itemValue = await upload(_files, true);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      triggerLoading(false);
    }

    return itemValue;
  }

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
      console.log(checkResult.data, "-----data check-----");
      setLogicCheck(checkResult.data);
      const htmlFile = new File([htmlData.data], `${fileName}.html`, {
        type: "text/html",
      });
      const uploadedFiles = await upload([htmlFile], true);
      console.log(uploadedFiles, "-----upload file----");
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
    console.log({ formState })
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
      enqueueSnackbar('Para guardar un borrador debes tener lo siguiente: 1. Título de la publicación en la sección de formulario. \n 2.	Contenido, importado o creado por ti mismo en el editor. \n 3.Tipo de publicación.',
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
    console.log({ post })
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
