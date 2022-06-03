import React from 'react';
import Title from 'components/Title/Title';
import Box from 'components/Box/Box';
import Link from 'components/Link/Link';
import Icon from 'components/Icon/Icon';
import { fonts } from 'styles/theme';

const Topic = React.forwardRef(({
    index,
    title,
    posts,
    alerts,
    showIcon = false,
    my,
    ...props
}, ref) => (posts?.length > 0 || alerts?.length > 0) ? (
    <Box
        ref={ref}
        key={`Topic_${index}`}
        my={my || '2'}
        {...props}>
        <Title
            as='h3'
            fontSize='h3'
            m='0'
            maxWidth='fit-content'
            icon={
                <Icon.Tags color='primary' />
            }
            children={`${title}:`} />

        <Box
            ml='5' my='2'
            display='flex'
            flexDirection='column'>
            {posts && !!posts.length && posts.map((post, postIndex) =>
                <Link
                    key={`Topic_Post_${postIndex}`}
                    onClick={() => window.location.href = `/posts/${post.id}`}
                    variant={['active', 'underline']}
                    fontSize='p'
                    fontFamily={fonts.bigCaslon}
                    width='fit-content'
                    children={`${post.title} >`}
                />
            )}

            {alerts && !!alerts.length && alerts.map((alert, alertIndex) =>
                <Link
                    key={`Topic_Alert_${alertIndex}`}
                    onClick={() => window.location.href = `/posts/${alert.id}`}
                    variant={['active', 'underline']}
                    fontSize='p'
                    width='fit-content'
                    fontFamily={fonts.bigCaslon}
                    children={`${alert.title} >`}
                />
            )}
        </Box>
    </Box>
) : null);

export default Topic;
