import styled from '@emotion/styled'
import Box from 'components/Box/Box';

const Flex = styled(Box)({
    display: 'flex'
});

Flex.defaultProps = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
};

export default Flex;
