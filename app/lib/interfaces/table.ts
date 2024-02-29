import { ReactElement } from 'react';

// Enums
import { TableCells } from '@/app/lib/enums';

export interface ColumnProps {
  key: string;
  title: string | ReactElement;
  sortable?: boolean;
  type: TableCells;
  width?: number;
}

export interface SortColumn<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}
