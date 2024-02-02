'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import { CourseTable, TableActions, CourseCard } from '@/app/ui/course';
import Pagination from '@/app/ui/commons/Pagination';

// Interfaces
import { CourseBase, Option, SortColumn } from '@/app/lib/interfaces';

// Constants
import { COLUMNS, SEARCH_KEY_PARAMS } from '@/app/lib/constants';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  defaultLabel: string;
  defaultSort: SortColumn<CourseBase>;
  data: CourseBase[];
  categoryOptions: Option[];
}

const MyCourse = ({
  totalItems,
  itemsPerPage,
  defaultLabel,
  defaultSort,
  data,
  categoryOptions,
}: Props) => {
  const [isGridView, setIsGridView] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSort = async (value: SortColumn<CourseBase>) => {
    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_KEY_PARAMS.ORDER_FIELD, value.key);
    params.set(SEARCH_KEY_PARAMS.DIRECTION, value.direction);
    params.delete(SEARCH_KEY_PARAMS.START_AFTER_VALUE);
    params.delete(SEARCH_KEY_PARAMS.END_BEFORE_VALUE);

    router.push(`${pathname}?${params}`);
  };

  const handleChangePage = ({
    firstItem,
    lastItem,
  }: {
    firstItem?: CourseBase;
    lastItem?: CourseBase;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (firstItem) {
      params.set(SEARCH_KEY_PARAMS.END_BEFORE_VALUE, firstItem.name);
      params.delete(SEARCH_KEY_PARAMS.START_AFTER_VALUE);
    }

    if (lastItem) {
      params.set(SEARCH_KEY_PARAMS.START_AFTER_VALUE, lastItem.name);
      params.delete(SEARCH_KEY_PARAMS.END_BEFORE_VALUE);
    }

    router.push(`${pathname}?${params}`);
  };

  const handleFilterByCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(SEARCH_KEY_PARAMS.FILTER_FIELD, 'categoryId');
      params.set(SEARCH_KEY_PARAMS.FILTER_VALUE, value);
    } else {
      params.delete(SEARCH_KEY_PARAMS.FILTER_FIELD);
      params.delete(SEARCH_KEY_PARAMS.FILTER_VALUE);
    }

    params.delete(SEARCH_KEY_PARAMS.START_AFTER_VALUE);
    params.delete(SEARCH_KEY_PARAMS.END_BEFORE_VALUE);

    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="pr-10 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-fill-dark-link">
          My Courses for
          <span className="font-bold text-fill-light-link pl-1">
            &quot;All Courses&quot;
          </span>
        </h5>
        <TableActions
          onToggleView={setIsGridView}
          isGridView={isGridView}
          defaultLabel={defaultLabel}
          categoryOptions={categoryOptions}
          onFilterByCategory={handleFilterByCategory}
        />
      </div>
      {isGridView ? (
        <div className="flex flex-wrap items-center gap-10">
          {data.map((item) => (
            <div className="w-[255px]" key={item.id}>
              <CourseCard
                id={item.id}
                description={item.description}
                course={{
                  name: item.name,
                  image: item.logo,
                }}
                instructor={{
                  name: item.instructorName,
                  image: item.instructorAvatar,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <CourseTable
          columns={COLUMNS}
          data={data}
          defaultSort={defaultSort}
          onSort={handleSort}
        />
      )}
      {!!data.length && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          firstItem={data[0]}
          lastItem={data[data.length - 1]}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default MyCourse;
