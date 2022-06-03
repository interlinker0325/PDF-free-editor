import React, { useState, useEffect, useRef } from 'react';
import { request, GET_COURSE } from 'utils/graphqlRequest';
import Layout from 'components/Layout/Layout';
import CourseContent from 'components/Course/CourseContent';
import CourseSidebar from 'components/Course/CourseSidebar';

const Course = (props) => {
    const [ activeSection, setActiveSection ] = useState(null);
    const mainRef = useRef();
    const onScroll = () => {
        props.course?.topics?.forEach((content, index) => {
            if (!content?.ref?.current) {
                return;
            }
            const docViewTop = mainRef.current.scrollTop;
            const docViewBottom = docViewTop + mainRef.current.scrollHeight;

            const elemTop = content.ref.current.offsetTop - 200;
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
    });

    return (
        <Layout
            gridColumnGap='4rem'
            mainRef={mainRef}
            content={{
                main: <CourseContent {...props} />,
                aside: <CourseSidebar activeSection={activeSection} setActiveSection={setActiveSection} {...props} />
            }} />
    );
}

export async function getServerSideProps() {
    const { course } = await request(GET_COURSE);

    const topics = course?.categories?.map(({ entries, ...topic }) => ({
        ...topic,
        ref: React.createRef(),
        content: {
            posts: entries.filter(tc => !tc.notice),
        }
    }));

    return { props: { course: { ...course, topics } } };
}

export default Course;
