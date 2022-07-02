// import { useState, useCallback } from 'react';
// import { updateProfile } from 'handlers/profile';
// import Main from 'components/Main/Main';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPeopleGroup, faTags, faFileCode, faImages } from '@fortawesome/free-solid-svg-icons'

const EditProfile = (props) => {
    // const [formState, setFormState] = useState(props.profile);
    // const [errorState, setErrorState] = useState(baseErrorState);
    // const clearSubmitForm = () => useState(formBaseState);
    // const refs = {
    //     files: useRef(),
    //     coverimage: useRef(),
    //     monografia: useRef(),
    //     acceptedTerms: useRef()
    // };
    // console.log('OVER HERE', props);
    

    return (
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <section className="flex flex-col border-b-black border-b-2 pb-8 mb-5 gap-1">
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='text'
                        name='fullname'
                        placeholder='Nombre completo *'
                        value={props.profile.fullname}
                        onChange={(e) => props.onChange(e, 'fullname')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='email'
                        name='email'
                        placeholder='Correo *'
                        value={props.profile.email}
                        onChange={(e) => props.onChange(e, 'email')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='tel'
                        name='phone'
                        placeholder='Número telefónico'
                        value={props.profile.phone}
                        onChange={(e) => props.onChange(e, 'phone')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='date'
                        name='birthdate'
                        placeholder='Fecha de nacimiento'
                        value={props.profile.birthdate}
                        onChange={(e) => props.onChange(e, 'birthdate')}/>
                </div>
                <div className='form-control'>
                    <select
                        className={styles.select}
                        value={props.profile.gender}
                        onChange={(e) => props.onChange(e, 'gender')}>
                        <option className={styles.option} value='default'>Género</option>
                        <option className={styles.option} value='masculino'>Masculino</option>
                        <option className={styles.option} value='femenino'>Femenino</option>
                        <option className={styles.option} value='otro'>Otro</option>
                    </select>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='text'
                        name='residence'
                        placeholder='Residencia (provincia/canton/distrito)'
                        value={props.profile.residence}
                        onChange={(e) => props.onChange(e, 'residence')}/>
                </div>
            </section>
            <div className="flex flex-col gap-2">
                <h4 className='text-2xl text-primary'>Carrera/Universidad/Nivel:</h4>
                <textarea
                    className={styles.textarea}
                    placeholder='Agregar descripción de: Carrera/Universidad/Nivel'
                    value={props.profile.level}
                    onChange={(e) => props.onChange(e, 'level')} />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className='text-2xl text-primary'>Experiencia laboral:</h4>
                <textarea
                    className={styles.textarea}
                    placeholder='Agregar descripción de: Experiencia laboral'
                    value={props.profile.experience}
                    onChange={(e) => props.onChange(e, 'experience')} />
            </div>
        </form>
    );
};

const styles = {
    titleInput: 'font-normal text-lg font-caslon input input-sm input-ghost border-transparent rounded-none w-full border-b-black',
    label: 'cursor-pointer label justify-start gap-4',
    icon: 'label-text w-8 h-8 text-sm',
    select: 'font-normal text-lg font-caslon select input-ghost text-sm h-8 min-h-8 w-full pl-3 border-1 border-transparent rounded-none border-b-black',
    option: 'font-normal text-lg font-caslon',
    textarea: 'font-normal mb-4 h-[143px] text-lg font-caslon textarea rounded-none resize-none bg-secondary w-full h-1/2'
};

export default EditProfile;
