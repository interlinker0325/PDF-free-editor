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
    grid,
    compose,
    system
} from 'styled-system'
import { fonts } from 'styles/theme';

const resize = system({
    prop: 'resize',
    cssProperty: 'resize',
});

const Textarea = styled.textarea(
    space,
    color,
    fontSize,
    fontFamily,
    width,
    layout,
    border,
    position,
    shadow,
    grid,
    compose(
        resize
    ),
    system({
        resize: true,
        transform: true
    }),
);

Textarea.defaultProps = {
    bg: 'secondary',
    resize: 'none',
    border: 'none',
    p: 2,
    fontSize: 'p',
    fontFamily: fonts.roboto
}

export default Textarea;