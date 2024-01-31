'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import CourseAction from '@/app/ui/commons/CourseAction';
import CourseTable from '@/app/ui/commons/CourseTable';
import Pagination from '@/app/ui/commons/Pagination';
import CourseCard from '@/app/ui/commons/CourseCard';

// Interfaces
import { CourseBase, SortColumn } from '@/app/lib/interfaces';

// Constants
import { COLUMNS, SEARCH_KEY_PARAMS } from '@/app/lib/constants';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  defaultSort: SortColumn<CourseBase>;
  data: CourseBase[];
}

const MyCourse = ({ totalItems, itemsPerPage, defaultSort, data }: Props) => {
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

  return (
    <div className="pr-10 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-fill-dark-link">
          My Courses for
          <span className="font-bold text-fill-light-link pl-1">
            &quot;All Courses&quot;
          </span>
        </h5>
        <CourseAction onToggleView={setIsGridView} isGridView={isGridView} />
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
