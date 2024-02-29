// Interfaces
import { ColumnProps, CourseBase, SortColumn } from '@/app/lib/interfaces';

// Components
import { Table } from '@/app/ui/commons';

interface Props {
  columns: ColumnProps[];
  data: CourseBase[];
  defaultSort?: SortColumn<CourseBase>;
}

const CourseTable = async ({ columns, defaultSort, data }: Props) => (
  <Table columns={columns} defaultSort={defaultSort} data={data} />
);

export default CourseTable;
