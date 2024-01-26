'use client';

import { useState } from 'react';

// Components
import CourseAction from '@/app/ui/commons/CourseAction';
import CourseTable from '@/app/ui/commons/CourseTable';
import Pagination from '@/app/ui/commons/Pagination';
import CourseCard from '@/app/ui/commons/CourseCard';

// Interfaces
import { CourseBase, SortColumn } from '@/app/lib/interfaces';

// Mocks data
import { columns } from '@/mocks';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  data: CourseBase[];
}

const MyCourse = ({ totalItems, itemsPerPage, data }: Props) => {
  const [isGridView, setIsGridView] = useState(false);

  // TODO: Implement sort table
  const handleSort = (value: SortColumn<CourseBase>) => {
    console.log(value);
  };

  // TODO: Implement change page of table
  const handleChangePage = (page: number) => {
    console.log(page);
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
        <CourseTable columns={columns} data={data} onSort={handleSort} />
      )}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default MyCourse;
