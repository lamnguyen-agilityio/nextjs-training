import { Category, Document } from '@/app/lib/interfaces';

export class CategoryConverter {
  static convertDocumentToCategory(document: Document): Category {
    const { name, fields } = document;
    const id = name.substring(name.lastIndexOf('/') + 1);
    const nameValue = fields.name?.stringValue || '';
    const value = fields.value?.stringValue || '';

    return {
      id,
      name: nameValue,
      value,
    };
  }
}
