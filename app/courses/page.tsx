import dynamic from 'next/dynamic';

// Utils
import {
  getCategoryById,
  getCategoryOptions,
  getCourseListing,
} from '@/app/lib/utils';

// Interfaces
import { Course, CourseBase, SearchParams } from '@/app/lib/interfaces';

// Constants
import { COURSES_PER_PAGE } from '@/app/lib/constants';

// Components
const MyCourse = dynamic(() => import('@/app/ui/commons/MyCourses'));

const Courses = async ({
  searchParams = {
    orderField: 'name',
    direction: 'desc',
    startAfterValue: '',
    endBeforeValue: '',
    filterField: '',
    filterValue: '',
  },
}: {
  searchParams?: SearchParams<Course>;
}) => {
  const {
    orderField = 'name',
    direction = 'desc',
    startAfterValue,
    endBeforeValue,
    filterField = '',
    filterValue = '',
  } = searchParams;

  const { data, count } = await getCourseListing({
    orderField,
    direction,
    startAfterValue,
    endBeforeValue,
    filter: { value: filterValue, field: filterField },
  });

  const category = await getCategoryById(filterValue);
  const categoryOptions = await getCategoryOptions();

  const defaultLabelCategory = category
    ? category.name
    : categoryOptions.find((category) => !category.value)?.label;

  return (
    <MyCourse
      data={data}
      totalItems={count}
      defaultSort={{ key: orderField as keyof CourseBase, direction }}
      itemsPerPage={COURSES_PER_PAGE}
      categoryOptions={categoryOptions}
      defaultLabel={defaultLabelCategory || ''}
    />
  );
};

export default Courses;
