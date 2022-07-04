import { useState, useEffect } from 'react';
import IFrame from 'components/IFrame/IFrame';

const PostView = ({
    user,
    post,
    students,
    courses,
    editMode = false,
    previewIframe
}) => {
    const [showFiles, setshowFiles] = useState(false);
    const toggleShowFiles = () => setshowFiles(!showFiles);
    const author = post?.author;
    const isCurrentUserAuthor = author?.id === user?.id;

    const files = Array.isArray(post?.attachments) ? post?.attachments?.map(file =>
        <a
            target='_blank'
            href={file.url}
            download={file.title || file.filename}
            key={`file_attachment_${file.id}`}
            className='text-other hover:text-primary ml-4 underline underline-offset-1'>
            {file.title || file.filename}
        </a>
    ) : [];

    let coAuthors = Array.isArray(post?.coauthors) ? post?.coauthors[0] : post?.coauthors;
    let course = post?.course;

    if (students) coAuthors = students.find(student => student.id === coAuthors);
    if (courses) course = courses.find(someCourse => someCourse.id === course);

    return (
        <article className='flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap'>
            <div className='flex flex-row items-center justify-between border-[1px] border-transparent rounded-none border-b-black'>
                <h2 className="col-span-4 text-4xl">{post.title}</h2>
                {isCurrentUserAuthor && !editMode &&
                    <a href={`/posts/${post.id}/edit`} className='align-self-end text-primary text-2xl'>{'Editar Publicación >'}</a>
                }
            </div>
            <div className='grid grid-cols-7 gap-5'>
                <IFrame className='min-h-[70vh] col-span-5 pr-5' srcDoc={previewIframe || post.monographView} />
                <aside className='col-span-2 flex flex-col gap-4 pl-5 border-2 border-transparent rounded-none border-l-black'>
                    {course &&
                        <h3 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Curso:</span>{course.name}</h3>
                    }
                    <h4 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Autor(es):</span>{author?.fullname || user?.fullname}</h4>
                    {coAuthors ?
                        Array.isArray(coAuthors) ?
                            <h4 className='text-lg font-caslon'>{coAuthors.map(coauthor => coauthor.fullname).join(', ')}</h4>
                            : <h4 className='text-lg font-caslon'>{coAuthors.fullname}</h4>
                        : null
                    }
                    <a onClick={toggleShowFiles} className='text-other hover:text-primary underline underline-offset-1'>Contenido Adjunto ></a>
                    {showFiles && files}
                </aside>
            </div>
        </article>
    );
};

export default PostView;