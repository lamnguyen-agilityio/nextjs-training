'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Utils
import {
  EntitiesParams,
  addEntity,
  deleteEntity,
  getEntities,
  getEntityById,
  updateEntity,
} from '.';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Interfaces
import {
  Category,
  Course,
  CourseDetail,
  CourseLesson,
  Instructor,
  Lesson,
  LessonResponse,
} from '@/app/lib/interfaces';

// Database
import { database } from '@/app/lib/firebase/config';

// Constants
import { ENTITY, ROUTE } from '@/app/lib/constants';

// Mocks data
import { courseDetail } from '@/mocks';

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
      collectionName: ENTITY.COURSES,
      orderField,
      direction,
      startAfterValue,
      endBeforeValue,
      filter,
    }),
    getEntities<Category>({ collectionName: ENTITY.CATEGORIES }),
    getEntities<Instructor>({ collectionName: ENTITY.INSTRUCTORS }),
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

export const getLessonsByCourseId = async (
  id: string
): Promise<CourseLesson[]> => {
  const baseQuery = query(
    collection(database, ENTITY.LESSONS),
    where('courseId', '==', id)
  );

  const querySnapshot = await getDocs(baseQuery);

  const entities: LessonResponse[] = [];

  querySnapshot.forEach((doc) => {
    entities.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  if (!entities.length) {
    return [];
  }

  // Entities is only 1 items
  // Get lessons from first value
  const lessons =
    entities[0].data &&
    entities[0].data.map((item: CourseLesson) => {
      const { id, title, list } = item;
      let totalTime = 0;

      return {
        id: id,
        title: title,
        list: list.map((itemList: Lesson) => {
          totalTime += itemList.time;
          return itemList;
        }),
        totalTime,
      };
    });

  return lessons as CourseLesson[];
};

export const getCourseDetailById = async (id: string) => {
  // TODO: Update the courses, instructors entity by using constant
  const [course, lessons] = await Promise.all([
    getEntityById<CourseDetail>(ENTITY.COURSES, id),
    getLessonsByCourseId(id),
  ]);

  return { course, lessons };
};

export const deleteCourse = async (id: string) => {
  await deleteEntity(ENTITY.COURSES, id);

  revalidatePath(ROUTE.COURSE_LIST);
};

export const getCourseById = async (id: string) => {
  return await getEntityById<Course>(ENTITY.COURSES, id);
};

export const addCourse = async (data: Course) => {
  const mockCourseDetail = courseDetail;
  const createdAt = new Date();

  await addEntity(ENTITY.COURSES, { ...data, ...mockCourseDetail, createdAt });

  revalidatePath(ROUTE.COURSE_LIST);
  redirect(ROUTE.COURSE_LIST);
};

export const editCourseById = async (id: string, data: Course) => {
  await updateEntity(ENTITY.COURSES, id, data);

  revalidatePath(ROUTE.COURSE_LIST);
  redirect(ROUTE.COURSE_LIST);
};
