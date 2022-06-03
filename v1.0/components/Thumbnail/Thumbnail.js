import { useState } from 'react';
import Box from 'components/Box/Box';
import Card from 'components/Card/Card';
import Text from 'components/Text/Text';
import Image from 'components/Image/Image';
import Icon from 'components/Icon/Icon';
import { fonts } from 'styles/theme';

const Thumbnail = ({
    isAlert,
    imgSrc,
    imgDescription,
    title,
    description,
    ctaText,
    id,
    isAd,
    targetUrl,
    ...props
}) => {
    const [active, setActive] = useState(false);
    return (
        <Card
            as={isAd ? 'a' : 'article'}
            onClick={!isAd ? (() => window.location.href = `/posts/${id}`) : null}
            href={isAd && targetUrl}
            target={isAd && '_blank'}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            {...isAlert ? styles.alertCard : isAd ? styles.ad : styles.postCard}
            {...props}>
            <Box
                as='figure'
                width={isAlert ? '2rem' : '100%'}
                m='0'>
                {isAlert ? (
                    <Icon.Alert height='2rem' active={true} />
                ) : imgSrc ? (
                    <Image
                        width='100%'
                        maxHeight={isAd ? '100%' : '15rem'}
                        objectFit='cover'
                        src={imgSrc} />
                ) : null}
            </Box>

            {isAd ? null :
                <Box
                    display='flex'
                    flexDirection='column'
                    pb='2'>
                    <Box
                        flex='1'
                        as='header'
                        width='100%'
                        m='0'>
                        <Text
                            as='h2'
                            fontSize='h2'
                            m='0'
                            color={active ? 'primary' : 'body'}
                            children={title} />
                    </Box>
                    <Text
                        as='p'
                        flex='2'
                        fontSize='p'
                        fontFamily={fonts.bigCaslon}
                        my='0'
                        display='block'
                        textOverflow='ellipsis'
                        wordWrap='break-word'
                        overflow='hidden'
                        maxHeight='4rem'
                        lineHeight='1.5em'
                        children={description} />

                </Box>
            }

        </Card>
    );
}

export default Thumbnail;

const styles = {
	alertCard: {
        display: 'flex',
        flexDirection: 'column',
		minHeight: '200px',
		alignItems: 'start',
		justifyContent: 'center',
		boxShadow: 'post',
		px: '2',
		py: '0',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: 'active',
        color: 'body'
	},
	postCard: {
        display: 'grid',
        gridTemplateRows: '3fr 2fr',
        gridRowGap: '1',
		boxShadow: '0',
        borderBottom: '1px solid',
        borderColor: 'body',
        py: '20px',
        color: 'body'
	},
    ad: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridRowGap: '0',
		boxShadow: '0',
        py: '20px',
        color: 'body'
	}
}