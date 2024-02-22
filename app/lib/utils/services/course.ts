'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Utils
import {
  EntitiesParams,
  addEntity,
  deleteEntity,
  getData,
  getDataById,
  getEntities,
  getEntityById,
  getInstructorById,
  getLessonById,
  updateEntity,
} from '.';

// Interfaces
import {
  Course,
  CourseDetail,
  DocumentResponse,
  FirestoreQuery,
  Lesson,
  Document,
} from '@/app/lib/interfaces';

// Constants
import { ENTITY, ROUTES } from '@/app/lib/constants';

// Mocks data
import { courseDetail } from '@/mocks';
import { CategoryConverter, CourseConverter, InstructorConverter } from '..';

interface CourseParam extends Omit<EntitiesParams, 'collectionName'> {
  orderField: keyof Course;
}

/**
 * Fetches course listing data including categories and instructors.
 * @returns A Promise containing an array of formatted course listings and the total count.
 */
export const getCountCourseListing = async ({
  orderField,
  direction,
  startAfterValue,
  endBeforeValue,
  filter,
}: CourseParam) => {
  const courses = await getEntities<Course>({
    collectionName: ENTITY.COURSES,
    orderField,
    direction,
    startAfterValue,
    endBeforeValue,
    filter,
  });

  return courses.count;
};

export const getCourseListing = async (query: FirestoreQuery) => {
  const [courses, categories, instructors] = await Promise.all([
    getCourses(query),
    getData(ENTITY.CATEGORIES),
    getData(ENTITY.INSTRUCTORS),
  ]);
  const convertedCategories = categories.documents.map((doc) =>
    CategoryConverter.convertDocumentToCategory(doc)
  );
  const convertedInstructors = instructors.documents.map((doc) =>
    InstructorConverter.convertDocumentToInstructor(doc)
  );

  const courseListing = courses.map((course) => {
    const { categoryId, instructorId, name, logo, id } = course;
    const category = convertedCategories.find(
      (category) => category.id === categoryId
    );
    const instructor = convertedInstructors.find(
      (instructor) => instructor.id === instructorId
    );

    return {
      ...course,
      categoryName: category?.name || '',
      instructor: {
        text: instructor?.name || '',
        src: instructor?.avatar || '',
      },
      name: {
        text: name,
        src: logo,
        href: `courses/${id}`,
      },
      action: {
        id,
      },
    };
  });

  return courseListing;
};

export const getCourseDetailById = async (id: string) => {
  const course = getEntityById<CourseDetail>(ENTITY.COURSES, id);

  return course;
};

export const deleteCourse = async (id: string) => {
  const response = await deleteEntity(ENTITY.COURSES, id);

  response && revalidatePath(ROUTES.COURSE_LIST);
};

export const getCourseById = async (id: string) => {
  const course = await getDataById(ENTITY.COURSES, id);
  const convertedCourse = course && CourseConverter.convertCourseDetail(course);

  return convertedCourse;
};

export const addCourse = async (data: Course) => {
  const mockCourseDetail = courseDetail;
  const createdAt = new Date();

  await addEntity(ENTITY.COURSES, { ...data, ...mockCourseDetail, createdAt });

  revalidatePath(ROUTES.COURSE_LIST);
  redirect(ROUTES.COURSE_LIST);
};

export const editCourseById = async (id: string, data: Course) => {
  await updateEntity(ENTITY.COURSES, id, data);

  revalidatePath(ROUTES.COURSE_LIST);
  revalidatePath(`${ROUTES.COURSE_LIST}/${id}`);
  revalidatePath(`${ROUTES.COURSE_LIST}/${id}/edit`);
  redirect(ROUTES.COURSE_LIST);
};

export const getLessonAndInstructorDetails = async (
  lessonId: string,
  instructorId: string
) => {
  const [lessons, instructor] = await Promise.all([
    getLessonById(lessonId),
    getInstructorById(instructorId),
  ]);

  const convertedLesson = lessons?.map((lesson) => {
    const { id, title, list } = lesson;
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

  return { lessons: convertedLesson, instructor };
};

export const getCourses = async (firestoreQuery: FirestoreQuery) => {
  try {
    const response = await fetch(`${process.env.API_URL}:runQuery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firestoreQuery),
      next: { revalidate: 3600 },
    });
    const data: DocumentResponse[] = await response.json();
    const convertedCourses =
      data[0]?.document || data[0]?.skippedResults
        ? (data[0]?.skippedResults ? data.slice(1) : data).map((course) => {
            return CourseConverter.convertCourseListing(course.document);
          })
        : [];

    return convertedCourses;
  } catch (error) {
    return [];
  }
};
