// Utils
import { getDataById, LessonConverter } from '@/app/lib/utils';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getLessonById = async (id: string) => {
  const lesson = await getDataById(ENTITY.LESSONS, id);
  const convertedLesson =
    lesson && LessonConverter.convertDocumentToLesson(lesson);

  return convertedLesson;
};
