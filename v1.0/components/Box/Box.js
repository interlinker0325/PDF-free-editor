import styled from '@emotion/styled'
import {
    space,
    color,
    fontSize,
    fontFamily,
    width,
    layout,
    flexbox,
    border,
    grid,
    position,
    shadow,
    fontWeight,
    lineHeight,
    system,
    variant
} from 'styled-system'

const Box = styled.div(
    {
        boxSizing: 'border-box'
    },
    space,
    width,
    fontSize,
    fontFamily,
    color,
    layout,
    flexbox,
    border,
    grid,
    position,
    shadow,
    fontWeight,
    lineHeight,
    system({
        transition: true,
        visibility: true,
        transform: true,
        objectFit: true
    }),
    variant({
        variants: {
            addSection: {
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    content: '""',
                    flex: '1',
                    mr: '1rem',
                    height: '2px',
                    backgroundColor: '#000',
                },
                '&::after': {
                    content: '""',
                    flex: '1',
                    ml: '1rem',
                    height: '2px',
                    backgroundColor: '#000',
                }
            }
        }
    })
);

export default Box;