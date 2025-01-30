// React
import React from 'react'

import {isOdd, POST_REVIEW_STATUS} from 'utils';

// Styles
import styles from './styles'

// Shadcn IU - Table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Shadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Publications = ({items, label, user, itemsPerPage,isAdmin}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const isCurrentUserAuthor = (item) => user?.id === item?.author?.id;

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const options = {
    currentPage: currentPage,
    totalPages: totalPages,
    onPageChange: handlePageChange
  }

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
        {items && currentItems.map((item, itemIndex) => {
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
        {currentItems.length > 0 && <PaginationDemo {...options} />}
      </Table>
    </div>
  )
};

function PaginationDemo({ currentPage, totalPages, onPageChange }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Publications;
