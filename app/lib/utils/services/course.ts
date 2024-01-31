'use server';

// Utils
import { revalidatePath } from 'next/cache';
import { EntitiesParams, deleteEntity, getEntities } from '.';

// Interfaces
import { Category, Course, Instructor } from '@/app/lib/interfaces';

interface CourseParam extends Omit<EntitiesParams, 'collectionName'> {
  orderField: keyof Course;
}

/**
 * Fetches course listing data including categories and instructors.
 * @returns A Promise containing an array of formatted course listings and the total count.
 */
export const getCourseListing = async ({
  orderField,
  direction,
  startAfterValue,
  endBeforeValue,
  filter,
}: CourseParam) => {
  const [courses, categories, instructors] = await Promise.all([
    getEntities<Course>({
      collectionName: 'courses',
      orderField,
      direction,
      startAfterValue,
      endBeforeValue,
      filter,
    }),
    getEntities<Category>({ collectionName: 'categories' }),
    getEntities<Instructor>({ collectionName: 'instructors' }),
  ]);

  const courseListing = courses.data.map((course) => {
    const { id, categoryId, instructorId, description, logo, name } = course;
    const category = categories.data.find(
      (category) => category.id === categoryId
    );
    const instructor = instructors.data.find(
      (instructor) => instructor.id === instructorId
    );

    return {
      id,
      description,
      logo,
      name,
      categoryName: category ? category.name : '',
      instructorName: instructor ? instructor.name : '',
      instructorAvatar: instructor ? instructor.avatar : '',
    };
  });

  return {
    data: courseListing,
    count: courses.count,
  };
};

export const deleteCourse = async (id: string) => {
  await deleteEntity('courses', id);

  revalidatePath('/courses');
};
