import { useState, useRef, useCallback, useEffect } from 'react';
import { getHTML, upload, publishEntry, updateEntry } from 'handlers/bll';
import { request, GET_ALL_COURSES, GET_ALL_STUDENTS, GET_ENTRY_BY_ID } from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import { POST_REVIEW_STATUS, isUserTeacherOfCourse } from 'utils';
import { useRouter } from 'next/router';

import Main from 'components/Main/Main';
import PostForm from 'components/Posts/PostForm';
import PostView from 'components/Posts/PostView';
import TopBar from 'components/TopBar/TopBar';
import Loader from 'components/Loader/Loader';

const baseErrorMessage = (key) => `${key} es requerido. Por favor ingresar ${key}`
const baseErrorState = {
    hasErrors: false,
    errorKey: null,
    errorMessage: null
}

const EditPost = ({ post, ...props }) => {
    const router = useRouter();
    const { user } = useUser({ redirectTo: '/' });
    useEffect(() => {
        if (user && !user.isLoggedIn || user && user.isLoggedIn && user.id !== post.author?.id) {
            router.push('/');
        }
    }, [user]);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [formState, setFormState] = useState(post);
    const [errorState, setErrorState] = useState(baseErrorState);
    const [previewIframe, setPreviewIframe] = useState(post?.monographView);

    const triggerLoading = (show) => {
        if (show) {
            document.getElementsByTagName('body')[0].classList.add('htmlBackgroundBackdrop');
            setShowLoadingScreen(true);
        } else {
            document.getElementsByTagName('body')[0].classList.remove('htmlBackgroundBackdrop');
            setShowLoadingScreen(false);
        }
    }

    const clearSubmitForm = () => { setFormState(post); }
    const refs = {
        attachments: useRef(),
        coverimage: useRef(),
        monograph: useRef(),
        agreedterms: useRef()
    };

    const doSubmit = useCallback(async (e) => {
        e.preventDefault();
        triggerLoading(true);
        const { error, monographView, ...postData } = formState;

        if (isUserTeacherOfCourse(user, props.courses)) {
            postData.review = POST_REVIEW_STATUS.APPROVED;
        }

        const entry = await updateEntry(postData);

        if (entry.error) {
            alert('No se pudo actualizar la entrada');
        } else {
            setFormState({ ...entry, ...postData});
        }
        triggerLoading(false);
    }, [formState]);

    const onChange = useCallback(async (e, name) => {
        let itemValue;
        if (refs[name]) {
            const _files = refs[name]?.current?.files;
            if (_files) {
                triggerLoading(true);
                const files = await upload(_files);
                itemValue = files;
                triggerLoading(false);
            } else {
                itemValue = refs[name].current.checked;
            }
        } else {
            itemValue = e.target.value;
        }
        delete formState[name];
        setFormState({ [name]: itemValue , ...formState })
    }, [formState]);

    const requestApproval = useCallback(async () => {
        triggerLoading(true);
        await publishEntry(formState.id);
        triggerLoading(false);
    }, [formState]);

    const hidePreview = (e) => {
        e.preventDefault();
        setShowPreview(false);
    }

    const doShowPreview = useCallback(async (e) => {
        e.preventDefault();
        if (formState?.monograph) {
            const loadedMonograph = await getHTML(
                `/api/${formState?.monograph.url.replace('https://www.datocms-assets.com/', '')}`);
            setPreviewIframe(loadedMonograph);
        }
        setShowPreview(true);
    }, [formState]);

    const setAgreedterms = useCallback(async (e) => {
        e.preventDefault();
        const { agreedterms, ...restFormState } = formState;
        restFormState.agreedterms = !agreedterms;
        setFormState(restFormState)
    }, [formState]);

    const setCoAuthors = useCallback(async (e, selectedCoAuthor) => {
        e.preventDefault();
        const { coauthors, ...restFormState } = formState;
        let selectedCoauthors = coauthors || [];
        selectedCoauthors.push(selectedCoAuthor);
        restFormState.coauthors = selectedCoauthors;
        setFormState(restFormState)
    }, [formState]);

    const removeCoAuthor = useCallback(async (e, coAuthorId) => {
        e.preventDefault();
        const { coauthors, ...restFormState } = formState;
        const removeCoAuthorIndex = coauthors.findIndex(coAuthor => coAuthor.id === coAuthorId);
        coauthors.splice(removeCoAuthorIndex, 1);
        restFormState.coauthors = coauthors;
        setFormState(restFormState)
    }, [formState])

    const formHasChanged = formState !== post;
    return (
        <Main>
            {showPreview &&
                <TopBar>
                    <a
                        className='text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'
                        onClick={hidePreview}
                        children='< Volver a archivo' />
                </TopBar>
            }
            {showPreview ? (
                <PostView
                    post={formState}
                    user={user}
                    editMode={true}
                    previewIframe={previewIframe}
                    {...props} />
            ) : (
                <PostForm
                    refs={refs}
                    form={formState}
                    error={errorState}
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
                    {...props} />
            )}
            <Loader show={showLoadingScreen} />
        </Main>
    );
}

export async function getServerSideProps({ params }) {
    const { post, allUsers, allCourses } = await request([GET_ENTRY_BY_ID(params.postId), GET_ALL_COURSES, GET_ALL_STUDENTS]);
    const { course, ...postData } = post;

    if (course) {
        postData.course = course.id;
    }

    if (postData?.monograph) {
        postData.monographView = await getHTML(postData.monograph.url);
    }

    return {
        props: { courses: allCourses, students: allUsers, post: postData }
    };
}


EditPost.pageTitle = 'Editar contenido';

export default EditPost;
