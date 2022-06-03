import React, { useState, useEffect, useRef } from 'react';
import { request, GET_ENTRY_BY_ID, GET_COURSE } from 'utils/graphqlRequest';
import Layout from 'components/Layout/Layout';
import ViewPostContent from 'components/Post/ViewPost/ViewPostContent';
import ViewPostSidebar from 'components/Post/ViewPost/ViewPostSidebar';
import { getHTML } from 'handlers/bll';
import { useRouter } from 'next/router';

const Posts = (props) => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState(null);
    const mainRef = useRef();
    const onScroll = () => {
        props.entry?.content?.forEach((content, index) => {
            if (!content?.ref?.current) {
                return;
            }
            const docViewTop = mainRef.current.scrollTop;
            const docViewBottom = docViewTop + mainRef.current.scrollHeight;

            const elemTop = content.ref.current.offsetTop - 300;
            const elemBottom = elemTop + content.ref.current.scrollHeight;

            if (index === 0 && (docViewTop === 0 || docViewTop < elemTop)) {
                setActiveSection(content.ref);
            } else if (docViewTop >= elemTop && docViewTop <= elemBottom && docViewBottom > elemBottom) {
                setActiveSection(content.ref);
            }
        });
    }

    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, []);

    useEffect(() => {
        if (!props.entry) router.push('/');
    }, [props]);

    return (
        <Layout
            mainRef={mainRef}
            content={{
                main: <ViewPostContent {...props.entry} />,
                aside: <ViewPostSidebar activeSection={activeSection} setActiveSection={setActiveSection} {...props} />
            }} />
    );
}

export async function getServerSideProps({ params: { postId } }) {
    let { entry, course } = await request([GET_ENTRY_BY_ID(postId), GET_COURSE]);

    if (entry?.content?.length) {
        for (let i = 0; i < entry.content.length; i++) {
            if (entry.content[i].monograph) {
                let c = entry.content[i];
                c.monograph = await getHTML(c.monograph?.url);
                c.ref = React.createRef();
                entry.content[i] = c
            }
        }
    }

    return {
        props: { entry, course }
    };
}

export default Posts;
