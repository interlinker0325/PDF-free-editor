import React from 'react'

import useUser from "utils/useUser";
import withSession from "utils/withSession";
import { GET_ALL_COURSES, GET_ALL_STUDENTS, request, } from "utils/graphqlRequest";

import Main from "components/Main/Main";
import PostForm from "components/Posts/PostForm";
import PostView from "components/Posts/PostView";
import Loader from "components/Loader/Loader";
import { SnackbarProvider } from 'notistack';
import usePost from "../../hooks/usePost";
import PostTopBar from "../../components/Posts/PostTopBar";
import RequestApprovalDialog from "../../components/Posts/RequestApprovalDialog";
import { isAdmin as isUserAdmin } from "../../utils";
import { GET_ALL_COURSES_ADMIN } from "../../gql/queries/User";

const NewPost = ({ isSaved, setIsSaved, courses }) => {
  const [titleTab, setTitleTab] = React.useState('')

  const { user } = useUser({ redirectTo: "/" });
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
    handleSave,
    onChange,
    clearSubmitForm,
    handlePublication,
    requestApproval,
    statusBarState,
    showLoadingScreen,
    monograColor,
    setMonograColor
  } = usePost({ isSaved, setIsSaved, user, courses });

  return (
    <Main className="min-[1536px]:w-full min-[1536px]:m-auto min-[1536px]:max-w-[1536px] pt-[unset] md:px-[30px] min-h-screen">
      <SnackbarProvider maxSnack={3}>
        <PostTopBar
          {...{
            user,
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
            setTitleTab
          }}
        />
        <PostForm
          refs={refs}
          form={formState}
          clearForm={clearSubmitForm}
          onChange={onChange}
          user={user}
          setAgreedTerms={setAgreedTerms}
          setCoAuthors={setCoAuthors}
          removeCoAuthor={removeCoAuthor}
          formView={formView}
          courses={courses}
          monograColor={monograColor}
          showPreview={!formView}
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
          setLogicCheck={setLogicCheck}
          allPass={allPass}
          setAllPass={setAllPass}
          setMonograColor={setMonograColor}
          titleTab={titleTab}
          showFormView={formView}
        />
        <Loader show={showLoadingScreen} />
        <RequestApprovalDialog {...{ open, setOpen, requestApproval }} />
      </SnackbarProvider>
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
