// Components
import TableCell from './TableCell';

// Interfaces
import { Entity, ColumnProps } from '@/app/lib/interfaces';

// Enums
import { TableCells } from '@/app/lib/enums';

type Props<T> = {
  columns: Array<ColumnProps>;
  data?: T[];
};

const TableRows = async <T extends Entity>({
  columns,
  data = [],
}: Props<T>) => {
  const rows = !data.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center py-3">
        No records
      </td>
    </tr>
  ) : (
    data.map((row) => {
      return (
        <tr
          key={row.id}
          className="w-full border-b-4 border-fill-background py-3 text-sm text-fill-text-dark font-medium"
        >
          {columns.map((column) => {
            return (
              <td
                key={column.key}
                className="box-border px-3 py-5"
                style={{
                  width: `${column.width}%`,
                }}
              >
                <TableCell
                  type={column.type as TableCells.String}
                  value={row[column.key as keyof typeof row] as string}
                />
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return <tbody className="bg-background">{rows}</tbody>;
};

export default TableRows;
