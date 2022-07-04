const EditProfile = (props) => {
    return (
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <section className="flex flex-col border-b-black border-b-2 pb-8 mb-5 gap-1">
                <div className='form-control'>
                    <input
                        className={styles.titleInput(props.profile.fullname)}
                        type='text'
                        name='fullname'
                        placeholder='Nombre completo *'
                        value={props.profile.fullname}
                        onChange={(e) => props.onChange(e, 'fullname')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput(props.profile.email)}
                        type='email'
                        name='email'
                        placeholder='Correo *'
                        value={props.profile.email}
                        onChange={(e) => props.onChange(e, 'email')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput(props.profile.phone)}
                        type='tel'
                        name='phone'
                        placeholder='Número telefónico *'
                        value={props.profile.phone}
                        onChange={(e) => props.onChange(e, 'phone')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput(props.profile.birthdate)}
                        type='date'
                        name='birthdate'
                        placeholder='Fecha de nacimiento *'
                        value={props.profile.birthdate}
                        onChange={(e) => props.onChange(e, 'birthdate')}/>
                </div>
                <div className='form-control'>
                    <select
                        className={styles.select(props.profile.gender)}
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
                        className={styles.titleInput(props.profile.residence)}
                        type='text'
                        name='residence'
                        placeholder='Residencia (provincia/canton/distrito)'
                        value={props.profile.residence}
                        onChange={(e) => props.onChange(e, 'residence')}/>
                </div>
            </section>
            <div className="flex flex-col gap-2 mb-2">
                <h4 className='text-2xl text-primary'>Carrera/Universidad/Nivel:</h4>
                <textarea
                    maxLength='200'
                    className={styles.textarea(props.profile.level)}
                    placeholder='Agregar descripción de: Carrera/Universidad/Nivel'
                    value={props.profile.level}
                    onChange={(e) => props.onChange(e, 'level')} />
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <h4 className='text-2xl text-primary'>Experiencia laboral:</h4>
                <textarea
                    maxLength='200'
                    className={styles.textarea(props.profile.experience)}
                    placeholder='Agregar descripción de: Experiencia laboral'
                    value={props.profile.experience}
                    onChange={(e) => props.onChange(e, 'experience')} />
            </div>
        </form>
    );
};

const STYLE_ACTIVE = 'text-other border-b-other';
const STYLE_INACTIVE =  'text-titleInput border-b-black';

const styles = {
    titleInput: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} w-1/2 font-normal text-xl font-caslon input input-sm input-ghost border-transparent rounded-none`,
    label: 'cursor-pointer label justify-start gap-4',
    icon: 'label-text w-8 h-8 text-sm',
    select: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} w-1/2 font-normal text-xl font-caslon select input-ghost h-8 min-h-8 pl-3 border-[1px] border-transparent rounded-none`,
    option: 'font-normal text-xl font-caslon',
    textarea: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} w-full font-normal mb-4 h-[143px] text-xl font-caslon textarea rounded-none resize-none bg-secondary h-1/2`
};

export default EditProfile;
