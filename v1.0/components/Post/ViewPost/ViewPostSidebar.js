import { useState } from 'react';
import List from 'components/List/List';
import Link from 'components/Link/Link';
import Box from 'components/Box/Box';
import Button from 'components/Button/Button';
import Topic from 'components/Topic/Topic';
import { fonts } from 'styles/theme';

const SIDEBAR_CONTENT_TYPES = {
    post: 'POST',
    course: 'COURSE',
    files: 'FILES'
}

const ViewPostSidebar = ({ entry, course, activeSection, setActiveSection }) => {
    const [sidebarContent, setSidebarContent] = useState(SIDEBAR_CONTENT_TYPES.post);
    const showPost = sidebarContent === SIDEBAR_CONTENT_TYPES.post;
    const showCourse = sidebarContent === SIDEBAR_CONTENT_TYPES.course;
    const showFiles = sidebarContent === SIDEBAR_CONTENT_TYPES.files;

    return (
        <>
            <Box
                display='grid'
                gridAutoRows='max-content'
                gridRowGap='1'
                width='100%'>
                <Box
                    display='grid'
                    gridTemplateColumns='1fr 1fr'
                    gridColumnGap='2'
                    width='100%'>
                    <Button
                        variant={showPost ? ['primary', 'small'] : ['small']}
                        onClick={() => setSidebarContent(SIDEBAR_CONTENT_TYPES.post)}
                        children='Contenido de entrada' />
                    <Button
                        variant={showCourse ? ['primary', 'small'] : ['small']}
                        onClick={() => setSidebarContent(SIDEBAR_CONTENT_TYPES.course)}
                        children='Contenido de curso' />
                </Box>
                <Link
                    width='fit-content'
                    variant={['primary', 'underline']}
                    fontSize='a'
                    fontFamily={fonts.bigCaslon}
                    justifySelf='flex-end'
                    textAlign='end'
                    onClick={() => setSidebarContent(showPost ?
                            SIDEBAR_CONTENT_TYPES.files : SIDEBAR_CONTENT_TYPES.post
                    )}
                    children={showPost ?
                        'Contenido descargable >' : (showFiles ?
                            'Volver >' : 'Ir a contenido de entrada >'
                        )} />
            </Box>
            <List>
                {showPost && entry?.content && entry.content.map((section, sectionIndex) =>
                    <List.Item
                        key={`Section_NavItem_${sectionIndex}`}
                        isActive={section.ref?.current?.id === activeSection?.current?.id}>
                        <Link
                            fontSize='a'
                            fontFamily={fonts.bigCaslon}
                            variant={section.ref?.current?.id === activeSection?.current?.id ? 'primary' : 'text'}
                            onClick={() => {
                                setActiveSection(section.ref)
                                section.ref?.current.scrollIntoView();
                            }}
                            children={section.title} />
                    </List.Item>
                )}

                {showCourse && course?.categories && course.categories.map((cat, catIndex) =>
                    <Topic
                        index={catIndex}
                        title={cat.name}
                        posts={cat.entries} />
                )}

                {showFiles && entry?.files && entry.files.map((file, fileIndex) =>
                    <Link
                        target='_blank'
                        fontSize='a'
                        fontFamily={fonts.bigCaslon}
                        variant={['active', 'underline']}
                        key={`File_${fileIndex}`}
                        href={file.url}
                        children={file.filename} />
                )}
            </List>
        </>
    );
}

export default ViewPostSidebar;