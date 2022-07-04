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
            {/* <!-- Modal header --> */}
            <div class="flex flex-col justify-center items-center w-full">
                <h3 className="text-4xl font-roboto text-center py-11 w-full">Iniciar sesión</h3>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-[255px]'>
                <input
                    className={styles.input}
                    type='email'
                    name='email'
                    role='email'
                    placeholder='Correo Electrónico' />

                <input
                    className={styles.input}
                    type='password'
                    name='password'
                    role='password'
                    placeholder='Contraseña' />

                <button
                    type='submit'
                    className='btn h-min font-normal font-roboto text-xl capitalize btn-ghost my-6 w-full text-white bg-other rounded-full'>
                    Iniciar sesión
                </button>
            </form>
        </Modal>
    )
}

const styles = {
    input: 'bg-inputbg valid:border-other font-caslon text-black border-[1px] border-inputBorder my-2.5 p-2.5 w-full'
}

export default LoginModal;