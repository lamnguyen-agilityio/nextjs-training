// Interfaces
import { ColumnProps, Category } from '@/app/lib/interfaces';

// Enums
import { TableCells } from '@/app/lib/enums';

export const COURSES_PER_PAGE = 10;
export const COLUMNS: ColumnProps[] = [
  {
    key: 'name',
    title: 'course name',
    width: 20,
    sortable: true,
    type: TableCells.Link,
  },
  {
    key: 'categoryName',
    title: 'category',
    width: 20,
    type: TableCells.String,
  },
  {
    key: 'instructor',
    title: 'instructor',
    width: 20,
    type: TableCells.Link,
  },
  {
    key: 'description',
    title: 'Description',
    width: 30,
    sortable: true,
    type: TableCells.String,
  },
  {
    key: 'action',
    title: 'Action',
    width: 10,
    type: TableCells.Action,
  },
];
export const SEARCH_KEY_PARAMS = {
  ORDER_FIELD: 'orderField',
  DIRECTION: 'direction',
  FILTER_FIELD: 'filterField',
  FILTER_VALUE: 'filterValue',
  OFFSET: 'offset',
};

export const MAPPING_OPTION: Record<'value' | 'label', keyof Category> = {
  value: 'id',
  label: 'name',
};
