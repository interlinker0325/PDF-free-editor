import useUser from "utils/useUser";
import withSession from "utils/withSession";
import {GET_ALL_COURSES, GET_ALL_STUDENTS, request,} from "utils/graphqlRequest";

import Main from "components/Main/Main";
import PostForm from "components/Posts/PostForm";
import PostView from "components/Posts/PostView";
import Loader from "components/Loader/Loader";
import {SnackbarProvider} from 'notistack';
import usePost from "../../hooks/usePost";
import PostTopBar from "../../components/Posts/PostTopBar";
import RequestApprovalDialog from "../../components/Posts/RequestApprovalDialog";


const NewPost = ({isSaved, setIsSaved, courses}) => {
  const {user} = useUser({redirectTo: "/"});
  const {
    refs,
    open,
    setOpen,
    previewIframe,
    formState,
    setAgreedTerms,
    setCoAuthors,
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
    allPass,
    setAllPass,
    handleSave,
    onChange,
    clearSubmitForm,
    handlePublication,
    requestApproval,
    statusBarState,
    showLoadingScreen,
  } = usePost({isSaved, setIsSaved, user, courses});

  return (
    <Main>
      <SnackbarProvider maxSnack={3}>
        <PostTopBar
          {...{
            allPass,
            showPreview,
            editView,
            formView,
            handleSave,
            handlePublication,
            setFormView,
            setShowPreview,
            setEditView,
            statusBarState,
            setComplianceView,
          }}
        />
        <PostForm
          refs={refs}
          form={formState}
          doSubmit={doSubmit}
          clearForm={clearSubmitForm}
          onChange={onChange}
          user={user}
          setAgreedTerms={setAgreedTerms}
          setCoAuthors={setCoAuthors}
          removeCoAuthor={removeCoAuthor}
          formView={formView}
          courses={courses}
        />
        <PostView
          post={formState}
          user={user}
          courses={courses}
          previewIframe={previewIframe}
          editView={editView}
          showPreview={showPreview}
          complianceView={complianceView}
          setIsSaved={setIsSaved}
          logicCheck={logicCheck}
          setAllPass={setAllPass}
        />
        <Loader show={showLoadingScreen}/>
        <RequestApprovalDialog {...{open, setOpen, requestApproval}}/>
      </SnackbarProvider>
    </Main>
  );
};
export default NewPost;

export const getServerSideProps = withSession(async function ({req}) {
  const currentUser = req.session.get("user");
  if (!currentUser) {
    return {props: {}};
  }
  const {allUsers, allCourses} = await request([
    GET_ALL_COURSES(currentUser.id),
    GET_ALL_STUDENTS,
  ]);
  return {
    props: {courses: allCourses, students: allUsers},
  };
});
