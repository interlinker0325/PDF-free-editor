import Text from 'components/Text/Text';

const Badge = ({
    isAlert,
    children,
    ...props
}) => (
    <Text
        { ...props }
        px='2'
        py='0'
        mt='0'
        bg={isAlert ? 'red' : 'primary'}
        color='base'
        fontSize='p'
        children={isAlert ? 'Alerta' : 'Entrada'} />
);

export default Badge;
