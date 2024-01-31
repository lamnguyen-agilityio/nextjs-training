// Utils
import { getEntityById } from '.';

// Interfaces
import { Instructor } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getInstructorById = async (id: string) => {
  return await getEntityById<Instructor>(ENTITY.INSTRUCTORS, id);
};
