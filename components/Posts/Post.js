import { useEffect } from 'react';
import useUser from 'utils/useUser';
import Main from 'components/Main/Main';
import PostStatusBar from 'components/Posts/PostStatusBar';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const PublicView = dynamic(() => import('./PublicView'), { ssr: false })

const Post = ({ post,  updatePost }) => {
    const router = useRouter();
    useEffect(() => {
        if (!post) {
            router.push('/');
        }
    }, [post]);
    const { user } = useUser();
    const showPreview = true;

    if (!post) return null;
    return (
        <Main>
            <PostStatusBar user={user} post={post} updatePost={updatePost} />
            <PublicView {...{post, user, showPreview}} />
        </Main>
    );
};

export default Post;