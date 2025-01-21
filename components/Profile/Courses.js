import { isOdd } from 'utils';

// shadcn IU
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
const Courses = ({ items }) => {
    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableBody>
                    {items && items.map((item, itemIndex) =>
                        <TableRow
                            key={`User_courses_${itemIndex}`}
                            className={`${item.enabled ? 'opacity-100' : 'opacity-5'} flex flex-row justify-between w-full py-2 px-4 text-2xl font-normal ${!isOdd(itemIndex) ? 'bg-secondary' : 'bg-[#eef2f7]'}`}>
                            <td className='rounded-l-none rounded-r-none w-full line-clamp-3'>{item.name}</td>
                            <td className={`rounded-l-none rounded-r-none font-thin`}>
                                {item.enabled ? 'Activo' : 'Inactivo'}
                            </td>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Courses;
