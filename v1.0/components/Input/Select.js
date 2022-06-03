import Box from 'components/Box/Box';
import { fonts } from 'styles/theme';

const Select = ({
    label,
    items = [],
    icon = null,
    active = false,
    ...props
}) => items.length > 0 ? (
    <Box
        as='select'
        color={active ? 'primary' : 'body'}
        borderBottomColor={active ? 'primary' : 'body'}
        {...props}>
        {[{ name: label, id: 'label' }, ...items].map((item, index) =>
            <Box
                key={`${item.name}_selectItem_${index}`}
                as='option'
                fontSize='h3'
                value={item.id}
                children={item.name} />
        )}
    </Box>
) : null;

Select.defaultProps = {
    fontFamily: fonts.roboto,
    fontSize: 'h3',
    border: 'none',
    borderBottom: '1px solid',
    paddingBottom: '1'
}

export default Select;