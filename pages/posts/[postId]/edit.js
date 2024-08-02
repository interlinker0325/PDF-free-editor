import {useEffect, useState} from 'react';
import {getHTML} from 'handlers/bll';
import {GET_ALL_COURSES, GET_ALL_STUDENTS, GET_ENTRY_BY_ID, request} from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import {useRouter} from 'next/router';
import withSession from 'utils/withSession';

import Main from 'components/Main/Main';
import PostForm from 'components/Posts/PostForm';
import PostView from 'components/Posts/PostView';
import Loader from 'components/Loader/Loader';
import usePost from "../../../hooks/usePost";
import PostTopBar from "../../../components/Posts/PostTopBar";
import RequestApprovalDialog from "../../../components/Posts/RequestApprovalDialog";
import {SnackbarProvider} from "notistack";
import TopBar from "../../../components/TopBar/TopBar";

const EditPost = ({post, courses, setIsSaved}) => {
  const router = useRouter();
  const {user} = useUser({redirectTo: '/'});
  useEffect(() => {
    if (user && !user.isLoggedIn || user && user.isLoggedIn && user.id !== post.author?.id) {
      router.push('/');
    }
  }, [user]);

  const [showEditView, setShowEditView] = useState(false);
  // Dialog setting
  const {
    refs,
    open,
    setOpen,
    formState,
    setAgreedTerms,
    setCoAuthors,
    removeCoAuthor,
    previewIframe,
    showPreview,
    setShowPreview,
    logicCheck,
    doSubmit,
    editView,
    setEditView,
    complianceView,
    setComplianceView,
    formView,
    setFormView,
    allPass,
    setAllPass,
    onChange,
    handleSave,
    clearSubmitForm,
    handlePublication,
    requestApproval,
    statusBarState,
    showLoadingScreen,
  } = usePost({post, user, courses, setIsSaved});

  const hidePreview = (e) => {
    e.preventDefault();
    setShowEditView(false);
  }

  // console.log({post})

  return (
    <Main>
      <SnackbarProvider maxSnack={3}>
        {showEditView &&
          <TopBar>
            <a
              className='text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'
              onClick={hidePreview}
              children='< Volver a archivo'/>
          </TopBar>
        }
        <PostTopBar
          {...{
            allPass,
            complianceView,
            showPreview,
            editView,
            formView,
            handlePublication,
            handleSave,
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
}

export default EditPost;

export const getServerSideProps = withSession(async function ({req, params}) {
  const currentUser = req.session.get('user');
  if (!currentUser) {
    return {props: {}};
  }
  const {
    post,
    allUsers,
    allCourses
  } = await request([GET_ENTRY_BY_ID(params?.postId), GET_ALL_COURSES(currentUser.id), GET_ALL_STUDENTS]);
  const {course, ...postData} = post;

  if (course) {
    postData.course = course.id;
  }

  if (postData?.monograph) {
    postData.monographView = await getHTML(postData.monograph.url);
  }

  return {
    props: {courses: allCourses, students: allUsers, post: postData}
  };
});
