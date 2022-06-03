import Box from 'components/Box/Box';

const Layout = ({ content = {}, mainRef, ...props }) => {
    if (!content.main) {
        return null;
    }

    const hasAside = !!content.aside;
    return (<>
        <Box
            {...props}
            as='main'
            display='grid'
            height={hasAside ? '90vh' : '100%'}
            gridAutoColumns={hasAside ? 'auto 38rem' : 'auto'}
            gridTemplateAreas={hasAside ? '"section aside"' : '"section"'}
            gridColumnGap='2rem'
            pb='4'>
            <Box
                ref={mainRef}
                pt='4'
                as='article'
                gridArea='section'
                display='grid'
                gridAutoRows='max-content'
                gridRowGap='3rem'
                justifyContent='stretch'
                alignItems='flex-start'
                width='100%'
                overflow='auto'>
                {content.main}
            </Box>

            {hasAside &&
                <Box
                    minWidth='25rem'
                    as='aside'
                    pt='4'
                    gridArea='aside'
                    width='100%'
                    height='100%'
                    overflow='auto'>
                    {content.aside}
                </Box>
            }
        </Box>
    </>);
}

export default Layout;
