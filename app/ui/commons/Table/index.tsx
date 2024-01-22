'use client';

import { ColumnProps, SortColumn } from '@/app/lib/interfaces/table';
import TableHeaders from './TableHeaders';
import TableRows from './TableRows';

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data: T[];
  defaultSort?: SortColumn<T>;
  onSort: (value: SortColumn<T>) => void;
};

const Table = <T,>({ data, columns, defaultSort, onSort }: Props<T>) => (
  <table className="w-full">
    <TableHeaders columns={columns} defaultSort={defaultSort} onSort={onSort} />
    <TableRows columns={columns} data={data} />
  </table>
);

export default Table;
