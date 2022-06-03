import Flex from 'components/Flex/Flex';
import Modal from 'components/Modal/Modal';
import Text from 'components/Text/Text';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import useUser from 'utils/useUser';
import { useState } from 'react';
import fetchJson from 'utils/fetchJson';

const LoginModal = (props) => {
    const { mutateUser } = useUser({
        callback: props.onClose
    });

    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        };

        try {
          mutateUser(
            await fetchJson('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }),
          );
        } catch (error) {
            console.error("An unexpected error happened:", error);
            setErrorMsg(error.data);
        }
    }

    return (
        <Modal
            bg='white'
            py='4rem'
            pt='3rem'
            px='7rem'
            minWidth='37rem'
            { ...props }>
            <Flex
                as='form'
                onSubmit={handleSubmit}
                flexDirection='column'
                justifyContent='center'
                alignItems='strech'
                width='100%'>
                <Text
                    as='h2'
                    fontSize='h1'
                    my={2}
                    px={3}
                    width='100%'
                    textAlign='center'
                    children='Iniciar sessión' />

                <Input
                    type='email'
                    name='email'
                    role='email'
                    variant='modal'
                    p='1'
                    pr='2'
                    pl='2'
                    placeholder='Correo electrónico'/>

                <Input
                    type='password'
                    name='password'
                    role='password'
                    variant='modal'
                    p='1'
                    pr='2'
                    pl='2'
                    placeholder='Contraseña'/>

                <Button
                    type='submit'
                    my='3'
                    variant={['primary', 'small', 'rounded']}
                    children='Iniciar sessión'/>
            </Flex>
        </Modal>
    );
}

export default LoginModal;
