import { Document, Instructor } from '@/app/lib/interfaces';

export class InstructorConverter {
  static convertDocumentToInstructor(document: Document): Instructor {
    const { name, fields } = document;
    const id = name.substring(name.lastIndexOf('/') + 1);
    const nameValue = fields.name?.stringValue || '';
    const avatar = fields.avatar?.stringValue || '';
    const role = fields.role?.stringValue || '';

    return {
      id,
      avatar,
      name: nameValue,
      role,
    };
  }
}
