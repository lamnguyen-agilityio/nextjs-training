'use client';

import { useState } from 'react';

// Interfaces
import { ColumnProps, SortColumn } from '@/app/lib/interfaces';

// Icons
import { SortIcon } from '@/app/ui/icons';

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  defaultSort?: SortColumn<T>;
  onSort: (value: SortColumn<T>) => void;
};

const TableHeaders = <T,>({ columns, defaultSort, onSort }: Props<T>) => {
  const [sorting, setSorting] = useState<SortColumn<T> | null>(
    defaultSort || null
  );

  const handleSort = (key: keyof T) => {
    if (sorting && sorting.key === key) {
      const newDirection = sorting.direction === 'asc' ? 'desc' : 'asc';

      setSorting({ key, direction: newDirection });
      onSort({ key, direction: newDirection });
    } else {
      setSorting({ key, direction: 'asc' });
      onSort({ key, direction: 'asc' });
    }
  };

  return (
    <thead className="text-left text-base font-semibold text-active-text-dark">
      <tr>
        {columns.map((column, index) => (
          <th
            key={`headCell-${index}`}
            scope="col"
            className={`inline-block px-3 py-5 font-medium capitalize ${column.sortable && 'cursor-pointer'}`}
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
