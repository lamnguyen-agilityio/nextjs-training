import { useState } from 'react';
import clsx from 'clsx';

// Components
import Button from '@/app/ui/commons/Button';
import PageNumbers from './PageNumbers';

// Constants
import { MAX_PAGE_NUMBERS } from '@/app/lib/constants';

interface PaginationProps<T> {
  totalItems: number;
  itemsPerPage: number;
  firstItem: T;
  lastItem: T;
  onPageChange: ({
    firstItem,
    lastItem,
  }: {
    firstItem?: T;
    lastItem?: T;
  }) => void;
  disabled?: boolean;
}

const Pagination = <T,>({
  totalItems,
  itemsPerPage,
  firstItem,
  lastItem,
  onPageChange,
  disabled = false,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startRecords = (currentPage - 1) * itemsPerPage + 1;
  const endRecords =
    currentPage * itemsPerPage + 1 > totalItems
      ? totalItems
      : currentPage * itemsPerPage + 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-fill-dark-link">
        {startRecords} to {endRecords} of {totalItems} records
      </p>
      <ul
        className={clsx('flex justify-center items-center gap-2', {
          'cursor-not-allowed opacity-70': disabled,
        })}
      >
        <li className={clsx({ 'pointer-events-none': disabled })}>
          <Button
            type="button"
            variant="info"
            buttonSize="small"
            onClick={() => {
              handlePageChange(currentPage - 1);
              onPageChange({ firstItem });
            }}
            disabled={currentPage === 1 || disabled}
          >
            {'<'}
          </Button>
        </li>
        {/* The pagination not support page */}
        {/* <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          disabled={disabled}
          maxPageNumbersToShow={MAX_PAGE_NUMBERS}
          onPageChange={handlePageChange}
        />
        {totalItems / itemsPerPage > MAX_PAGE_NUMBERS && (
          <li className="text-fill-dark-link">...</li>
        )} */}
        <li className={clsx({ 'pointer-events-none': disabled })}>
          <Button
            type="button"
            variant="info"
            buttonSize="small"
            onClick={() => {
              handlePageChange(currentPage + 1);
              onPageChange({ lastItem });
            }}
            disabled={currentPage === totalPages || disabled}
          >
            {'>'}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
