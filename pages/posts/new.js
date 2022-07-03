import { useState, useRef, useCallback } from 'react';
import { createEntry, upload, publishEntry, updateEntry } from 'handlers/bll';
import CreatePost from 'components/Posts/CreatePost';
import { request, GET_ALL_COURSES, GET_ALL_STUDENTS } from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import { POST_REVIEW_STATUS, isUserTeacherOfCourse } from 'utils';

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
    const [formState, setFormState] = useState(formBaseState);
    const [errorState, setErrorState] = useState(baseErrorState);
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

    const showPreview = formState !== formBaseState;
    return (
        <CreatePost
            refs={refs}
            form={formState}
            error={errorState}
            doSubmit={doSubmit}
            clearForm={clearSubmitForm}
            onChange={onChange}
            requestApproval={requestApproval}
            showPreview={showPreview}
            {...props} />
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
