import { isOdd } from 'utils';

const Publications = ({ items }) => (
    <div className='overflow-x-auto'>
        <table className='w-full'>
            <tbody>
                {items && items.map((item, itemIndex) =>
                    <a
                        href={`/posts/${item.id}`}
                        key={`User_posts_${itemIndex}`}>
                        <tr
                            className={`${styles.tableRow} ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
                            <td className={styles.title}>{item.title}</td>
                            <td className={`${styles.status} ${styles[item.review]}`}>
                                {item.review}
                            </td>
                        </tr>
                    </a>
                )}
            </tbody>
        </table>
    </div>
);

const styles = {
    tableRow: 'flex flex-row justify-between w-full py-2 px-4 hover:text-primary hover:underline hover:underline-offset-1',
    title: 'rounded-l-none rounded-r-none w-full',
    status: 'rounded-l-none rounded-r-none',
    Aprobado: 'text-success',
    Denegado: 'text-error',
    Pendiente: 'text-black'
}

export default Publications;
