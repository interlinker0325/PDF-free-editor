import styled from '@emotion/styled';
import {
    space,
    color,
    fontSize,
    fontFamily,
    width,
    layout,
    border,
    position,
    shadow,
    variant,
    system
} from 'styled-system'
import { fonts, theme } from 'styles/theme';

const Input = styled.input(
    space,
    color,
    fontSize,
    fontFamily,
    width,
    layout,
    border,
    position,
    shadow,
    system({
        transform: true
    }),
    variant({
        variants: {
            modal: {
                fontSize: 'h3',
                fontFamil: fonts.roboto,
                border: 'none',
                borderBottom: 'none',
                borderColor: 'none',
                bg: 'secondary',
            },
            active: {
                borderColor: 'primary',
                color: 'primary'
            },
            large: {
                fontSize: '4',
                fontWeight: 'bold',
                '::placeholder': {
                    color: theme.colors.text
                },
                pt: 0,
                mt: 0
            }
        }
    })
);

Input.defaultProps = {
    fontFamily: fonts.roboto,
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    my: 1,
    p: 1,
    pl: '0',
    borderRadius: '0',
    fontFamily: 'body',
    color: 'text',
    boxShadow: 'none',
    border: 'none',
    borderBottom: '1px solid',
    borderColor: 'body',
    css: {
        '&:focus': {
            outline: 0
        },

        '&:disabled': {
            opacity: 0.6,
            filter: 'saturate(60%)'
        }
    }
}

export default Input;