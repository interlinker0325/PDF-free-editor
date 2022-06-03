import styled from '@emotion/styled';
import { fonts } from 'styles/theme';
import Box from 'components/Box/Box';
import {
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    variant,
    system,
    overflow,
} from 'styled-system';
import { theme } from 'styles/theme';

const Text = styled(Box)(
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    overflow,
    system({
        textAlign: true,
        whiteSpace: true,
        textOverflow: true
    }),
    variant({
        variants: {
            sectionTitle: {
                display: 'flex',
                alignItems: 'center',
                as: 'h3',
                fontSize: '3',
                '&::after': {
                    content: '""',
                    flex: '1',
                    ml: '1rem',
                    mt: '3px',
                    height: '2px',
                    backgroundColor: theme.colors.body,
                },
            }
        }
    })
);

Text.defaultProps = {
    as: 'p',
    my: 0,
    fontFamily: fonts.roboto,
    fontSize: 'p',
    fontWeight: '500',
};

export default Text;
