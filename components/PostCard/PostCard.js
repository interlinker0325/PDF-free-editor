export default function Card({
    id,
    title,
    description,
    curso,
    coverimage,
    notice
}) {
    return (
        <a href={`/posts/${id}`} className="group card cursor-pointer bg-base-100 shadow-lg hover:shadow-xl">
            {coverimage &&
                <figure><img className="max-h-48 w-full" src={coverimage.url} alt={coverimage.title} /></figure>
            }
            <div className="card-body p-4 hover group-hover:bg-primary">
                <h2 className="card-title text-base leading-5 group-hover:text-white">
                    {title}
                    {notice && <div className="badge badge-secondary">Atención</div>}
                </h2>
                <p className="text-sm max-w-prose text-ellipsis overflow-hidden line-clamp-2 group-hover:text-white">{description}</p>
                {curso &&
                    <div className="card-actions justify-end py-1">
                        <div className="text-xs group-hover:bg-white group-hover:text-primary badge badge-outline p-2">{curso.title}</div>
                    </div>
                }
            </div>
        </a>
    );
}