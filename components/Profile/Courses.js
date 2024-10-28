import { isOdd } from 'utils';

const Courses = ({ items }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full'>
                <tbody>
                    {items && items.map((item, itemIndex) =>
                        <tr
                            key={`User_courses_${itemIndex}`}
                            className={`flex flex-row justify-between w-full py-2 px-4 text-2xl font-normal ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
                            <td className='rounded-l-none rounded-r-none w-full'>{item.name}</td>
                            <td className={`rounded-l-none rounded-r-none font-thin ${item.enabled ? 'text-success' : 'text-secondary'}`}>
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
