import { useState } from 'react';
import IFrame from 'components/IFrame/IFrame';
import Main from 'components/Main/Main';
import useUser from 'utils/useUser';

const Post = ({ entry, course }) => {
    const { user } = useUser();
    const [showFiles, setshowFiles] = useState(false);
    const toggleShowFiles = () => setshowFiles(!showFiles);
    const author = entry?.author;
    const isCurrentUserAuthor = author.id === user?.id;

    const files = entry?.files?.map(file =>
        <a target='_blank' key={`file_attachment_${file.id}`} href={file.url} className='text-primary ml-4 text-xs underline underline-offset-1'>{file.title || file.filename}</a>
    );
    // console.log('OVER HEre!!', entry, isCurrentUserAuthor);
    return (
        <Main>
            <article className='flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap'>
                <div className='flex flex-row items-center justify-between pb-2 border-2 border-transparent rounded-none border-b-black'>
                    <h2 className="col-span-4 text-4xl">{entry.title}</h2>
                    {isCurrentUserAuthor &&
                        <a href={`/posts/${entry.id}/edit`} className='align-self-end text-primary text-lg'>{'Editar Publicación >'}</a>
                    }
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <IFrame className='min-h-[70vh] col-span-3' srcDoc={entry.monografia} />
                    <aside className='col-span-1 flex flex-col gap-2 pl-4 border-2 border-transparent rounded-none border-l-black'>
                        {entry.curso &&
                            <h3 className='text-lg'><span className='text-primary pr-2'>Curso:</span>{entry.curso.title}</h3>
                        }
                        <h4 className='text-xs'><span className='text-primary pr-2 text-lg'>Autor(es):</span>{author.name} {author.lastname}</h4>
                        {entry?.coAutores?.length > 0 && entry.coAutores.map(coAutor =>
                            <h4 key={`co-autor_${coAutor.id}`} className='text-xs'>{coAutor.name} {coAutor.lastname}</h4>
                        )}
                        <a onClick={toggleShowFiles} className='text-primary underline underline-offset-1'>Contenido Adjunto ></a>
                        {showFiles && files}
                    </aside>
                </div>
            </article>
        </Main>
    );
};

export default Post;