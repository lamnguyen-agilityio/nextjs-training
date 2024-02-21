import dynamic from 'next/dynamic';

// Utils
import {
  createQuery,
  getCategoryById,
  getCategoryOptions,
  getCourseListing,
  getCountCourseListing,
} from '@/app/lib/utils';

// Interfaces
import { Course, CourseBase, SearchParams } from '@/app/lib/interfaces';

// Constants
import { COURSES_PER_PAGE, LIMIT, OFFSET_DEFAULT } from '@/app/lib/constants';

// Components
const MyCourse = dynamic(() => import('@/app/ui/course/MyCourse'));

const Courses = async ({
  searchParams = {
    orderField: 'name',
    direction: 'desc',
    filterField: '',
    filterValue: '',
    offset: OFFSET_DEFAULT,
  },
}: {
  searchParams?: SearchParams<Course>;
}) => {
  const {
    orderField = 'name',
    direction = 'desc',
    filterField = '',
    filterValue = '',
    offset = OFFSET_DEFAULT,
  } = searchParams;

  const count = await getCountCourseListing({
    orderField,
    direction,
    filter: { value: filterValue, field: filterField },
  });
  const query = createQuery(
    filterField,
    filterValue,
    orderField,
    direction,
    offset,
    LIMIT
  );

  const data = await getCourseListing(query);
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
      offset={offset}
      filterValue={filterValue}
      limit={LIMIT}
    />
  );
};

export default Courses;
