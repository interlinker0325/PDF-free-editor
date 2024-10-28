import { INPUT_TYPES } from 'utils/form';

const EditProfile = ({ errorState, ...props }) => (
    <form className='flex flex-col gap-4' onSubmit={e => e.preventDefault()}>
        <section className='flex flex-col border-b-black border-b-2 pb-8 mb-5 gap-1'>
            <div className='form-control'>
                <input
                    className={styles.titleInput(
                        props.profile.fullname,
                        errorState.field === INPUT_TYPES.FULLNAME
                    )}
                    type='text'
                    name={INPUT_TYPES.FULLNAME}
                    placeholder='Nombre completo *'
                    value={props.profile.fullname || ''}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.FULLNAME)}/>
            </div>
            <div className='form-control'>
                <input
                    className={styles.titleInput(
                        props.profile.email,
                        errorState.field === INPUT_TYPES.EMAIL
                    )}
                    type='email'
                    name={INPUT_TYPES.EMAIL}
                    placeholder='Correo *'
                    value={props.profile.email || ''}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.EMAIL)}/>

            </div>
            <div className='form-control'>
                <input
                    className={styles.titleInput(
                        props.profile.phone,
                        errorState.field === INPUT_TYPES.PHONE
                    )}
                    type='tel'
                    name={INPUT_TYPES.PHONE}
                    maxLength='8'
                    placeholder='Número telefónico *'
                    value={props.profile.phone || ''}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.PHONE)}/>
            </div>
            <div className='form-control'>
                <input
                    className={styles.titleInput(
                        props.profile.birthdate,
                        errorState.field === INPUT_TYPES.BIRTHDATE
                    )}
                    type='date'
                    name={INPUT_TYPES.BIRTHDATE}
                    placeholder='Fecha de nacimiento *'
                    value={props.profile.birthdate || ''}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.BIRTHDATE)}/>
            </div>
            <div className='form-control'>
                <select
                    className={styles.select(
                        props.profile.gender,
                        errorState.field === INPUT_TYPES.GENDER
                    )}
                    value={props.profile.gender || 'default'}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.GENDER)}>
                    <option className={styles.option} value='default' selected='selected' disabled='disabled'>Género</option>
                    <option className={styles.option} value='masculino'>Masculino</option>
                    <option className={styles.option} value='femenino'>Femenino</option>
                    <option className={styles.option} value='otro'>Otro</option>
                </select>
            </div>
            <div className='form-control'>
                <input
                    className={styles.titleInput(
                        props.profile.residence,
                        errorState.field === INPUT_TYPES.RESIDENCE
                    )}
                    type='text'
                    name={INPUT_TYPES.RESIDENCE}
                    placeholder='Residencia (provincia/canton/distrito)'
                    value={props.profile.residence || ''}
                    onChange={(e) => props.onChange(e, INPUT_TYPES.RESIDENCE)}/>
            </div>
        </section>
        <div className='flex flex-col gap-2 mb-2'>
            <h4 className='text-2xl text-primary'>Carrera/Universidad/Nivel:</h4>
            <textarea
                maxLength='200'
                name={INPUT_TYPES.LEVEL}
                className={styles.textarea(
                    props.profile.level,
                    errorState.field === INPUT_TYPES.LEVEL
                )}
                placeholder='Agregar descripción de: Carrera/Universidad/Nivel'
                value={props.profile.level || ''}
                onChange={(e) => props.onChange(e, INPUT_TYPES.LEVEL)} />
        </div>
        {/*<div className='flex flex-col gap-2 mb-2'>*/}
        {/*    <h4 className='text-2xl text-primary'>Cursos del plan académico:</h4>*/}
        {/*    <textarea*/}
        {/*        maxLength='200'*/}
        {/*        name={INPUT_TYPES.LEVEL}*/}
        {/*        className={styles.textarea(*/}
        {/*            props.profile.level,*/}
        {/*            errorState.field === INPUT_TYPES.LEVEL*/}
        {/*        )}*/}
        {/*        placeholder='Agregar descripción de: Carrera/Universidad/Nivel'*/}
        {/*        value={props.profile.level || ''}*/}
        {/*        onChange={(e) => props.onChange(e, INPUT_TYPES.LEVEL)} />*/}
        {/*</div>*/}
        <div className='flex flex-col gap-2 mt-2'>
            <h4 className='text-2xl text-primary'>Experiencia laboral:</h4>
            <textarea
                maxLength='200'
                name={INPUT_TYPES.EXPERIENCE}
                className={styles.textarea(
                    props.profile.experience,
                    errorState.field === INPUT_TYPES.EXPERIENCE
                )}
                placeholder='Agregar descripción de: Experiencia laboral'
                value={props.profile.experience || ''}
                onChange={(e) => props.onChange(e, INPUT_TYPES.EXPERIENCE)} />
        </div>
    </form>
);

const STYLE_ACTIVE = 'text-primary border-b-other';
const STYLE_INACTIVE =  'text-titleInput border-b-black';
const STYLE_ERROR =  'placeholder:text-error text-error border-b-error';

const styles = {
    titleInput: (val, err) => `${err ? STYLE_ERROR : val ? STYLE_ACTIVE : STYLE_INACTIVE} w-1/2 font-normal text-xl font-caslon input input-sm input-ghost border-transparent rounded-none`,
    label: 'cursor-pointer label justify-start gap-4',
    icon: 'label-text w-8 h-8 text-sm',
    select: (val, err) => `${err ? STYLE_ERROR : val ? STYLE_ACTIVE : STYLE_INACTIVE} w-1/2 font-normal text-xl font-caslon select input-ghost h-8 min-h-8 pl-3 border-[1px] border-transparent rounded-none`,
    option: 'font-normal text-xl font-caslon',
    textarea: (val, err) => `${err ? 'text-error border-error' : val ? 'text-black border-primary' : 'border-transparent text-titleInput'} w-full font-normal mb-4 h-[143px] text-xl font-caslon textarea rounded-none resize-none bg-secondary h-1/2`
};

export default EditProfile;
