import { FC } from 'react';

// Interfaces
import { ColumnProps, CourseBase, SortColumn } from '@/app/lib/interfaces';

// Components
import Table from '@/app/ui/commons/Table';

interface Props {
  columns: Array<ColumnProps<CourseBase>>;
  data: CourseBase[];
  defaultSort?: SortColumn<CourseBase>;
  onSort: (value: SortColumn<CourseBase>) => void;
}

const CourseTable: FC<Props> = ({ columns, data, defaultSort, onSort }) => (
  <Table
    columns={columns}
    data={data}
    defaultSort={defaultSort}
    onSort={onSort}
  />
);

export default CourseTable;
