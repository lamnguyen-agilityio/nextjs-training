import { FieldValue } from '.';

export interface Instructor {
  id: string;
  avatar: string;
  name: string;
  role: string;
  fields: Record<string, FieldValue>;
}
