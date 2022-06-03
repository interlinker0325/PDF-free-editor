import { useSessionState } from '@dannyman/use-store';
import Flex from 'components/Flex/Flex';
import Text from 'components/Text/Text';
import { useEffect, useState } from 'react';


const Loader = ({ text, isLoading = false }) => {
    const [top, setTop] = useState(0);

    const onScroll = () => {
        setTop(window.top.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        onScroll();
    }, [isLoading]);

    return isLoading && (<>
        <Flex
            justifyContent="center"
            height="100%"
            width="100%"
            backgroundColor="lightGray"
            top={top}
            left="0"
            opacity="0.8"
            zIndex="9999"
            position="absolute">
            <Text as='h2' variant='sectionTitle' children={text} />
        </Flex>
    </>);
};

export default Loader;