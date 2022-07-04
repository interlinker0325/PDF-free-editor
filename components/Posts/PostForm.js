import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faTags, faFileCode, faImages } from '@fortawesome/free-solid-svg-icons'

const PostForm = ({
    form,
    courses,
    students,
    clearForm,
    onChange,
    doSubmit,
    requestApproval,
    formHasChanged,
    setShowPreview,
    user,
    refs
}) => {
    const coAuthors = students.find(student => student.id === (form.coauthors?.id || form.coauthors));
    return (
        <form className='font-roboto grid auto-rows-auto gap-8' onSubmit={doSubmit}>
            <section className='row-auto'>
                <div className='form-control'>
                    <input
                        className={styles.titleInput(form.title)}
                        type='text'
                        name='title'
                        placeholder='Titular de publicación'
                        value={form.title}
                        onChange={(e) => onChange(e, 'title')}/>
                </div>
            </section>
            <section className='row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-3.5'>
                <div className='flex flex-col form-control gap-4 pt-4'>
                    <label className={styles.label}>
                        <FontAwesomeIcon className={styles.icon} icon={faTags} />
                        <select
                            className={styles.select(form.course)}
                            value={form.course || 'default'}
                            onChange={(e) => onChange(e, 'course')}>
                            <option value='default'>Curso de la publicación</option>
                            {courses.map(course =>
                                <option key={`select_course_${course.id}`} value={course.id}>{course.name}</option>
                            )}
                        </select>
                    </label>
                    <label className={styles.label}>
                        <FontAwesomeIcon className={styles.icon} icon={faFileCode} />
                        <div>
                            <input
                                className={styles.fileInput}
                                type='file'
                                name='monograph'
                                id='monograph'
                                ref={refs.monograph}
                                onChange={(e) => onChange(e, 'monograph')}/>
                            <span htmlFor='monograph' className={styles.fileLabel(form.monograph)}>Agregar documento HTML ></span>
                        </div>
                    </label>
                    <label className={styles.label}>
                        <FontAwesomeIcon className={styles.icon} icon={faImages} />
                        <div>
                            <input
                                className={styles.fileInput}
                                type='file'
                                name='coverimage'
                                id='coverimage'
                                ref={refs.coverimage}
                                onChange={(e) => onChange(e, 'coverimage')}/>
                            <span htmlFor='coverimage' className={styles.fileLabel(form.coverimage)}>Agregar imagen de encabezado ></span>
                        </div>
                    </label>
                    <label className={styles.label}>
                        <FontAwesomeIcon className={styles.icon} icon={faTags} />
                        <div>
                            <input
                                className={styles.fileInput}
                                type='file'
                                name='attachments'
                                id='attachments'
                                multiple
                                ref={refs.attachments}
                                onChange={(e) => onChange(e, 'attachments')}/>
                            <span className={styles.fileLabel(form.attachments)}>Agregar contenido adjunto ></span>
                        </div>
                    </label>
                    <label className={styles.label}>
                        <FontAwesomeIcon className={styles.icon} icon={faPeopleGroup} />
                        <select
                            className={styles.select(form.coauthors)}
                            value={form.coauthors || 'default'}
                            onChange={(e) => onChange(e, 'coauthors')}>
                            <option value='default'>Co-autores</option>
                            {students.map(student =>
                                <option key={`select_student_${student.id}`} value={student.id}>{student.fullname}</option>
                            )}
                        </select>
                    </label>

                    <h4 className='text-base font-normal font-roboto'>Autor(a) original: <span className='font-caslon text-base font-normal text-other'>{user?.fullname}</span></h4>
                    <h4 className='text-base font-normal font-roboto'>Co-autores: <span className='font-caslon text-base font-normal text-other'>{coAuthors?.fullname}</span></h4>
                </div>
                <div className='form-control gap-5'>
                    <div>
                        <textarea
                            className={styles.textarea}
                            placeholder='Agregar sinopsis de la publicación (resumen)'
                            value={form.description}
                            onChange={(e) => onChange(e, 'description')} />
                        <p className='text-sm'>Máximo 200 caracteres*</p>
                    </div>

                    <div>
                        <textarea
                            className={styles.textarea}
                            placeholder='Palabras claves'
                            value={form.tags}
                            onChange={(e) => onChange(e, 'tags')} />
                        <p className='text-sm'>Separadas por coma*</p>
                    </div>
                </div>
            </section>
            <section className='row-auto'>
                <div className='form-control'>
                    <label className={styles.label}>
                        <input
                            type='checkbox'
                            className={styles.checkbox(form.agreedterms)}
                            ref={refs.agreedterms}
                            checked={form.agreedterms}
                            onChange={(e) => onChange(e, 'agreedterms')}/>
                        <span className='label-text text-checkbox font-thin italic'>
                            <h4 className='not-italic text-black font-normal '>Los terminos y condiciones deben ser aceptados para publicar una publicación*</h4>
                            {' '}
                            consectetur adipiscing elit. Proin id dolor ut leo vehicula maximus. Sed tristique eleifend fermentum. Aenean sodales ligula at risus fringilla, et consequat nisl tristique. Cras id risus auctor, facilisis neque vitae, tempor ante. Ut fringilla augue a laoreet fermentum. Aliquam consectetur venenatis est non convallis. Nullam in massa odio.Vestibulum sit amet ligula a eros lobortis efficitur. In elementum iaculis ipsum ut pretium. Nunc vitae ultrices nisl, fringilla accumsan lectus. Vestibulum at eleifend dolor. Sed fermentum enim enim, in commodo ligula semper in. Ut eget est lacinia, convallis sapien vel, gravida diam.
                            {' '}
                            <a className={styles.link} >Acepto</a>
                        </span>
                    </label>
                </div>
            </section>
            <section className='row-auto items-center flex flex-row w-full justify-between'>
                <div className='form-control flex flex-row gap-2'>
                    <button type='submit' disabled={(formHasChanged && form.agreedterms) ? '' : 'disabled'} className={styles.button}>Guardar</button>
                    <button type='button' onClick={clearForm} className={styles.button}>Cancelar</button>
                    <button type='button' onClick={requestApproval} disabled={(formHasChanged && form.id) ? '' : 'disabled'} className={styles.button}>Solicitar Aprobación</button>
                </div>
                <button type='button' onClick={() => setShowPreview(true)} className={styles.button}>Vista Previa</button>
            </section>
        </form>
    );
};

const STYLE_ACTIVE = 'text-other border-b-other';
const STYLE_INACTIVE =  'text-titleInput border-b-black';

const styles = {
    titleInput: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} input font-normal text-4xl input-ghost border-transparent rounded-none w-full px-0`,
    label: 'cursor-pointer font-normal label justify-start gap-3.5 p-0',
    icon: 'label-text w-[38px] h-[36px] p-1',
    select: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} select font-normal text-lg h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none`,
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} label-text font-normal text-lg border-2 border-transparent py-2 rounded-none`,
    textarea: 'textarea font-normal p-5 text-lg font-caslon h-36 rounded-none resize-none bg-secondary w-full',
    checkbox: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} checkbox font-normal checkbox-secondary`,
    button: 'btn min-h-min h-min py-[10px] px-[20px] bg-other hover:btn-primary hover:text-white capitalize text-white rounded-full',
    link: 'text-other uppercase cursor-pointer hover:text-primary underline underline-offset-1'
};

export default PostForm;