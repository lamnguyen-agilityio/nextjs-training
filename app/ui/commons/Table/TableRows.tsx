// Interfaces
import { Entity, ColumnProps } from '@/app/lib/interfaces';

type Props<T extends Entity> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

const TableRows = <T extends Entity>({ columns, data = [] }: Props<T>) => {
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
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td
                key={column.key}
                className="inline-block box-border px-3 py-5"
                style={{
                  width: `${column.width}%`,
                }}
              >
                {value}
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
