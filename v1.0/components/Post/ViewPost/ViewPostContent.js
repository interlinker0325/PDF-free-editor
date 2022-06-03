import { useState, useEffect } from 'react';
import useUser from 'utils/useUser';
import Badge from 'components/Badge/Badge';
import Title from 'components/Title/Title';
import Box from 'components/Box/Box';
import Text from 'components/Text/Text';
import Markdown from 'components/Markdown/Markdown';
import Image from 'components/Image/Image';
import Link from 'components/Link/Link';
import { fonts } from 'styles/theme';
import IFrame from 'components/IFrame/IFrame';

const ViewPostContent = (props) => {
    const { user } = useUser();
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (user && user.isLoggedIn && user.id === props.author?.id) {
            setShowEdit(true);
        }
    }, [user]);

    return (<>
        <Badge width='fit-content' isAlert={props.notice} />

        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='flex-end'
            borderBottom='1px solid'
            borderColor='body'
            width='100%'>
            <Text
                as='h1'
                fontSize='h1'
                mt='0'
                children={props.title} />
            {showEdit &&
                <Link
                    href={`/posts/${props.id}/edit`}
                    fontFamily={fonts.bigCaslon}
                    variant={['primary']}
                    children='Editar' />
            }
        </Box>


        {props.content && props.content.map((section, sectionIndex) =>
            <Box
                as='section'
                ref={section.ref}
                id={`Post_Section_${sectionIndex}`}
                display='grid'
                gridTemplateRows='1fr'
                gridRowGap='1rem'
                justifyContent='stretch'
                alignItems='flex-start'
                key={`Post_Section_${sectionIndex}`}
                width='100%'>
                <Title
                    as='h2'
                    fontSize='h2'
                    mt='0'
                    mb='1'
                    width='fit-content'
                    children={section.title} />
                <Markdown content={section.description} />
                {section.image &&
                    <Image
                        maxWidth='100%'
                        alignSelf='center'
                        justifySelf='center'
                        src={section.image.url} />
                }
                {section.monograph &&
                    <IFrame srcDoc={section.monograph} />
                }
            </Box>
        )}
    </>)
};

export default ViewPostContent;
