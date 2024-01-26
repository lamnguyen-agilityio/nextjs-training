export interface Course {
  id: string;
  name: string;
  logo: string;
  categoryId: string;
  instructorId: string;
  description: string;
}

export interface CourseBase
  extends Omit<Course, 'categoryId' | 'instructorId'> {
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
