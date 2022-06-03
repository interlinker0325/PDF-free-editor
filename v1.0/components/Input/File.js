import React from 'react';
import { fonts } from 'styles/theme';
import Box from 'components/Box/Box';
import Text from 'components/Text/Text';
import Input from 'components/Input/Input';

const File = React.forwardRef(({
    label,
    name,
    borderColor = 'body',
    onChange,
    active,
    multiple,
    ...props
}, ref) => (
    <Box
        color={active ? 'primary' : 'body'}
        borderColor={active ? 'primary' : borderColor}
        {...props}>
        <Text as='label' htmlFor={name} children={label} />
        <Input display='none' type='file' onChange={onChange} id={name} name={name} ref={ref} multiple={multiple} />
    </Box>
));

File.defaultProps = {
    fontSize: 'h3',
    border: 'none',
    borderBottom: '1px solid',
    paddingBottom: '1',
    fontFamily: fonts.roboto
};

export default File;