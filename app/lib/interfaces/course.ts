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
