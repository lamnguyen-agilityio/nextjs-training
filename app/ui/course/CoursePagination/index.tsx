'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import { Pagination } from '@/app/ui/commons';

// Constants
import { SEARCH_KEY_PARAMS } from '@/app/lib/constants';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  offset: number;
  limit: number;
  filterValue: string;
}

const CoursePagination = ({
  totalItems,
  itemsPerPage,
  offset,
  limit,
  filterValue,
}: Props) => {
  const [currentPage, setCurrenPage] = useState(offset / limit + 1);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    setCurrenPage(newPage);
    params.set(SEARCH_KEY_PARAMS.OFFSET, ((newPage - 1) * limit).toString());
    router.push(`${pathname}?${params}`);
  };

  useEffect(() => {
    if (filterValue) {
      setCurrenPage(1);
    }
  }, [filterValue]);

  return (
    <Pagination
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={handleChangePage}
    />
  );
};

export default CoursePagination;
