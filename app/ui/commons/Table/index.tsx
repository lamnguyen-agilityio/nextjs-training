// Components
import TableHeaders from './TableHeaders';
import TableRows from './TableRows';

// Interfaces
import { Entity, SortColumn, ColumnProps } from '@/app/lib/interfaces';

type Props<T extends Entity> = {
  data: T[];
  columns: Array<ColumnProps<T>>;
  defaultSort?: SortColumn<T>;
};

const Table = async <T extends Entity>({
  data,
  columns,
  defaultSort,
}: Props<T>) => (
  <table className="w-full table-fixed">
    <TableHeaders columns={columns} defaultSort={defaultSort} />
    <TableRows columns={columns} data={data} />
  </table>
);

export default Table;
