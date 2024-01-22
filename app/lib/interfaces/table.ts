import { ReactElement } from 'react';

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  sortable?: boolean;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  width?: number;
}

export interface SortColumn<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}
