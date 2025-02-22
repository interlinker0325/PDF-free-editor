import {useCallback, useEffect, useRef, useState} from "react";
import {isAdmin, isValidFileType, isValidImageType, POST_REVIEW_STATUS} from "@/utils";
import {createEntry, getMonograph, updateEntry, upload} from "@/handlers/bll";
import {checkCompliance, convertFileToHTML} from "@/utils/server/windows";
import useAlert from "@/hooks/useAlert";
import _ from "lodash";
import {enqueueSnackbar} from "notistack";

/**
 * @typedef {Object} Author
 * @property {string} fullname - The full name of the author.
 * @property {string} id - The ID of the author.
 */

/**
 * @typedef {Object} FileDetails
 * @property {string} id - The ID of the file.
 * @property {string} filename - The name of the file.
 * @property {string|null} title - The title of the file, if any.
 * @property {string} url - The URL of the file.
 */

/**
 * @typedef {Object} FormData
 * @property {Author} author - The primary author of the post.
 * @property {Array<Author>} coauthors - A list of co-authors for the post.
 * @property {FileDetails} coverimage - Details about the cover image.
 * @property {string} createdAt - The creation date of the post (ISO 8601 format).
 * @property {string} description - A description of the post.
 * @property {Array<FileDetails>} attachments - A list of attachment files.
 * @property {string} id - The unique identifier of the post.
 * @property {FileDetails} monograph - Details about the monograph file.
 * @property {string} title - The title of the post.
 * @property {string} tags - Tags associated with the post.
 * @property {string} updatedAt - The last update date of the post (ISO 8601 format).
 * @property {string} review - The review status of the post (e.g., "Borrador").
 * @property {boolean} agreedterms - Whether the terms have been agreed to.
 * @property {string} post_type - The type of the post (e.g., "Ensayo").
 * @property {string} monographView - The HTML content of the monograph.
 */
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
  sharing: false,
  review: POST_REVIEW_STATUS.PENDING,
  post_type: "",
};

/**
 * A hook to manage post form functionality, including saving, updating, and validation.
 *
 * @param {Object} [params] - Parameters for the hook.
 * @param {Object} [params.user] - The current user.
 * @param {Object} [params.post] - The post data.
 * @param {Function} [params.setIsSaved] - Callback to set the saved state.
 * @returns {Object} An object with post-related states and functions.
 */
export default function usePost({user, post, setIsSaved,} = {}) {
  const [formState, setFormState] = useState(post || formBaseState);
  const [open, setOpen] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);// this is converted HTML content. once upload is completed, set iframe content by previewIframe from loaded monograph
  const [previewIframe, setPreviewIframe] = useState(null);
  const {showError, showSuccess, showWarning} = useAlert()
  // display WYSIWYG Editor
  const [editView, setEditView] = useState(false);
  // compliance pannel display
  const [complianceView, setComplianceView] = useState(false);
  // set post form view PostForm : PostView
  const [formView, setFormView] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [logicCheck, setLogicCheck] = useState(null)
  const [allPass, setAllPass] = useState(false);

  const [statusBarState, setStatusBarState] = useState({
    error: null,
    success: 'Los campos con (*) son requeridos.'
  });

  const [monograColor, setMonograColor] = useState(false);

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

  function saveFrameContent(iframeContent) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Format timestamp
    const fileName = `monograph-${timestamp}.html`;

    const htmlFile = new File([iframeContent], fileName, {
      type: "text/html",
    });
    const oldFileId = formState?.monograph?.id || null;
    console.log({formState, oldFileId});
    return upload([htmlFile], true, oldFileId)
  }

  const saveDocument = async (approval) => {
    try {
      triggerLoading(true);
      const iframeContent = getFrameContent();
      const file = await saveFrameContent(iframeContent);
      const loadedMonograph = await getMonograph(file);
      setPreviewIframe(loadedMonograph);
      const postData = _.omit(formState, ['id', 'monographView', 'error']);
      console.log("FORM STATE:", formState);
      const action = formState?.id ? updateEntry : createEntry;
      const entry = await action({
        ...postData,
        ...(formState?.id ? {id: formState?.id} : {}),
        author: formState?.author?.id || user?.id,
        review: isAdmin(user?.role?.id) ? postData.review : approval ? POST_REVIEW_STATUS.PENDING : POST_REVIEW_STATUS.DRAFT,
        monograph: file
      });
      console.log({entry})
      setIsSaved(true);
      setFormState({...formState, ["monograph"]: file, id: entry.id, createdAt: entry.createdAt});
      if (entry.error) {
        showError(`No se pudo ${approval ? "realizar" : "guardar"} la publicación`);
      } else {
        showSuccess('Tu documento se ha guardado satisfactoriamente');
      }
    } catch (error) {
      console.error(error);
      showError('Algo salió mal guardando la publicación');
    } finally {
      triggerLoading(false);
    }
  };

  const requestApproval = useCallback(async () => {
    setOpen(false);
    triggerLoading(true);
    if (!formState.coverimage) return showWarning('Para publicar, necesitas la imagen de encabezado.');

    await saveDocument(true);

    setStatusBarState({
      error: null,
      success:
          "Tu publicación ha sido enviada a aprobación, ve a tu perfil para verla",
    });
    showSuccess('Tu publicación ha sido enviada para aprobación, en un par de semanas recibirás una notificación al respecto');
    triggerLoading(false);
  }, []);


  const handlePublication = () => {
    setOpen(true);
  };

  const onChange = useCallback(async (e, name) => {
    console.log(e, "eee788899")
    const {name: inputName, value} = e.target;
    const _files = refs[name]?.current?.files;

    let itemValue = value;

    // No files selected, user canceled the upload
    if (_files && !e.target?.files?.length) return;

    if (_files && inputName === "monograph") {
      itemValue = await handleMonographFile(e, _files[_files?.length - 1]);
      e.target.value = '';
    } else if (_files && inputName === "coverimage") {   //image validate
      itemValue = await handleImageFile(e, _files);
    } else if (_files) { // attachments
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
      showError("No logramos reconocer el formato del documento adjunto. Revisa que sea el archivo correcto, o inténtalo con otras versiones de archivo Image.");
      event.target.value = null;
      return;
    }
    triggerLoading(true);
    try {
      itemValue = await upload(_files, true, formState?.coverimage?.id);
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
    const [fileName] = file.name.split('.');

    if (!isValidFileType(fileType)) {
      showError("No logramos reconocer el formato del documento adjunto. Revisa que sea el archivo correcto, o inténtalo con otras versiones de archivo HTML, Word o PDF");
      event.target.value = null;
      return;
    }

    try {
      triggerLoading(true);
      const htmlData = await convertFileToHTML(file);
      const type = typeof (htmlData.data)
      console.log(type, "---datatype")
      console.log(htmlData.data, "----------->htmldata")
      const length = htmlData.data.length
      console.log(length, "---------length")
      const checkResult = await checkCompliance(htmlData.data);
      console.log(checkResult.data, "-----data check-----");
      setLogicCheck(checkResult.data);

      const htmlFile = new File([htmlData.data], `${fileName}.html`, {
        type: "text/html",
      });
      console.log("FUCK", {formState})
      const uploadedHTML = await upload([htmlFile], true, formState?.monograph?.id);
      console.log(uploadedHTML, "-----upload file----");
      const loadedMonograph = await getMonograph(uploadedHTML);
      setPreviewIframe(loadedMonograph);
      return uploadedHTML;
    } catch (error) {
      console.log("Error uploading file:", error);
      showError("Algo salió mal convirtiendo el archivo a HTML");
    } finally {
      triggerLoading(false);
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
      showWarning('Para guardar, seleccionar el tipo de publicación.');
    } else {
      showWarning('Para guardar un borrador debes tener lo siguiente: \n 1. Título de la publicación en la sección de formulario. \n 2.	Contenido, importado o creado por ti mismo en el editor. \n 3.Tipo de publicación.');
    }
  };

  useEffect(() => {
    if (!post) return
    console.log({post})
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
    monograColor,
    setMonograColor
  }
}
