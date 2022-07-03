import { useState } from 'react';
import IFrame from 'components/IFrame/IFrame';

const PostView = ({
    user,
    post
}) => {
    const [showFiles, setshowFiles] = useState(false);
    const toggleShowFiles = () => setshowFiles(!showFiles);
    const author = post?.author;
    const isCurrentUserAuthor = author?.id === user?.id;

    const files = post?.attachments?.map(file =>
        <a target='_blank' key={`file_attachment_${file.id}`} href={file.url} className='text-primary ml-4 text-xs underline underline-offset-1'>{file.title || file.filename}</a>
    );

    return (
        <article className='flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap'>
            <div className='flex flex-row items-center justify-between pb-2 border-2 border-transparent rounded-none border-b-black'>
                <h2 className="col-span-4 text-4xl">{post.title}</h2>
                {isCurrentUserAuthor &&
                    <a href={`/posts/${post.id}/edit`} className='align-self-end text-primary text-lg'>{'Editar Publicación >'}</a>
                }
            </div>
            <div className='grid grid-cols-4 gap-4'>
                <IFrame className='min-h-[70vh] col-span-3' srcDoc={post.monograph} />
                <aside className='col-span-1 flex flex-col gap-2 pl-4 border-2 border-transparent rounded-none border-l-black'>
                    {post.course &&
                        <h3 className='text-lg'><span className='text-primary pr-2'>Curso:</span>{post.course.name}</h3>
                    }
                    <h4 className='text-xs'><span className='text-primary pr-2 text-lg'>Autor(es):</span>{author?.fullname || user?.fullname}</h4>
                    {post?.coauthors?.length > 0 && Array.isArray(post.coauthors) ?
                        post.coauthors.map(coauthor =>
                            <h4 key={`co-autor_${coauthor.id}`} className='text-xs'>{coauthor.fullname}</h4>
                        ) : <h4 className='text-xs'>{post?.coauthors.fullname}</h4>
                    }
                    <a onClick={toggleShowFiles} className='text-other hover:text-primary underline underline-offset-1'>Contenido Adjunto ></a>
                    {showFiles && files}
                </aside>
            </div>
        </article>
    );
};

export default PostView;