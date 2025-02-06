"use client"

// Shadcn IU
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import useUser from 'utils/useUser';
import {useState} from 'react';
import fetchJson from 'utils/fetchJson';

import Modal from '../Modal/Modal';
import {verifyMutipleFields, INPUT_TYPES} from 'utils/form';

const DEFAULT_ERRORFORM = {field: null, msg: null};

const LoginModal = ({onClose, display}) => {
  const {mutateUser} = useUser({
    callback: onClose
  });
  const [open, setOpen] = useState(false)
  const [errorForm, setErrorForm] = useState(DEFAULT_ERRORFORM);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const fieldsStatus = verifyMutipleFields([
      {field: INPUT_TYPES.EMAIL, value: email, required: true},
      {field: INPUT_TYPES.PASSWORD, value: password, required: true}
    ]);

    if (fieldsStatus) {
      setErrorForm(fieldsStatus);
      return;
    } else {
      setErrorForm(DEFAULT_ERRORFORM);
    }

    const body = {email, password};

    try {
      mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
          }),
      );
    } catch (error) {
      console.log('An unexpected error happened:', error);
      setErrorForm(error.data);
    }
  }

  if (!display)
      return null;

  return (
      // <Modal onClose={onClose} display={display}>
      //   {/* <!-- Modal header --> */}
      //   <div class='flex flex-col justify-center items-center w-full'>
      //     <h3 className='text-4xl font-roboto text-center py-11 w-full'>Iniciar sesión</h3>
      //   </div>
      //   <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-[255px]' noValidate={true}>
      //     <div className='form-control w-full'>
      //       <input
      //           className={styles.input}
      //           type='email'
      //           name='email'
      //           role='email'
      //           required=''
      //           placeholder='Correo Electrónico'/>

      //       {errorForm.field !== 'email' ? null :
      //           <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
      //       }
      //     </div>

      //     <div className='form-control w-full'>
      //       <input
      //           className={styles.input}
      //           type='password'
      //           name='password'
      //           role='password'
      //           placeholder='Contraseña'/>

      //       {errorForm.field !== 'password' ? null :
      //           <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
      //       }
      //     </div>

      //     <Button type='submit' className={'w-full mt-4'}>
      //       Iniciar sesión
      //     </Button>
      //   </form>
      // </Modal>

      <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Iniciar sesión</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  {errorForm.field !== 'email' ? null :
                    <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
                  }
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  {errorForm.field !== 'password' ? null :
                    <p className='text-error text-sm -mt-2'>{errorForm.msg}</p>
                  }
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Iniciar sesión
                  </button>
                </div>
                {/* <div className="text-sm text-center">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div> */}
              </form>
            </div>
          </div>
      </div>
  )
}

const styles = {
  input: 'bg-inputbg valid:border-other font-caslon text-black border-[1px] border-inputBorder my-2.5 p-2.5 w-full'
}

export default LoginModal;