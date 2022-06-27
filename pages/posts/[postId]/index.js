import React, { useEffect } from 'react';
import { request, GET_ENTRY_BY_ID } from 'utils/graphqlRequest';
import { getHTML } from 'handlers/bll';
import { useRouter } from 'next/router';
import Post from 'components/Posts/Post';

const Posts = (props) => {
    const router = useRouter();
    useEffect(() => {
        if (!props.post) router.push('/');
    }, [props]);

    return (
        <Post {...props} />
    );
}

export async function getServerSideProps({ params: { postId } }) {
    let { post } = await request(GET_ENTRY_BY_ID(postId));

    if (post?.monograph) {
        post.monograph = await getHTML(post.monograph.url);
    }

    // console.log('OVER HERE!!!', entry);
    return {
        props: { post }
    };
}

export default Posts;
