import * as NextLink from 'next/link';
import Text from 'components/Text/Text';
import styled from '@emotion/styled';
import {
    compose,
    system,
    typography,
    variant
} from 'styled-system';

const textDecoration = system({
    prop: 'textDecoration',
    cssProperty: 'textDecoration',
});

const StyledComponent = styled(Text)(
    typography,
    {
        cursor: 'pointer'
    },
    compose(
        textDecoration
    ),
    system({
        textDecoration: true
    }),
    variant({
        variants: {
            active: { color: 'active' },
            primary: { color: 'primary' },
            text: { color: 'text' },
            underline: {
                border: 'none',
                borderBottom: '1px solid',
                borderColor: 'inherit'
            }
        }
    })
)

const Link = ({ href = false, ...props }) => href ? (
    <NextLink.default
        href={href}
        as={href}
        passHref>
        <StyledComponent {...props} />
    </NextLink.default>
) : (
    <StyledComponent {...props} />
);

Link.defaultProps = {
    as: 'a',
    textDecoration: 'none',
    my: '0',
    pb: '0'
};

export default Link;