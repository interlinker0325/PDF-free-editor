import * as NextLink from 'next/link'
import styled from '@emotion/styled'
import {
    compose,
    color,
    border,
    position,
    typography,
    shadow,
    space,
    background,
    system,
    flexbox,
    variant
} from 'styled-system';

const textDecoration = system({
    prop: 'textDecoration',
    cssProperty: 'textDecoration',
});

const StyledComponent = styled.button(
    compose(
        color,
        border,
        position,
        typography,
        shadow,
        space,
        background,
        flexbox,
        textDecoration
    ),
    {
        cursor: 'pointer'
    },
    system({
        textDecoration: true,
        fontWeight: {
          property: 'fontWeight',
          scale: 'fontWeights',
        },
    }),
    variant({
        variants: {
            rounded: {
                borderRadius: '40px'
            },
            primary: {
                bg: 'primary',
                color: 'white'
            },
            disabled: { bg: 'text' },
            large: {
                py: '3',
                px: '4'
            },
            medium: {
                py: '2',
                px: '2'
            },
            small: {
                py: '1',
                px: '2'
            },
            close: {
                bg: 'text',
                color: 'primary',
                border: 'none',
                borderRadius: '100%',
                mt: '-1.8rem',
                mr: '-1.5rem',
                px: '1rem',
                py: '0.5rem',
                fontSize: '20px',
                zIndex: '110'
            }
        }
    })
)

const Button = ({ fontSize, href, textDecoration, ...props }) => href ? (
    <NextLink.default href={href} passHref>
        <StyledComponent
            fontSize={fontSize || 'button'}
            textDecoration={textDecoration || 'none'}
            {...props} />
    </NextLink.default>
) : (
    <StyledComponent fontSize={fontSize || 'button'} {...props} />
);

Button.defaultProps = {
    border: 'none',
    py: '2',
    bg: 'secondary',
    color: 'body'
}

export default Button;