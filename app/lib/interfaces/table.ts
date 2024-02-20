import { ReactElement } from 'react';

// Enums
import { Cells } from '@/app/lib/enums';

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  sortable?: boolean;
  type: Cells;
  width?: number;
}

export interface SortColumn<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}
