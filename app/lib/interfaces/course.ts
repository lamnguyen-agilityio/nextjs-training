import { Section } from '.';

export interface Course {
  id: string;
  categoryId: string;
  description: string;
  instructorId: string;
  logo: string;
  name: string;
}

export interface CourseDetail
  extends Omit<Course, 'categoryId' | 'instructorId'> {
  announcement: string;
  createdAt: Date;
  faq: Section[];
  instructorName: string;
  instructorAvatar: string;
  overview: CourseOverview[];
}

export interface CourseBase
  extends Omit<
    Course,
    | 'announcement'
    | 'categoryId'
    | 'createdAt'
    | 'faq'
    | 'instructorId'
    | 'overview'
  > {
  categoryName: string;
  instructorName: string;
  instructorAvatar: string;
}

export interface CourseOverview {
  type: 'single' | 'multiple';
  title: string;
  content: string | string[];
}

export interface Lesson {
  name: string;
  time: number;
  totalVideo: number;
  isDone: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  totalTime: number;
  list: Lesson[];
}
