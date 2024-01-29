import { CourseForm } from '@/app/ui/course';

// Mocks data
import { categories, courseData, instructors } from '@/mocks';

const Page = () => {
  return (
    <CourseForm
      categories={categories}
      instructors={instructors}
      course={courseData}
    />
  );
};

export default Page;
