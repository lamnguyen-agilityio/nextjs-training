import {
  CourseLesson,
  Document,
  FieldValue,
  LessonResponse,
} from '@/app/lib/interfaces';

export class LessonConverter {
  static convertDocumentToLesson(document: Document): LessonResponse {
    const { name, fields } = document;
    const id = name.substring(name.lastIndexOf('/') + 1);
    const data = this.extractLessons(fields.data?.arrayValue) || [];
    const courseId = fields.courseId.stringValue || '';

    return {
      id,
      data,
      courseId,
    };
  }

  private static extractLessons(lessonsArrayValue?: {
    values: Array<{ mapValue: { fields: Record<string, FieldValue> } }>;
  }): CourseLesson[] {
    if (!lessonsArrayValue) return [];

    return lessonsArrayValue.values.map((value) => ({
      id: value.mapValue.fields.id.stringValue || '',
      list:
        value.mapValue.fields.list.arrayValue?.values.map((item) => {
          return {
            name: item.mapValue.fields.name.stringValue || '',
            time: item.mapValue.fields.time.integerValue || 0,
            totalVideo: item.mapValue.fields.totalVideo.integerValue || 0,
            isDone: item.mapValue.fields.isDone.booleanValue || false,
          };
        }) || [],
      title: value.mapValue.fields.title.stringValue || '',
      totalTime: 0,
    }));
  }
}
