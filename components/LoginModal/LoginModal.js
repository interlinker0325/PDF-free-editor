import useUser from 'utils/useUser';
import { useState } from 'react';
import fetchJson from 'utils/fetchJson';

import Modal from '../Modal/Modal';
import { verifyMutipleFields, INPUT_TYPES } from 'utils/form';
const DEFAULT_ERRORFORM = { field: null, msg: null };

const LoginModal = ({ onClose, display }) => {
    const { mutateUser } = useUser({
        callback: onClose
    });

    const [errorForm, setErrorForm] = useState(DEFAULT_ERRORFORM);

    async function handleSubmit(e) {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const fieldsStatus = verifyMutipleFields([
            { field: INPUT_TYPES.EMAIL, value: email, required: true },
            { field: INPUT_TYPES.PASSWORD, value: password, required: true }
        ]);

        if (fieldsStatus) {
            setErrorForm(fieldsStatus);
            return;
        } else {
            setErrorForm(DEFAULT_ERRORFORM);
        }

        const body = { email, password };

        try {
        mutateUser(
            await fetchJson('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }),
        );
        } catch (error) {
            console.log('An unexpected error happened:', error);
            setErrorForm(error.data);
        }
    }

    return (
        <Modal onClose={onClose} display={display}>
            {/* <!-- Modal header --> */}
            <div class='flex flex-col justify-center items-center w-full'>
                <h3 className='text-4xl font-roboto text-center py-11 w-full'>Iniciar sesión</h3>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-[255px]' noValidate={true}>
                <div className='form-control w-full'>
                    <input
                        className={styles.input}
                        type='email'
                        name='email'
                        role='email'
                        required=''
                        placeholder='Correo Electrónico' />

                    {errorForm.field !== 'email' ? null :
                        <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
                    }
                </div>

                <div className='form-control w-full'>
                    <input
                        className={styles.input}
                        type='password'
                        name='password'
                        role='password'
                        placeholder='Contraseña' />

                    {errorForm.field !== 'password' ? null :
                        <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
                    }
                </div>

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