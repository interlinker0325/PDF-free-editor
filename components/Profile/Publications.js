import { isOdd } from 'utils';

const Publications = ({ items }) => (
    <div className='overflow-x-auto'>
        <table className='w-full'>
            <tbody>
                {items && items.map((item, itemIndex) =>
                    <tr
                        key={`Publication_${item.id}_${itemIndex}`}
                        className={`${styles.tableRow} ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
                        <td className={styles.title}>
                            <a
                                href={`/posts/${item.id}`}
                                key={`User_posts_${itemIndex}`}
                                children={item.title} />
                        </td>
                        <td className={`${styles.status} ${styles[item.review]}`}>
                            {item.review}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

const styles = {
    tableRow: 'flex flex-row justify-between w-full py-2 px-4 text-2xl font-normal',
    title: 'rounded-l-none rounded-r-none w-full hover:text-primary hover:underline hover:underline-offset-1',
    status: 'rounded-l-none rounded-r-none font-thin',
    Aprobado: 'text-success',
    Denegado: 'text-error',
    Pendiente: 'text-black'
}

export default Publications;
