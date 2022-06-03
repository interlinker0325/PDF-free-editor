import Flex from 'components/Flex/Flex';
import Button from 'components/Button/Button';

const Modal = ({ display, onClose, ...props }) => {
    if (!display) {
        return null;
    }

    return (
        <Flex
            position='fixed'
            overflowY='auto'
            top='0'
            right='0'
            bottom='0'
            left='0'
            bg='rgba(0, 0, 0, 0.3)'
            justifyContent='center'
            alignItems='center'
            zIndex='100'>

            <Flex
                flexDirection='column'
                bg='white'
                boxShadow='0 19px 38px rgb(0 0 0 / 12%), 0 15px 12px rgb(0 0 0 / 22%)'>
                    <Button
                        alignSelf='flex-end'
                        variant='close'
                        onClick={onClose}>
                        x
                    </Button>
                    <Flex p='4' { ...props } />
            </Flex>
        </Flex>
    );
}

export default Modal;
