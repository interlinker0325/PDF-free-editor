import Button from 'components/Button/Button';
import Flex from 'components/Flex/Flex';

const PostFormFooter = ({
    clearForm,
    recordId,
    ...props
}) => (
    <Flex {...props}>
        <Button
            mr='2'
            type='submit'
            variant={['primary', 'small', 'rounded']}
            children={recordId ? 'Publicar' : 'Guardar'} />
        <Button
            ml='2'
            type='button'
            variant={['small', 'rounded']}
            onClick={clearForm}
            children='Borrar'/>
    </Flex>
);

export default PostFormFooter;