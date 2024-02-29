// Utils
import { convertModel, getData, getDataById } from '@/app/lib/utils';

// Interfaces
import { Instructor } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getInstructorOptions = async () => {
  const instructors = await getData(ENTITY.INSTRUCTORS);
  const convertedInstructors = instructors.documents.map((doc) =>
    convertModel<Instructor>(doc as Instructor)
  );
  const instructorOptions = convertedInstructors.map((item) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));

  return instructorOptions;
};

export const getInstructorById = async (id: string) => {
  const instructor = await getDataById<Instructor>(ENTITY.INSTRUCTORS, id);
  const convertedInstructor = convertModel<Instructor>(instructor);

  return convertedInstructor;
};
