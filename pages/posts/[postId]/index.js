import React, { useEffect, useState } from 'react';
import { request, GET_ENTRY_BY_ID } from 'utils/graphqlRequest';
import { getHTML } from 'handlers/bll';
import { useRouter } from 'next/router';
import Post from 'components/Posts/Post';

const Posts = (props) => {
    console.log(props.post.monograph.url);
    const router = useRouter();
    useEffect(() => {
        if (!props.post) router.push('/');
    }, [props]);

    return (
        <Post post={props.post} />
    );
   
}

export const getServerSideProps = async function ({ params }) {
    let { post } = await request(GET_ENTRY_BY_ID(params.postId));
    
    if (post?.monograph) {
        post.monographView = await getHTML(post.monograph.url);
    }

    return {
        props: { post }
    };
}

export default Posts;