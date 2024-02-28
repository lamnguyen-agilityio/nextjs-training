'use client';

import Link from 'next/link';

// Components
import { Button, Dropdown } from '@/app/ui/commons';

// Icons
import { CardViewIcon, FilterIcon, ListViewIcon } from '@/app/ui/icons';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Enums
import { View } from '@/app/lib/enums';

// Constants
import { ROUTES } from '@/app/lib/constants';

interface Props {
  categoryOptions: Option[];
  defaultLabel: string;
  view: View;
  onFilterByCategory: (value: string) => void;
  onSetView: (newView: View) => void;
}

const TableActions = ({
  categoryOptions,
  defaultLabel,
  view,
  onFilterByCategory,
  onSetView,
}: Props) => {
  const isListingView = view === View.Listing;

  const handleSortByCategory = (value: string) => {
    onFilterByCategory(value);
  };

  const toggleView = (newView: View) => {
    onSetView(newView);
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
      <Button type="button" aria-label="filter" disabled>
        <FilterIcon />
      </Button>
      <Link href={ROUTES.COURSE_CREATE}>
        <Button type="button">+</Button>
      </Link>
      <div className="flex">
        <Button
          type="button"
          onClick={() => toggleView(View.Listing)}
          aria-label="listing"
          variant={isListingView ? 'secondary' : 'primary'}
          className={`${isListingView && 'pointer-events-none'}`}
        >
          <ListViewIcon />
        </Button>
        <Button
          type="button"
          onClick={() => toggleView(View.Grid)}
          aria-label="grid"
          variant={isListingView ? 'primary' : 'secondary'}
          className={`${!isListingView && 'pointer-events-none'}`}
        >
          <CardViewIcon />
        </Button>
      </div>
    </div>
  );
};

export default TableActions;
