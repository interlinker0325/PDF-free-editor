import {isOdd, POST_REVIEW_STATUS} from 'utils';

// Styles
import styles from './styles'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Publications = ({items, label, user, isAdmin}) => {
  const isCurrentUserAuthor = item => user?.id === item?.author?.id
  return (
    <div className='overflow-x-auto'>
      <Table className='w-full'>
        <TableBody>
        {!items.length && (
          <tr>
            <td>
              No hay {label}...
            </td>
          </tr>
        )}
        {items && items.map((item, itemIndex) => {
            const draft = item.review === POST_REVIEW_STATUS.DRAFT;
            const amI = isCurrentUserAuthor(item);
            return <tr
              key={`Publication_${item.id}_${itemIndex}`}
              className={`${styles.tableRow} line-clamp-3 ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
              <td className={styles.title}>
                <a
                  href={`/posts/${item.id}`}
                  key={`User_posts_${itemIndex}`}
                  children={item.title}/>
              </td>
              <td className={`${styles.status} ${styles[item.review]}`}>
                {item.review}
                <br/>{draft && !isAdmin ?
                `(${amI ? "Editable" : "Lectura"})` : isAdmin && amI? "(Author)":""}
              </td>
            </tr>
          }
        )}
        </TableBody>
      </Table>
    </div>
  )
};

export default Publications;
