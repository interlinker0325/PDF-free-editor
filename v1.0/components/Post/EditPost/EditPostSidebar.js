import { useState } from 'react';
import Box from 'components/Box/Box';
import Text from 'components/Text/Text';
import Link from 'components/Link/Link';
import List from 'components/List/List';
import { fonts } from 'styles/theme';

const SIDEBAR_CONTENT_TYPES = {
    post: 'POST',
    course: 'COURSE',
    files: 'FILES'
}

const EditPostSidebar = ({ formState }) => {
    const [ formData ] = formState;
    const [sidebarContent, setSidebarContent] = useState(SIDEBAR_CONTENT_TYPES.post);
    const showPost = sidebarContent === SIDEBAR_CONTENT_TYPES.post;
    const showFiles = sidebarContent === SIDEBAR_CONTENT_TYPES.files;

    return (
        <>
            <Box
                display='grid'
                gridAutoRows='max-content'
                gridRowGap='1'
                width='100%'>
                <Text
                    as='h2'
                    fontSize='3'
                    mt='0'
                    mb='16px'
                    ml='3'
                    borderBottom='none'
                    alignSelf='center'
                    children='Información del contenido:' />
                <Link
                    fontSize='a'
                    variant={['primary', 'underline']}
                    width='fit-content'
                    justifySelf='flex-end'
                    onClick={() => setSidebarContent(showPost ? SIDEBAR_CONTENT_TYPES.files : SIDEBAR_CONTENT_TYPES.post)}
                    children={showPost ?
                        'Contenido descargable >' : 'Volver >'
                    } />
            </Box>

            <List>
                <List.Item
                    isActive={false}>
                    <Link
                        fontSize='p'
                        fontFamily={fonts.bigCaslon}
                        href={`#Post_Section_Title`}
                        children={formData.title} />
                </List.Item>
                {showPost && formData.sections && formData.sections.map((section, sectionIndex) =>
                    <List.Item
                        key={`Section_NavItem_${sectionIndex}`}
                        isActive={sectionIndex === 0}>
                        <Link
                            variant={sectionIndex === 0 && 'primary'}
                            href={`#Post_Section_${sectionIndex}`}
                            fontSize='p'
                            fontFamily={fonts.bigCaslon}
                            children={section.title} />
                    </List.Item>
                )}

                {showFiles && formData.files && formData.files.map((file, fileIndex) =>
                    <Link
                        target='_blank'
                        variant={['active', 'underline']}
                        key={`File_${fileIndex}`}
                        href={file.url}
                        fontSize='p'
                        fontFamily={fonts.bigCaslon}
                        children={file.filename} />
                )}
            </List>
        </>
    );
}

export default EditPostSidebar;