import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Components
const CourseDetail = dynamic(() => import('@/app/ui/course/Detail'));

// Utils
import {
  getCourseDetailById,
  getLessonAndInstructorDetails,
} from '@/app/lib/utils';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const course = await getCourseDetailById(id);

  if (!course) {
    return notFound();
  }

  const { instructor, lessons } = await getLessonAndInstructorDetails(
    course.lessonId,
    course.instructorId
  );

  return (
    <CourseDetail course={course} instructor={instructor} lessons={lessons} />
  );
};

export default Page;
