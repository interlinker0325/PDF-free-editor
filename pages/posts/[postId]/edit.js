import { useState, useRef, useCallback, useEffect } from 'react';
import { createEntry, upload, publishEntry, updateEntry } from 'handlers/bll';
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

    const formHasChanged = formState !== post;
    return (
        <Main>
            {showPreview ? (
                <PostView post={formState} user={user} />
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

export async function getServerSideProps({ params }) {
    const { post, allUsers, allCourses } = await request([GET_ENTRY_BY_ID(params.postId), GET_ALL_COURSES, GET_ALL_STUDENTS]);
    const { course, coauthors, ...postData } = post;

    if (course) {
        post.course = course.id;
    }

    if (coauthors) {
        post.coauthors = coauthors[0].id;
    }

    return {
        props: { courses: allCourses, students: allUsers, post }
    };
}


    // const router = useRouter();
    // const formState = useState(entry);
    // const { user } = useUser();

    // return (
    //     <div>Drake</div>
    //     // <Layout
        //     content={{
        //         main: <EditPostContent user={user} formState={formState} clearForm={() => null} {...props} />,
        //         aside: <EditPostSidebar user={user} formState={formState} {...props} />
        //     }} />
    // );
// }

// export async function getServerSideProps({ params: { postId } }) {
//     let { entry: { content, ...restOfEntry }, allCategories: categories } =
//         await request([GET_ENTRY_BY_ID(postId), GET_ALL_CATEGORIES]);

//     content = content.map(({ updatedAt, createdAt, monograph, image, ...rest }) => ({
//         monograph: monograph && monograph.id,
//         image: image && image.id,
//         ...rest
//     }));

//     restOfEntry.author = restOfEntry.author?.id;
//     restOfEntry.category = restOfEntry.category?.id;
//     if (restOfEntry.coverimage) {

//         restOfEntry.coverimage = restOfEntry.coverimage?.id;
//     }
//     restOfEntry.files = restOfEntry.files.map(f => f.id);

//     return {
//         props: {
//             recordId: postId,
//             entry: {
//                 sections: content,
//                 ...restOfEntry
//             },
//             categories
//         }
//     };
// }

EditPost.pageTitle = 'Editar contenido';

export default EditPost;
