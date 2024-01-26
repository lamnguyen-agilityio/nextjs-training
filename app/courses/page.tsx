import dynamic from 'next/dynamic';

// Mocks data
import { coursesPerPage, records, totalCourses } from '@/mocks';

// Components
const MyCourse = dynamic(() => import('@/app/ui/commons/MyCourses'));

const Courses = () => {
  return (
    <MyCourse
      data={records}
      totalItems={totalCourses}
      itemsPerPage={coursesPerPage}
    />
  );
};

export default Courses;
