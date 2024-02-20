'use client';

// Components
import TableHeaders from './TableHeaders';
import TableRows from './TableRows';

// Interfaces
import { Entity, SortColumn, ColumnProps } from '@/app/lib/interfaces';

type Props<T extends Entity> = {
  columns: Array<ColumnProps<T>>;
  data: T[];
  defaultSort?: SortColumn<T>;
  onSort: (value: SortColumn<T>) => void;
};

const Table = <T extends Entity>({
  data,
  columns,
  defaultSort,
  onSort,
}: Props<T>) => (
  <table className={`w-full ${data.length && 'table-fixed'}`}>
    <TableHeaders columns={columns} defaultSort={defaultSort} onSort={onSort} />
    <TableRows columns={columns} data={data} />
  </table>
);

export default Table;
