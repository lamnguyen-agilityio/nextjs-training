// Components
import TableRowSkeleton from './TableRow';

// Icons
import { SortIcon } from '@/app/ui/icons';

// Interfaces
import { Entity, ColumnProps } from '@/app/lib/interfaces';

type Props<T extends Entity> = {
  dataLength: number;
  columns: Array<ColumnProps<T>>;
};

const TableCourse = async <T extends Entity>({
  dataLength,
  columns,
}: Props<T>) => {
  const array = Array.from({ length: dataLength }, (_, index) => index + 1);
  const rows = array.map((item) => <TableRowSkeleton key={item} />);

  return (
    <table className="w-full table-fixed">
      <thead className="text-left text-base font-semibold text-active-text-dark">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-3 py-5 font-medium capitalize"
              style={{
                width: `${column.width}%`,
              }}
            >
              <div className="flex gap-5 items-center">
                {column.title}
                {column.sortable && <SortIcon sortType="desc" active={false} />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-background">{rows}</tbody>
    </table>
  );
};

export default TableCourse;
