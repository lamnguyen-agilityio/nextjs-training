import { FieldValue } from '.';

export interface Category {
  id: string;
  name: string;
  value: string;
  fields: Record<string, FieldValue>;
}
