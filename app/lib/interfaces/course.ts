import { Timestamp } from 'firebase/firestore';
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

export interface CourseDetail extends Omit<Course, 'categoryId'> {
  announcement: string;
  createdAt: Timestamp;
  lessonId: string;
  faq: Section[];
  instructorName: string;
  instructorAvatar: string;
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
