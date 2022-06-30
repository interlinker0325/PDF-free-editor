import Main from 'components/Main/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faTags, faFileCode, faImages } from '@fortawesome/free-solid-svg-icons'

const CreatePost = ({
    form,
    courses,
    students,
    doSubmit,
    clearForm,
    onChange,
    refs
}) => {
    // console.log('OVER HEre!!', courses, students);
    return (
        <Main>
            <form className='font-roboto grid auto-rows-auto gap-6' onSubmit={doSubmit}>
                <section className='row-auto'>
                    <div className='form-control'>
                        <input
                            className={styles.titleInput}
                            type='text'
                            name='title'
                            placeholder='Titular de publicación'
                            value={form.title}
                            onChange={(e) => onChange(e, 'title')}/>
                    </div>
                </section>
                <section className='row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-3.5'>
                    <div className='flex flex-col form-control gap-3.5 pt-4'>
                        <label className={styles.label}>
                            <FontAwesomeIcon className={styles.icon} icon={faTags} />
                            <select
                                className={styles.select}
                                value={form.course}
                                onChange={(e) => onChange(e, 'course')}>
                                <option value='default'>Cursos</option>
                                {courses.map(course =>
                                    <option key={`select_course_${course.id}`} value={course.id}>{course.title}</option>
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
                                    id='monografia'
                                    ref={refs.monografia}
                                    onChange={(e) => onChange(e, 'monografia')}/>
                                <span htmlFor='monografia' className={styles.fileLabel}>Agregar Monografía ></span>
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
                                <span htmlFor='coverimage' className={styles.fileLabel}>Agregar imagen de Encabezado ></span>
                            </div>
                        </label>
                        <label className={styles.label}>
                            <FontAwesomeIcon className={styles.icon} icon={faTags} />
                            <div>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='files'
                                    id='files'
                                    multiple
                                    ref={refs.files}
                                    onChange={(e) => onChange(e, 'files')}/>
                                <span className={styles.fileLabel}>Agregar contenido Adjunto ></span>
                            </div>
                        </label>
                        <label className={styles.label}>
                            <FontAwesomeIcon className={styles.icon} icon={faPeopleGroup} />
                            <select
                                className={styles.select}
                                value={form.coAutores}
                                onChange={(e) => onChange(e, 'coAutores')}>
                                <option value='default'>Co-Autores</option>
                                {students.map(student =>
                                    <option key={`select_student_${student.id}`} value={student.id}>{student.name} {student.lastname}</option>
                                )}
                            </select>
                        </label>
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
                                className={styles.checkbox}
                                ref={refs.acceptedTerms}
                                checked={form.acceptedTerms}
                                onChange={(e) => onChange(e, 'acceptedTerms')}/>
                            <span className='label-text'>
                                He leido y aceptado Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dolor ut leo vehicula maximus. Sed tristique eleifend fermentum. Aenean sodales ligula at risus fringilla, et consequat nisl tristique. Cras id risus auctor, facilisis neque vitae, tempor ante. Ut fringilla augue a laoreet fermentum. Aliquam consectetur venenatis est non convallis. Nullam in massa odio.Vestibulum sit amet ligula a eros lobortis efficitur. In elementum iaculis ipsum ut pretium. Nunc vitae ultrices nisl, fringilla accumsan lectus. Vestibulum at eleifend dolor. Sed fermentum enim enim, in commodo ligula semper in. Ut eget est lacinia, convallis sapien vel, gravida diam.
                            </span>
                        </label>
                    </div>
                </section>
                <section className='row-auto items-center flex flex-row w-full justify-between'>
                    <div className='form-control flex flex-row gap-2'>
                        <button type='submit' className={styles.button('secondary')}>Guardar</button>
                        <button type='button' onClick={clearForm} className={styles.button('secondary')}>Cancelar</button>
                        <button type='button' className={styles.button('warning')}>Solicitar Aprobación</button>
                    </div>
                    <button type='button' className={styles.button('primary')}>Vista Previa</button>
                </section>
            </form>
        </Main>
    );
};

const styles = {
    titleInput: 'input text-4xl input-ghost border-transparent rounded-none w-full border-b-black px-0',
    label: 'cursor-pointer label justify-start gap-3.5',
    icon: 'label-text w-[38px] h-[36px] p-1 text-lg',
    select: 'select text-lg h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black',
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: 'label-text text-lg border-2 border-transparent py-2 rounded-none border-b-black',
    textarea: 'textarea p-5 text-lg font-caslon h-36 rounded-none resize-none bg-secondary w-full',
    checkbox: 'checkbox checkbox-secondary',
    button: (type) => `btn btn-${type} rounded-full`
};

export default CreatePost;