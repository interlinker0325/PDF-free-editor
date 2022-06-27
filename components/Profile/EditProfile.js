import Main from 'components/Main/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faTags, faFileCode, faImages } from '@fortawesome/free-solid-svg-icons'

const formBaseState = {

};

const EditProfile = () => {
    // const [formState, setFormState] = useState(formBaseState);
    // const [errorState, setErrorState] = useState(baseErrorState);
    // const clearSubmitForm = () => useState(formBaseState);
    // const refs = {
    //     files: useRef(),
    //     coverimage: useRef(),
    //     monografia: useRef(),
    //     acceptedTerms: useRef()
    // };
    // console.log('OVER HERE', props);

    const doSubmit = (e) => {
        e.preventDefault();
        // console.log('over here form', formState);
        Object.keys(formState).forEach(key => console.log('over here form', key, typeof key));
    };

    const onChange = (e, name) => {
        delete formState[name];
        const hasRef = refs[name];
        if (hasRef) {
            setFormState({ [name]: refs[name].current.files || refs[name].current.checked, ...formState })
        } else {
            setFormState({ [name]: e.target.value , ...formState })
        }
    };
    return (
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <section className="flex flex-col border-b-black border-b-2 pb-8 gap-1">
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='text'
                        name='fullname'
                        placeholder='Nombre completo *'
                        value={''}
                        onChange={(e) => onChange(e, 'fullname')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='email'
                        name='email'
                        placeholder='Correo *'
                        value={''}
                        onChange={(e) => onChange(e, 'email')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='tel'
                        name='phone'
                        placeholder='Número telefónico'
                        value={''}
                        onChange={(e) => onChange(e, 'phone')}/>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='date'
                        name='birthday'
                        placeholder='Fecha de nacimiento'
                        value={''}
                        onChange={(e) => onChange(e, 'birthday')}/>
                </div>
                <div className='form-control'>
                    <select
                        className={styles.select}
                        value={''}
                        onChange={(e) => onChange(e, 'genero')}>
                        <option value='default'>Género</option>
                        <option value='Masculino'>Masculino</option>
                        <option value='Femenino'>Femenino</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>
                <div className='form-control'>
                    <input
                        className={styles.titleInput}
                        type='text'
                        name='residencia'
                        placeholder='Residencia (provincia/canton/distrito)'
                        value={''}
                        onChange={(e) => onChange(e, 'residencia')}/>
                </div>
            </section>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Carrera/Universidad/Nivel:</h4>
                <textarea
                    className={styles.textarea}
                    placeholder='Agregar descripción de la publicación'
                    value={''}
                    onChange={(e) => onChange(e, 'description')} />
            </div>
            <div className="flex flex-col gap-0">
                <h4 className='text-md text-primary text-lg'>Experiencia laboral:</h4>
                <textarea
                    className={styles.textarea}
                    placeholder='Agregar descripción de la publicación'
                    value={''}
                    onChange={(e) => onChange(e, 'description')} />
            </div>
        </form>
    );
};

const styles = {
    titleInput: 'input input-sm input-ghost border-transparent rounded-none w-full border-b-black',
    label: 'cursor-pointer label justify-start gap-4',
    icon: 'label-text w-8 h-8 text-sm',
    select: 'select input-ghost text-sm h-8 min-h-8 w-full pl-3 border-1 border-transparent rounded-none border-b-black',
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: 'label-text border-2 border-transparent py-2 rounded-none border-b-black',
    textarea: 'textarea rounded-none resize-none bg-secondary w-full h-1/2',
    checkbox: 'checkbox checkbox-secondary',
    button: (type) => `btn btn-${type} rounded-full`
};

export default EditProfile;
