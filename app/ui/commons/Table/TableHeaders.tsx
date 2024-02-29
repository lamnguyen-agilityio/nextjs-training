'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Interfaces
import { ColumnProps, SortColumn } from '@/app/lib/interfaces';

// Icons
import { SortIcon } from '@/app/ui/icons';

// Constants
import { SEARCH_KEY_PARAMS } from '@/app/lib/constants';

type Props<T> = {
  columns: Array<ColumnProps>;
  defaultSort?: SortColumn<T>;
};

const TableHeaders = <T,>({ columns, defaultSort }: Props<T>) => {
  const [sorting, setSorting] = useState<SortColumn<T> | null>(
    defaultSort || null
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSort = (key: keyof T) => {
    const params = new URLSearchParams(searchParams);
    const newDirection =
      sorting && sorting.direction === 'asc' ? 'desc' : 'asc';

    setSorting({ key, direction: newDirection });
    params.set(SEARCH_KEY_PARAMS.ORDER_FIELD, key as string);
    params.set(SEARCH_KEY_PARAMS.DIRECTION, newDirection);

    router.push(`${pathname}?${params}`);
  };

  return (
    <thead className="text-left text-base font-semibold text-active-text-dark">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className={`px-3 py-5 font-medium capitalize ${column.sortable && 'cursor-pointer'}`}
            style={{
              width: `${column.width}%`,
            }}
            onClick={() => column.sortable && handleSort(column.key as keyof T)}
          >
            <div className="flex gap-5 items-center">
              {column.title}
              {column.sortable && (
                <SortIcon
                  sortType={sorting?.direction === 'asc' ? 'asc' : 'desc'}
                  active={sorting?.key === column.key}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
