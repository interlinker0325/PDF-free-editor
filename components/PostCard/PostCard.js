export default function Card({
    id,
    title,
    description,
    course,
    coverimage
}) {
    return (
        <a href={`/posts/${id}`} className='group card cursor-pointer bg-base-100 shadow-lg hover:shadow-xl border-[1px] border-transparent rounded-none border-b-black hover:border-b-transparent'>
            {coverimage &&
                <figure><img className='h-[150px] w-full' src={coverimage.url} alt={coverimage.title} /></figure>
            }
            <div className='card-body p-4 hover group-hover:bg-other pb-6 gap-4'>
                <h2 className='card-title line-clamp-3 font-roboto font-normal text-2xl leading-5 group-hover:text-white'>
                    {title}
                </h2>
                <p className='text-base font-normal font-caslon max-w-prose text-ellipsis overflow-hidden line-clamp-2 group-hover:text-white'>{description}</p>
            </div>
        </a>
    );
}
