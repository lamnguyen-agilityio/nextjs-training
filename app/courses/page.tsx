import dynamic from 'next/dynamic';

// Components
const MyCourse = dynamic(() => import('@/app/ui/commons/MyCourses'));

// Utils
import { getCourseListing } from '@/app/lib/utils';
import { COURSES_PER_PAGE } from '@/app/lib/constants';

const Courses = async () => {
  const { data, count } = await getCourseListing({ orderField: 'name' });

  return (
    <MyCourse data={data} totalItems={count} itemsPerPage={COURSES_PER_PAGE} />
  );
};

export default Courses;
