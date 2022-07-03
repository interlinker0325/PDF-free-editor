import { useEffect } from 'react';
import useUser from 'utils/useUser';
import Main from 'components/Main/Main';
import PostStatusBar from 'components/Posts/PostStatusBar';
import PostView from 'components/Posts/PostView';
import { useRouter } from 'next/router';

const Post = ({ post,  updatePost }) => {
    const router = useRouter();
    useEffect(() => {
        if (!post) {
            router.push('/');
        }
    }, [post]);
    const { user } = useUser();

    if (!post) return null;
    return (
        <Main>
            <PostStatusBar user={user} post={post} updatePost={updatePost} />
            <PostView {...{post, user}} />
        </Main>
    );
};

export default Post;