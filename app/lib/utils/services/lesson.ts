// Utils
import { getEntityById } from '.';

// Interfaces
import { LessonResponse } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getLessonById = async (id: string) => {
  const response = await getEntityById<LessonResponse>(ENTITY.LESSONS, id);

  return response?.data;
};
