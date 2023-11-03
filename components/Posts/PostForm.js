import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faTags, faFileCode, faFileArrowDown, faImages } from '@fortawesome/free-solid-svg-icons'
import { TERMS_AND_CONDITIONS_TEXT } from 'utils/copy';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import {log} from "../../utils/logs";

const PostForm = ({
    form,
    courses,
    clearForm,
    onChange,
    doSubmit,
    requestApproval,
    formHasChanged,
    setShowPreview,
    user,
    setAgreedterms,
    setCoAuthors,
    removeCoAuthor,
    refs
}) => {
    console.log("form.course",form.course)
    const selectedCourse = (courses || []).find(c=>c.id === form.course)
    console.log({selectedCourse})
    const courseStudents = (selectedCourse?.students || []).filter(student=>student.id !== user.id)
    return (
        <form className='font-roboto grid auto-rows-auto gap-8' onSubmit={doSubmit}>
            <section className='row-auto'>
                <div className='form-control'>
                    <input
                        className={styles.titleInput(form.title)}
                        type='text'
                        name='title'
                        placeholder='Titular de publicación *'
                        value={form.title}
                        onChange={(e) => onChange(e, 'title')}/>
                </div>
            </section>
            <section className='row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-3.5'>
                <div className='flex flex-col form-control gap-4 pt-4'>
                    <div className={styles.formControl}>
                        <FontAwesomeIcon className={styles.icon} icon={faTags} />
                        <label className={styles.label}>
                            <select
                                className={styles.select(form.course)}
                                value={form.course || 'default'}
                                onChange={(e) => onChange(e, 'course')}>
                                <option value='default'>Curso de la publicación *</option>
                                {courses.map(course =>
                                    <option key={`select_course_${course.id}`} value={course.id}>{course.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                    <div className={styles.formControl}>
                        <FontAwesomeIcon className={styles.icon} icon={faFileCode} />
                        <label className={styles.label}>
                            <div>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='monograph'
                                    id='monograph'
                                    ref={refs.monograph}
                                    onChange={(e) => onChange(e, 'monograph')}/>
                                <span htmlFor='monograph' className={styles.fileLabel(form.monograph)}>Agregar documento HTML * <span className='font-thin'>{'>'}</span></span>
                            </div>
                        </label>
                    </div>

                    <div className={styles.formControl}>
                        <FontAwesomeIcon className={styles.icon} icon={faImages} />
                        <label className={styles.label}>
                            <input
                                className={styles.fileInput}
                                type='file'
                                name='coverimage'
                                id='coverimage'
                                ref={refs.coverimage}
                                onChange={(e) => onChange(e, 'coverimage')}/>
                            <span htmlFor='coverimage' className={styles.fileLabel(form.coverimage)}>Agregar imagen de encabezado * <span className='font-thin'>{'>'}</span></span>
                        </label>
                    </div>

                    <div className={styles.formControl}>
                        <FontAwesomeIcon className={styles.icon} icon={faFileArrowDown} />
                        <label className={styles.label}>
                            <input
                                className={styles.fileInput}
                                type='file'
                                name='attachments'
                                id='attachments'
                                multiple
                                ref={refs.attachments}
                                onChange={(e) => onChange(e, 'attachments')}/>
                            <span className={styles.fileLabel(form.attachments)}>Agregar contenido adjunto <span className='font-thin'>{'>'}</span></span>
                        </label>
                    </div>

                    <div className={styles.formControl}>
                        <FontAwesomeIcon className={styles.icon} icon={faPeopleGroup} />
                        <Autocomplete
                            coAuthors={form.coauthors}
                            placeholder='Co-autores'
                            onClick={setCoAuthors}
                            suggestions={courseStudents} />
                    </div>

                    <div>
                        <h4 className='text-base font-normal font-roboto mb-2'>Autores: <span className='font-caslon text-base font-normal text-other'>{user?.fullname}</span></h4>
                            {' '}
                            {form.coauthors?.map(coauth =>
                                <span key={`coAuthor_${coauth.id}`} className='font-caslon text-base font-normal text-other gap-1 inline-flex flex-row'>
                                    {coauth.fullname}
                                    <a
                                        className='underline cursor-pointer'
                                        id={coauth.id}
                                        onClick={async (e) => removeCoAuthor(e, coauth.id)}>
                                        (-)
                                    </a>
                                </span>
                            )}
                    </div>
                </div>
                <div className='form-control gap-5'>
                    <div>
                        <textarea
                            maxLength='200'
                            className={styles.textarea(form.description)}
                            placeholder='Agregar sinopsis de la publicación (resumen) *'
                            value={form.description}
                            onChange={(e) => onChange(e, 'description')} />
                        <p className='text-sm'>Máximo 200 caracteres*</p>
                    </div>

                    <div>
                        <textarea
                            maxLength='200'
                            className={styles.textarea(form.tags)}
                            placeholder='Palabras claves *'
                            value={form.tags}
                            onChange={(e) => onChange(e, 'tags')} />
                        <p className='text-sm'>Separadas por coma*</p>
                    </div>
                </div>
            </section>
            <section className='row-auto'>
                <div className='form-control'>
                    <label className={styles.labelNoCursor}>
                        <div className='h-[23px] w-[23px] border-black border-[1px] flex flex-col justify-center items-center basis-6'>
                            {form.agreedterms &&
                                <div className='h-[20px] w-[20px] rounded-full bg-other' />
                            }
                        </div>
                        <span className='label-text normal-case text-checkbox font-thin italic max-w-[97%]'>
                            <h4 className='not-italic text-black font-normal '>Los terminos y condiciones deben ser aceptados para publicar una publicación*</h4>
                            <div className='w-full h-[800px] overflow-scroll'>
                                {TERMS_AND_CONDITIONS_TEXT}
                                <a onClick={setAgreedterms} htmlFor='agreedterms' className={styles.link} >Acepto</a>
                            </div>
                        </span>
                    </label>
                </div>
            </section>
            <section className='row-auto items-center flex flex-row w-full justify-between'>
                <div className='form-control flex flex-row gap-2'>
                    <button
                        type='submit'
                        disabled={(
                            formHasChanged &&
                                form.agreedterms &&
                                    form.title &&
                                    form.monograph &&
                                    form.coverimage &&
                                    form.description &&
                                    form.tags
                            ) ? '' : 'disabled'
                        }
                        className={styles.button}>
                        Guardar
                    </button>
                    <button
                        type='button'
                        onClick={clearForm}
                        className={styles.button}>
                        Cancelar
                    </button>
                    <button
                        type='button'
                        onClick={requestApproval}
                        disabled={(formHasChanged && form.id) ? '' : 'disabled'}
                        className={styles.button}>Solicitar Aprobación</button>
                </div>
                <button type='button' onClick={setShowPreview} className={styles.button}>Vista Previa</button>
            </section>
        </form>
    );
};

const STYLE_ACTIVE = 'text-other border-b-other';
const STYLE_INACTIVE =  'text-titleInput border-b-black';

const styles = {
    formControl: 'form-control flex flex-row gap-3.5',
    titleInput: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} bg-transparent input drop-shadow-lg font-normal text-4xl input-ghost border-transparent rounded-none w-full px-0`,
    label: 'cursor-pointer font-normal label justify-start gap-3.5 p-0',
    labelNoCursor: 'font-normal label justify-start gap-3.5 p-0',
    icon: 'label-text w-[38px] h-[36px] p-1',
    select: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} bg-transparent drop-shadow-lg font-normal text-lg h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none`,
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} label-text drop-shadow-lg font-normal text-lg border-2 border-transparent py-2 rounded-none`,
    textarea: val => `${val ? 'border-other' : ''} textarea font-normal drop-shadow-lg p-5 text-lg font-caslon h-36 rounded-none resize-none bg-secondary w-full`,
    checkbox: val => `${val ? STYLE_ACTIVE : STYLE_INACTIVE} checkbox font-normal rounded-none checked:!bg-none checked:bg-other`,
    button: 'btn min-h-min h-min py-[10px] px-[20px] bg-other hover:btn-primary hover:text-white capitalize text-white rounded-full',
    link: 'text-other uppercase cursor-pointer hover:text-primary underline underline-offset-1'
};

export default PostForm;
