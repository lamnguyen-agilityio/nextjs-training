import { notFound } from 'next/navigation';

// Component
import { CourseForm } from '@/app/ui/course';

// Utils
import {
  getCategoryOptions,
  getCourseById,
  getInstructorOptions,
} from '@/app/lib/utils';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const id = params.id;

  const course = await getCourseById(id);
  const categoryOptions = await getCategoryOptions();
  const instructorOptions = await getInstructorOptions();

  if (!course) {
    return notFound();
  }

  return (
    <CourseForm
      id={id}
      categories={categoryOptions}
      instructors={instructorOptions}
      course={course}
    />
  );
};

export default Page;
