// Components
import { CourseForm } from '@/app/ui/course';

// Utils
import { getCategoryOptions, getInstructorOptions } from '@/app/lib/utils';

const Page = async () => {
  const categoryOptions = await getCategoryOptions();
  const instructorOptions = await getInstructorOptions();

  return (
    <div className="pr-10">
      <CourseForm
        categories={categoryOptions}
        instructors={instructorOptions}
      />
    </div>
  );
};

export default Page;
