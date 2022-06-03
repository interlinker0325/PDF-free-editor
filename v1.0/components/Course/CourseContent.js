import Title from 'components/Title/Title';
import Box from 'components/Box/Box';
import Markdown from 'components/Markdown/Markdown';
import Topic from 'components/Topic/Topic';

const CourseContent = (props) => (
    <>
        <Title
            as='h1'
            fontSize='h1'
            mt='0'
            children={props.course?.title} />

        <Box
            as='section'
            display='grid'
            gridTemplateRows='1fr'
            gridRowGap='1rem'
            justifyContent='flex-start'
            alignItems='flex-start'
            width='100%'>
            <Title
                as='h2'
                fontSize='h2'
                mt='0'
                mb='1'
                width='fit-content'
                children='Descripción del curso:' />

            <Markdown
                content={props.course?.description} />

            <Box
                width='100%'>
                {props.course?.topics?.map((topic, index) =>
                    <Topic
                        ref={topic.ref}
                        key={`Course_Topic_${index}`}
                        id={`#Course_Topic_${index}`}
                        index={index}
                        showIcon={true}
                        title={topic.name}
                        posts={topic.content.posts}
                        alerts={topic.content.alerts} />
                )}
            </Box>
        </Box>
    </>
);

export default CourseContent;