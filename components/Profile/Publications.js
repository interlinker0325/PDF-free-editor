import {isOdd, POST_REVIEW_STATUS} from 'utils';

const Publications = ({items, label, user, isAdmin}) => {
  const isCurrentUserAuthor = item => user?.id === item?.author?.id
  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <tbody>
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
            console.log({user, item});
            return <tr
              key={`Publication_${item.id}_${itemIndex}`}
              className={`${styles.tableRow} ${!isOdd(itemIndex) ? 'bg-secondary' : ''}`}>
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
        </tbody>
      </table>
    </div>
  )
};

const styles = {
  tableRow: 'flex flex-row justify-between w-full py-2 px-4 text-2xl font-normal',
  title: 'rounded-l-none rounded-r-none w-full hover:text-primary hover:underline hover:underline-offset-1',
  status: 'rounded-l-none rounded-r-none font-thin text-right',
  Aprobado: 'text-success',
  Denegado: 'text-error',
  Pendiente: 'text-black'
}

export default Publications;
