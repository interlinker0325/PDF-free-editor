import { isOdd } from 'utils';

const Courses = ({ items }) => {
    // console.log('OVER HERE!!!', items);
    return (
        <div className='overflow-x-auto'>
            <table className='w-full'>
                <tbody>
                    {items && items.map((item, itemIndex) =>
                        <tr
                            key={`User_courses_${itemIndex}`}
                            className={`flex flex-row justify-between w-full py-2 px-4 ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
                            <td className='rounded-l-none rounded-r-none w-full'>{item.title}</td>
                            <td className={`rounded-l-none rounded-r-none ${item.enabled ? 'text-success' : 'text-secondary'}`}>
                                {item.enabled ? 'Activo' : 'Inactivo'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Courses;
