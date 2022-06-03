import { fonts } from 'styles/theme';
import Box from 'components/Box/Box';
import Link from 'components/Link/Link';
import useUser from 'utils/useUser';

const Header = ({ items, ...props }) => {
    const { user } = useUser();
    const navItems = items(user?.isLoggedIn || false);
    return (
        <Box
            as='header'
            display='grid'
            gridTemplateColumns='1fr 1fr'
            justifyContent='space-between'
            alignItems='flex-end'
            pt='2'
            borderBottom='solid 1px black'
            {...props}>
            <Link
                href='/'
                as='h1'
                fontSize='h0'
                fontFamily={fonts.stix}
                lineHeight='50px'
                fontWeight='400'
                variant='active'
                letterSpacing='8px'
                mb='-2'>
                ADLYCEUM
            </Link>
            <Box
                display='grid'
                gridTemplateColumns={`repeat(${user && user.isLoggedIn ? navItems.length : navItems.length - 1}, max-content)`}
                gridColumnGap='3'
                alignItems='flex-end'
                justifyContent='flex-end'>
                {navItems.map(({ display, ...item}, index) => display ? (
                    <Link
                        key={`Header_Link_${index.toString()}`}
                        py='1'
                        color='black'
                        fontSize='h2'
                        {...item} />
                ) : null)}
            </Box>
        </Box>
    );
}

export default Header;
