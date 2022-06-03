import styled from '@emotion/styled';
import Box from 'components/Box/Box';

const StyledList = styled(Box)`
    list-style-type: none;

    & > li.active:before {
        content: '- ';
    }
`

const List = ({ ordered = false, pl, ...props }) => (
    <StyledList
        as={ordered ? 'ol': 'ul'}
        width='100%'
        height='100%'
        borderLeft='1px solid'
        borderLeftColor='body'
        pl={pl || '2'}
        my='0'
        mt='1'
        {...props}/>
);

const ListItem = ({ isActive, ...props }) => (
    <Box
        as='li'
        py='0.5rem'
        color={isActive ? 'primary' : 'text'}
        className={isActive ? 'active' : ''}
        {...props} />
);

List.Item = ListItem;
export default List;