import { useState } from 'react';
import CreatePost from 'components/Posts/CreatePost';
// import { request, GET_COURSE, GET_ALL_CATEGORIES } from 'utils/graphqlRequest';
// import Layout from 'components/Layout/Layout';
// import NewPostContent from 'components/Post/NewPost/NewPostContent';
// import NewPostSidebar from 'components/Post/NewPost/NewPostSidebar';

// const formBaseState = {
//     isGeneralFilled: false,
//     title: '',
//     category: '',
//     description: '',
//     notice: false,
//     showathome: false,
//     files: [],
//     coverimage: '',
//     error: false,
//     recordId: false,
//     sections: []
// };

const NewPost = (props) => {
    // const formState = useState(formBaseState);
    // const clearSubmitForm = () => formState[1](formBaseState);
    return (
        <CreatePost {...props} />
    );
}

// export async function getServerSideProps() {
//     const { course, allCategories: categories } = await request([GET_COURSE, GET_ALL_CATEGORIES]);
//     return {
//         props: { course, categories }
//     };
// }

// NewPost.pageTitle = 'Crear contenido';

export default NewPost;
