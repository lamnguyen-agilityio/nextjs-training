'use client';

import { useState, ReactNode } from 'react';

// Components
import { Pagination, CourseHeader } from '@/app/ui/course';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Enums
import { View } from '@/app/lib/enums';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  defaultLabel: string;
  offset: number;
  filterValue: string;
  limit: number;
  categoryOptions: Option[];
  CourseTable: ReactNode;
  CardList: ReactNode;
}

const MyCourse = ({
  totalItems,
  itemsPerPage,
  defaultLabel,
  offset,
  filterValue,
  limit,
  categoryOptions,
  CourseTable,
  CardList,
}: Props) => {
  const [currenView, setCurrenView] = useState(View.Listing);

  return (
    <div className="pr-10 flex flex-col gap-5 pb-5">
      <CourseHeader
        defaultLabel={defaultLabel}
        categoryOptions={categoryOptions}
        view={currenView}
        onSetView={(newView: View) => setCurrenView(newView)}
      />
      {currenView === View.Listing ? CourseTable : CardList}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        offset={offset}
        limit={limit}
        filterValue={filterValue}
      />
    </div>
  );
};

export default MyCourse;
