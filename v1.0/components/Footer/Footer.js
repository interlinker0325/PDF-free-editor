import Box from 'components/Box/Box';
import Text from 'components/Text/Text';
import Link from 'components/Link/Link';
import useUser from 'utils/useUser';

const Footer = ({ items, ...props }) => {
    const { user } = useUser();
    const navItems = items(user?.isLoggedIn || false);
    return (
        <Box
            {...props}
            as='footer'
            bg='active'
            color='white'
            width='100%'
            display='grid'
            gridTemplateColumns='1fr 1fr'
            justifyContent='space-between'
            alignItems='center'
            py='2'
            px='3'>
            <Text border='none' as='p' fontSize='h3' children='Copyright' />
            <Box
                display='grid'
                gridTemplateColumns={`repeat(${navItems.length}, max-content)`}
                gridColumnGap='3'
                alignItems='center'
                justifyContent='flex-end'>
                {navItems.map(({ display, ...item}, index) => display ? (
                    <Link
                        fontSize='h3'
                        key={`Footer_Link_${index.toString()}`}
                        pl={(index !== 0) ? '1' : '0'}
                        pr={(navItems.length - 1 > index) ? '1' : '0'}
                        color='white'
                        {...item} />
                ) : null)}
            </Box>
        </Box>
    );
}

export default Footer;
