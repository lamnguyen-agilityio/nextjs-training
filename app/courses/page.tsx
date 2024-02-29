import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Utils
import {
  createQuery,
  getCategoryById,
  getCategoryOptions,
  getCountCourseListing,
  getCourseListing,
} from '@/app/lib/utils';

// Interfaces
import { Course, CourseBase, SearchParams } from '@/app/lib/interfaces';

// Constants
import {
  COLUMNS,
  COURSES_PER_PAGE,
  LIMIT,
  OFFSET_DEFAULT,
} from '@/app/lib/constants';

// Components
import { CardList, CourseTable } from '@/app/ui/course';
import { CardListSkeleton, TableCourseSkeleton } from '@/app/ui/skeletons';

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
  const key = orderField + direction + filterField + filterValue + offset;

  const data = await getCourseListing(query);
  const category = await getCategoryById(filterValue);
  const categoryOptions = await getCategoryOptions();

  const defaultLabelCategory = category
    ? category.name
    : categoryOptions.find((category) => !category.value)?.label || '';

  return (
    <MyCourse
      totalItems={count}
      itemsPerPage={COURSES_PER_PAGE}
      offset={offset}
      limit={LIMIT}
      defaultLabel={defaultLabelCategory}
      categoryOptions={categoryOptions}
      filterValue={filterValue}
      CourseTable={
        <Suspense
          key={key}
          fallback={
            <TableCourseSkeleton dataLength={data.length} columns={COLUMNS} />
          }
        >
          <CourseTable
            columns={COLUMNS}
            defaultSort={{ key: orderField as keyof CourseBase, direction }}
            data={data}
          />
        </Suspense>
      }
      CardList={
        <Suspense
          key={key}
          fallback={<CardListSkeleton dataLength={data.length} />}
        >
          <CardList data={data} />
        </Suspense>
      }
    />
  );
};

export default Courses;
