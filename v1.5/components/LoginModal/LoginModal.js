import useUser from 'utils/useUser';
import { useState } from 'react';
import fetchJson from 'utils/fetchJson';

import Modal from '../Modal/Modal';

const LoginModal = ({ onClose, display }) => {
    const { mutateUser } = useUser({
        callback: onClose
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
        <Modal onClose={onClose} display={display}>
            <form onSubmit={handleSubmit} className='py-10 px-16 grid grid-cols-1 gap-6 text-lg w-full p-8'>
                <h3 className="text-2xl font-bold justify-self-center">Iniciar Sesión</h3>
                <input
                    type='email'
                    name='email'
                    role='email'
                    placeholder='Correo Electrónico' />

                <input
                    type='password'
                    name='password'
                    role='password'
                    placeholder='Contraseña' />

                <button
                    type='submit'
                    className='btn btn-primary rounded-full'>
                    login
                </button>
            </form>
        </Modal>
    )
}

export default LoginModal;