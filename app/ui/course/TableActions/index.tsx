'use client';

import Link from 'next/link';

// Components
import { Button, Dropdown } from '@/app/ui/commons';

// Icons
import { CardViewIcon, FilterIcon, ListViewIcon } from '@/app/ui/icons';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Constants
import { ROUTES } from '@/app/lib/constants';

interface Props {
  isGridView: boolean;
  categoryOptions: Option[];
  defaultLabel: string;
  onToggleView: (isGridView: boolean) => void;
  onFilterByCategory: (value: string) => void;
}

const TableActions = ({
  isGridView = false,
  categoryOptions,
  defaultLabel,
  onToggleView,
  onFilterByCategory,
}: Props) => {
  const handleSortByCategory = (value: string) => {
    onFilterByCategory(value);
  };

  const toggleView = () => {
    onToggleView(!isGridView);
  };

  return (
    <div className="flex gap-3">
      {categoryOptions.length && (
        <Dropdown
          options={categoryOptions}
          label="sort by"
          onChange={handleSortByCategory}
          defaultLabel={defaultLabel}
        />
      )}
      <Button type="button" disabled>
        <FilterIcon />
      </Button>
      <Link href={ROUTES.COURSE_CREATE}>
        <Button type="button">+</Button>
      </Link>
      <div className="flex">
        <Button
          type="button"
          onClick={toggleView}
          variant={isGridView ? 'primary' : 'secondary'}
          className={`${!isGridView && 'pointer-events-none'}`}
        >
          <ListViewIcon />
        </Button>
        <Button
          type="button"
          onClick={toggleView}
          variant={isGridView ? 'secondary' : 'primary'}
          className={`${isGridView && 'pointer-events-none'}`}
        >
          <CardViewIcon />
        </Button>
      </div>
    </div>
  );
};

export default TableActions;
