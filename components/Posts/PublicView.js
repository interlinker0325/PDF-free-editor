import { useState } from 'react';
import PublicIFrame from 'components/IFrame/PublicIFrame';
import { isPostApproved } from 'utils';
let options = { year: 'numeric', month: 'long', day: 'numeric' };

const PublicView = ({
    user,
    post,
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
            href={`/api/download?uri=${file.url.replace('https://www.datocms-assets.com', '')}&mimeType=${file.mimeType}&filename=${file.filename}`}
            key={`Attachment_${file.url}`}
            className='!text-other hover:!text-primary !m-0 !no-underline'
            download={file.filename}>
            {file.title || file.filename}
        </a>
    ) : [];

    let course = post?.course;
    if (courses) course = courses.find(someCourse => someCourse.id === course);

    const postApproved = isPostApproved(post);
    let formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', options);

    return (
        <article className='flex flex-col gap-4 p-2 items-stretch justify-start content-start flex-nowrap'>
            <div className='flex flex-row items-center justify-between border-[1px] border-transparent rounded-none border-b-black'>
                <h2 className="col-span-4 text-4xl">{post.title}</h2>
                {isCurrentUserAuthor && !editMode && !postApproved &&
                    <a href={`/posts/${post.id}/edit`} className='align-self-end text-primary text-2xl'>{'Editar Publicación >'}</a>
                }
            </div>
            <div className='grid grid-cols-7 gap-5'>
                <PublicIFrame className='min-h-[70vh] col-span-5 pr-5' srcDoc={previewIframe || post.monographView} />
                <aside className='col-span-2 flex flex-col gap-4 pl-5 border-[1px] border-transparent rounded-none border-l-black'>
                    {course &&
                        <h3 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Curso:</span>{course.name}</h3>
                    }
                    <h4 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Autor(es):</span>{author?.fullname || user?.fullname}</h4>
                    {Array.isArray(post?.coauthors) && post?.coauthors.length > 0 &&
                        <h4 className='text-lg font-caslon'>{post?.coauthors.map(coauthor => coauthor.fullname).join(', ')}</h4>
                    }
                    <h4 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Tutor(a):</span>{course?.professor?.fullname}</h4>
                    <h4 className='text-lg font-caslon'><span className='text-primary font-roboto text-xl pr-2'>Fecha publicación:</span>{formattedDate}</h4>
                    <a onClick={toggleShowFiles} className='text-other hover:text-primary underline underline-offset-2'>Contenido Adjunto &gt;</a>
                    <div className='w-full pl-4 flex flex-col gap-0'>
                        {showFiles && files}
                    </div>
                </aside>
            </div>
        </article>
    );
};

export default PublicView;