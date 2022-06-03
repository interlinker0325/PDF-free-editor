import Box from 'components/Box/Box';

const Html = ({ html, ...props }) => {
    return (<>
        <Box
            as="div"
            dangerouslySetInnerHTML={{ __html: `${html}` }}
            {...props} />
    </ >);
};

export default Html;