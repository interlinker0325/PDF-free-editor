import Main from 'components/Main/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faTags, faFileCode, faImages } from '@fortawesome/free-solid-svg-icons'

const CreatePost = ({ entry, course }) => {
    console.log('OVER HEre!!', entry, course);
    return (
        <Main>
            <form className='grid auto-rows-auto gap-6' onSubmit={() => alert('Heeeyyyy yooo!!')}>
                <section className='row-auto'>
                    <div className='form-control'>
                        <input
                            className='input text-2xl input-ghost border-transparent rounded-none w-full border-b-black'
                            type='text'
                            name='title'
                            placeholder='Título' />
                    </div>
                </section>
                <section className='row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='form-control gap-2'>
                            <label className='cursor-pointer label justify-start gap-4'>
                                <span className='label-text w-8'>
                                    <FontAwesomeIcon icon={faTags} />
                                </span>
                                <select defaultValue={'default'} className='select w-full max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black'>
                                    <option disabled value='default'>Cursos</option>
                                    <option value='curso1'>Mate</option>
                                    <option value='curso2'>hacer llamado a BE</option>
                                    <option value='curso3'>Jalar todos los cursos</option>
                                </select>
                            </label>
                            <label className='cursor-pointer label justify-start gap-4'>
                                <span className='label-text w-8'>
                                    <FontAwesomeIcon icon={faFileCode} />
                                </span>
                                <div>
                                    <input
                                        className='input hidden input-ghost w-full'
                                        type='file'
                                        name='monograph'
                                        id='monograph' />
                                    <span className='label-text border-2 border-transparent py-4 rounded-none border-b-black'>Agregar Monografía ></span>
                                </div>
                            </label>
                            <label className='cursor-pointer label justify-start gap-4'>
                                <span className='label-text w-8'>
                                    <FontAwesomeIcon icon={faImages} />
                                </span>
                                <div>
                                    <input
                                        className='input hidden input-ghost w-full'
                                        type='file'
                                        name='thumbnail'
                                        id='thumbnail' />
                                    <span className='label-text border-2 border-transparent py-4 rounded-none border-b-black'>Agregar imagen de Encabezado ></span>
                                </div>
                            </label>
                            <label className='cursor-pointer label justify-start gap-4'>
                                <span className='label-text w-8'>
                                    <FontAwesomeIcon icon={faTags} />
                                </span>
                                <div>
                                    <input
                                        className='input hidden input-ghost w-full'
                                        type='file'
                                        name='content'
                                        id='content' />
                                    <span className='label-text border-2 border-transparent py-4 rounded-none border-b-black'>Agregar contenido Adjunto ></span>
                                </div>
                            </label>
                            <label className='cursor-pointer label justify-start gap-4'>
                                <span className='label-text w-8'>
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                </span>
                                <select defaultValue={'default'} className='select max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black'>
                                    <option disabled value='default'>Co-Autores</option>
                                    <option value='name1'>Yo el quien sea</option>
                                    <option value='name2'>hacer llamado a BE</option>
                                    <option value='name3'>Jalar todos los autores</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='form-control gap-4'>
                        <textarea
                            className='textarea rounded-none resize-none bg-secondary w-full h-1/2'
                            placeholder='Agregar descripción de la publicación' />

                        <textarea
                            className='textarea rounded-none resize-none bg-secondary w-full h-1/2'
                            placeholder='Palabras claves (separado por espacio)' />
                    </div>
                </section>
                <section className='row-auto items-center flex flex-row w-full justify-between'>
                    <div className='form-control flex flex-row gap-2'>
                        <button className='btn btn-primary rounded-full'>Guardar</button>
                        <button className='btn btn-secondary rounded-full'>Cancelar</button>
                        <button className='btn btn-warning rounded-full'>Solicitar Aprobación</button>
                    </div>
                    <button className='btn btn-primary rounded-full'>Vista Previa</button>
                </section>
                <section className='row-auto'>
                    <div className='form-control'>
                        <label className='cursor-pointer label justify-start gap-4'>
                            <input type='checkbox' className='checkbox checkbox-secondary' />
                            <span className='label-text'>
                                He leido y aceptado Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dolor ut leo vehicula maximus. Sed tristique eleifend fermentum. Aenean sodales ligula at risus fringilla, et consequat nisl tristique. Cras id risus auctor, facilisis neque vitae, tempor ante. Ut fringilla augue a laoreet fermentum. Aliquam consectetur venenatis est non convallis. Nullam in massa odio.Vestibulum sit amet ligula a eros lobortis efficitur. In elementum iaculis ipsum ut pretium. Nunc vitae ultrices nisl, fringilla accumsan lectus. Vestibulum at eleifend dolor. Sed fermentum enim enim, in commodo ligula semper in. Ut eget est lacinia, convallis sapien vel, gravida diam.
                            </span>
                        </label>
                    </div>
                </section>
            </form>
        </Main>
    );
};

export default CreatePost;