// Utils
import { convertModel, getDataById } from '@/app/lib/utils';

// Interfaces
import { LessonResponse } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getLessonById = async (id: string) => {
  const lesson = await getDataById<LessonResponse>(ENTITY.LESSONS, id);
  const convertedLesson = lesson && convertModel<LessonResponse>(lesson);

  return convertedLesson;
};
