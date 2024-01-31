export interface Response<T> {
  data: T[];
  count: number;
}
export interface SearchParams<T> {
  orderField?: keyof T;
  direction?: 'asc' | 'desc';
  startAfterValue?: string;
  endBeforeValue?: string;
  filterField?: string;
  filterValue?: string;
}
