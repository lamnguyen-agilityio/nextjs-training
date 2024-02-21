import { Link, Section } from '.';

export interface Course {
  id: string;
  categoryId: string;
  description: string;
  instructorId: string;
  name: string;
  instructor: Link;
  logo: string;
}

export interface CourseDetail
  extends Omit<Course, 'categoryId' | 'instructor'> {
  announcement: string;
  createdAt: Date;
  lessonId: string;
  faq: Section[];
  src: string;
  overview: CourseOverview[];
}

export interface CourseBase
  extends Omit<Course, 'categoryId' | 'instructorId' | 'name' | 'logo'> {
  action: { id: string };
  name: Link;
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

export interface LessonResponse {
  id: string;
  data?: CourseLesson[];
  courseId?: string;
}
