import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Components
const CourseDetailComponent = dynamic(
  () => import('@/app/ui/commons/Course/Detail')
);

// Utils
import { getInstructorById, getCourseDetailById } from '@/app/lib/utils';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { course, lessons } = await getCourseDetailById(id);
  const instructor = course && (await getInstructorById(course.instructorId));

  if (!course) {
    return notFound();
  }

  return (
    <CourseDetailComponent
      course={course}
      instructor={instructor}
      lessons={lessons}
    />
  );
};

export default Page;
