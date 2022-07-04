import { useState, useRef, useCallback, useEffect } from 'react';
import { getHTML, upload, publishEntry, updateEntry } from 'handlers/bll';
import { request, GET_ALL_COURSES, GET_ALL_STUDENTS, GET_ENTRY_BY_ID } from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import { POST_REVIEW_STATUS, isUserTeacherOfCourse } from 'utils';
import { useRouter } from 'next/router';

import Main from 'components/Main/Main';
import PostForm from 'components/Posts/PostForm';
import PostView from 'components/Posts/PostView';

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
    const [showPreview, setShowPreview] = useState(false);
    const [formState, setFormState] = useState(post);
    const [errorState, setErrorState] = useState(baseErrorState);
    const clearSubmitForm = () => { setFormState(post); }
    const refs = {
        attachments: useRef(),
        coverimage: useRef(),
        monograph: useRef(),
        agreedterms: useRef()
    };

    const doSubmit = useCallback(async (e) => {
        e.preventDefault();
        const { error, ...postData } = formState;

        if (isUserTeacherOfCourse(user, postData.course)) {
            postData.review = POST_REVIEW_STATUS.APPROVED;
        }

        const entry = await updateEntry(postData);

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
            console.log('FILEs!', _files);
            if (_files) {
                const files = await upload(_files);
                console.log('FILE UPLOADED!', files);
                itemValue = files;
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

    const formHasChanged = formState !== post;
    return (
        <Main>
            {showPreview &&
                <div className={styles.bar}>
                    <a className={styles.link} onClick={hidePreview}>{'< Volver a archivo'}</a>
                </div>
            }
            {showPreview ? (
                <PostView
                    post={formState}
                    user={user}
                    editMode={true}
                    returnToEdit={hidePreview}
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
                    setShowPreview={setShowPreview}
                    user={user}
                    {...props} />
            )}
        </Main>
    );
}

const styles = {
    bar: 'bg-neutral w-full py-3 flex flex-row justify-between items-center px-16 mt-[-48px] mx-[-56px] w-screen mb-5',
    link: 'text-other text-2xl cursor-pointer hover:text-primary hover:underline hover:underline-offset-1'
}

export async function getServerSideProps({ params }) {
    const { post, allUsers, allCourses } = await request([GET_ENTRY_BY_ID(params.postId), GET_ALL_COURSES, GET_ALL_STUDENTS]);
    const { course, coauthors, ...postData } = post;

    if (course) {
        postData.course = course.id;
    }

    if (coauthors) {
        postData.coauthors = coauthors[0].id;
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
