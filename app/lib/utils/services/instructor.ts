// Utils
import { getEntities, getEntityById } from '.';

// Interfaces
import { Instructor } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getInstructorOptions = async () => {
  const instructors = await getEntities<Instructor>({
    collectionName: ENTITY.INSTRUCTORS,
  });

  const instructorOptions =
    instructors.data &&
    instructors.data.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));

  return instructorOptions;
};

export const getInstructorById = async (id: string) => {
  return await getEntityById<Instructor>(ENTITY.INSTRUCTORS, id);
};
