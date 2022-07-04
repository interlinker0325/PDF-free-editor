import { useState, useRef, useCallback } from 'react';
import useUser from 'utils/useUser';
import { createEntry, upload, publishEntry, getHTML } from 'handlers/bll';
import { request, GET_ALL_COURSES, GET_ALL_STUDENTS } from 'utils/graphqlRequest';
import { POST_REVIEW_STATUS, isUserTeacherOfCourse } from 'utils';

import Main from 'components/Main/Main';
import PostForm from 'components/Posts/PostForm';
import PostView from 'components/Posts/PostView';
import TopBar from 'components/TopBar/TopBar';

const formBaseState = {
    title: '',
    description: '',
    coverimage: '',
    course: null,
    attachments: null,
    monograph: null,
    error: false,
    tags: '',
    coauthors: null,
    agreedterms: false,
    review: POST_REVIEW_STATUS.PENDING
};

const baseErrorMessage = (key) => `${key} es requerido. Por favor ingresar ${key}`
const baseErrorState = {
    hasErrors: false,
    errorKey: null,
    errorMessage: null
}

const NewPost = (props) => {
    const { user } = useUser({ redirectTo: '/' });
    const [showPreview, setShowPreview] = useState(false);
    const [formState, setFormState] = useState(formBaseState);
    const [errorState, setErrorState] = useState(baseErrorState);
    const [previewIframe, setPreviewIframe] = useState(null);
    const clearSubmitForm = () => { setFormState(formBaseState); }
    const refs = {
        attachments: useRef(),
        coverimage: useRef(),
        monograph: useRef(),
        agreedterms: useRef()
    };

    const doSubmit = useCallback(async (e) => {
        e.preventDefault();
        const { id, error, ...postData } = formState;

        if (isUserTeacherOfCourse(user, postData.course)) {
            postData.review = POST_REVIEW_STATUS.APPROVED;
        }

        const entry = await createEntry({
            author: user.id,
            ...postData
        });

        if (entry.error) {
            alert('No se pudo actualizar la entrada');
        } else {
            setFormState({ ...entry, ...postData});
        }
    }, [formState]);

    const onChange = useCallback(async (e, name) => {
        let itemValue;
        if (refs[name]) {
            const _files = refs[name]?.current?.files;
            if (_files) {
                const files = await upload(_files, true);
                if (e.target.name === 'monograph') {
                    const loadedMonograph = await getHTML(
                        `/api/${files.url.replace('https://www.datocms-assets.com/', '')}`);
                    setPreviewIframe(loadedMonograph);
                }

                itemValue = files.id;
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
        await publishEntry(formState.id);
    }, [formState]);

    const hidePreview = (e) => {
        e.preventDefault();
        setShowPreview(false);
    }

    const doShowPreview = useCallback(async (e) => {
        e.preventDefault();
        console.log('OVER HERE do show previe', !previewIframe, formState?.monograph);
        if (!previewIframe && formState?.monograph) {
            const loadedMonograph = await getHTML(
                `/api/${formState?.monograph.url.replace('https://www.datocms-assets.com/', '')}`);
            setPreviewIframe(loadedMonograph);
        }
        setShowPreview(true);
    }, [formState]);

    const formHasChanged = formState !== formBaseState;
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
                <PostView post={formState} user={user} previewIframe={previewIframe} />
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
                    {...props} />
            )}
        </Main>
    );
}

export async function getServerSideProps() {
    const { allUsers, allCourses } = await request([GET_ALL_COURSES, GET_ALL_STUDENTS]);
    return {
        props: { courses: allCourses, students: allUsers }
    };
}

// NewPost.pageTitle = 'Crear contenido';

export default NewPost;
