import { useState, useRef } from 'react';
import CreatePost from 'components/Posts/CreatePost';
import { request, GET_ALL_COURSES, GET_ALL_STUDENTS } from 'utils/graphqlRequest';

const formBaseState = {
    isGeneralFilled: false,
    title: '',
    description: '',
    coverimage: '',
    course: 'Curso',
    files: [],
    monografia: null,
    error: false,
    tags: '',
    coAutores: 'Co-Autores',
    acceptedTerms: false
};

const baseErrorMessage = (key) => `${key} es requerido. Por favor ingresar ${key}`
const baseErrorState = {
    hasErrors: false,
    errorKey: null,
    errorMessage: null
}

const NewPost = (props) => {
    const [formState, setFormState] = useState(formBaseState);
    const [errorState, setErrorState] = useState(baseErrorState);
    const clearSubmitForm = () => useState(formBaseState);
    const refs = {
        files: useRef(),
        coverimage: useRef(),
        monografia: useRef(),
        acceptedTerms: useRef()
    };
    // console.log('OVER HERE', props);

    const doSubmit = (e) => {
        e.preventDefault();
        // console.log('over here form', formState);
        Object.keys(formState).forEach(key => console.log('over here form', key, typeof key));
    };

    const onChange = (e, name) => {
        delete formState[name];
        const hasRef = refs[name];
        if (hasRef) {
            setFormState({ [name]: refs[name].current.files || refs[name].current.checked, ...formState })
        } else {
            setFormState({ [name]: e.target.value , ...formState })
        }
    };


    return (
        <CreatePost
            refs={refs}
            form={formState}
            error={errorState}
            doSubmit={doSubmit}
            clearForm={clearSubmitForm}
            onChange={onChange}
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
