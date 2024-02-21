import {
  CourseDetail,
  CourseOverview,
  FieldValue,
  Document,
} from '@/app/lib/interfaces';

export class CourseConverter {
  static convertCourseDetail(document: Document): CourseDetail {
    const { name, fields } = document;
    const id = name.substring(name.lastIndexOf('/') + 1);
    const createdAt = fields.createdAt?.timestampValue || new Date();
    const description = fields.description?.stringValue || '';
    const nameValue = fields.name?.stringValue || '';
    const src = fields.src?.stringValue || '';
    const overview = this.extractOverview(fields.overview?.arrayValue);
    const announcement = fields.announcement?.stringValue || '';
    const logo = fields.logo?.stringValue || '';
    const lessonId = fields.lessonId?.stringValue || '';
    const faq = this.extractFAQ(fields.faq?.arrayValue);
    const instructorId = fields.instructorId?.stringValue || '';

    return {
      id,
      description,
      instructorId,
      name: nameValue,
      createdAt,
      src,
      overview,
      announcement,
      logo,
      lessonId,
      faq,
    };
  }

  static convertCourseListing(document: Document) {
    const { name, fields } = document;
    const id = name.substring(name.lastIndexOf('/') + 1);
    const description = fields.description?.stringValue || '';
    const nameValue = fields.name?.stringValue || '';
    const categoryId = fields.categoryId?.stringValue || '';
    const logo = fields.logo?.stringValue || '';
    const instructorId = fields.instructorId?.stringValue || '';

    return {
      id,
      description,
      categoryId,
      instructorId,
      logo,
      name: nameValue,
    };
  }

  private static extractOverview(overviewArrayValue?: {
    values: Array<{ mapValue: { fields: Record<string, FieldValue> } }>;
  }): CourseOverview[] {
    if (!overviewArrayValue) return [];

    return overviewArrayValue.values.map((value) => ({
      type: (value.mapValue.fields.type.stringValue as 'single') || '',
      title: value.mapValue.fields.title.stringValue || '',
      content: value.mapValue.fields.content.stringValue || '',
    }));
  }

  private static extractFAQ(faqArrayValue?: {
    values: Array<{ mapValue: { fields: Record<string, FieldValue> } }>;
  }): { title: string; content: string }[] {
    if (!faqArrayValue) return [];

    return faqArrayValue.values.map((value) => ({
      title: value.mapValue.fields.title.stringValue || '',
      content: value.mapValue.fields.content.stringValue || '',
    }));
  }
}
