import clsx from 'clsx';
import { FC } from 'react';

// Components
import Button from '@/app/ui/commons/Button';

interface Props {
  currentPage: number;
  totalPages: number;
  disabled: boolean;
  maxPageNumbersToShow: number;
  onPageChange: (page: number) => void;
}

const PageNumbers: FC<Props> = ({
  currentPage,
  totalPages,
  maxPageNumbersToShow,
  disabled,
  onPageChange,
}) => {
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = startPage + maxPageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  const pageNumbersArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return pageNumbersArray.map((page) => (
    <li key={page}>
      <Button
        type="button"
        variant={page === currentPage ? 'success' : 'info'}
        buttonSize="small"
        onClick={() => onPageChange(page)}
        className={clsx({
          'pointer-events-none': disabled || page === currentPage,
        })}
      >
        {page}
      </Button>
    </li>
  ));
};

export default PageNumbers;
