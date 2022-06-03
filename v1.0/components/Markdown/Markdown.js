import styled from '@emotion/styled'
import { theme } from 'styles/theme';

const StyledComponent = styled.div`
    p {
        font-size: ${theme.fontSizes.p[0]};
    }
    a {
        font-size: ${theme.fontSizes.a[0]};
    }
    label {
        font-size: ${theme.fontSizes.label[0]};
    }
    span {
        font-size: ${theme.fontSizes.span[0]};
    }
    h1 {
        font-size: ${theme.fontSizes.h1[0]};
    }
    h2 {
        font-size: ${theme.fontSizes.h2[0]};
    }
    h3 {
        font-size: ${theme.fontSizes.h3[0]};
    }
    h4 {
        font-size: ${theme.fontSizes.h4[0]};
    }
    img {
        margin: 0 auto;
    }
`;

const Markdown = ({ content, ...props }) => (
    <StyledComponent
        {...props}
        dangerouslySetInnerHTML={{ __html: content }} />
);

export default Markdown;

