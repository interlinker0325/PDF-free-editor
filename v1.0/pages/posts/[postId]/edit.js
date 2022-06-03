import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { request, GET_ENTRY_BY_ID, GET_ALL_CATEGORIES } from 'utils/graphqlRequest';
import useUser from 'utils/useUser';
import Layout from 'components/Layout/Layout';
import EditPostContent from 'components/Post/EditPost/EditPostContent';
import EditPostSidebar from 'components/Post/EditPost/EditPostSidebar';

const EditPost = ({ entry, ...props }) => {
    const router = useRouter();
    const formState = useState(entry);
    const { user } = useUser();

    useEffect(() => {
        if (user && !user.isLoggedIn || user && user.isLoggedIn && user.id !== entry.author) {
            router.push('/');
        }
    }, [user]);

    return (
        <Layout
            content={{
                main: <EditPostContent user={user} formState={formState} clearForm={() => null} {...props} />,
                aside: <EditPostSidebar user={user} formState={formState} {...props} />
            }} />
    );
}

export async function getServerSideProps({ params: { postId } }) {
    let { entry: { content, ...restOfEntry }, allCategories: categories } =
        await request([GET_ENTRY_BY_ID(postId), GET_ALL_CATEGORIES]);

    content = content.map(({ updatedAt, createdAt, monograph, image, ...rest }) => ({
        monograph: monograph && monograph.id,
        image: image && image.id,
        ...rest
    }));

    restOfEntry.author = restOfEntry.author?.id;
    restOfEntry.category = restOfEntry.category?.id;
    if (restOfEntry.coverimage) {

        restOfEntry.coverimage = restOfEntry.coverimage?.id;
    }
    restOfEntry.files = restOfEntry.files.map(f => f.id);

    return {
        props: {
            recordId: postId,
            entry: {
                sections: content,
                ...restOfEntry
            },
            categories
        }
    };
}

EditPost.pageTitle = 'Editar contenido';

export default EditPost;
