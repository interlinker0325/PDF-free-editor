import React, { useEffect } from 'react';
import { request, GET_ENTRY_BY_ID } from 'utils/graphqlRequest';
import { getHTML } from 'handlers/bll';
import { useRouter } from 'next/router';
import Post from 'components/Posts/Post';

const Posts = (props) => {
    const router = useRouter();
    useEffect(() => {
        if (!props.entry) router.push('/');
    }, [props]);

    return (
        <Post {...props} />
    );
}

export async function getServerSideProps({ params: { postId } }) {
    let { entry } = await request(GET_ENTRY_BY_ID(postId));

    if (entry?.monografia) {
        entry.monografia = await getHTML(entry.monografia.url);
    }

    // console.log('OVER HERE!!!', entry);
    return {
        props: { entry }
    };
}

export default Posts;
