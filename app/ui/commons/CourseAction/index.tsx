'use client';

// Mocks data
import { categoryOptions } from '@/mocks';

// Components
import Dropdown from '@/app/ui/commons/Dropdown';
import Button from '@/app/ui/commons/Button';

// Icons
import { CardViewIcon, FilterIcon, ListViewIcon } from '@/app/ui/icons';

interface Props {
  isGridView: boolean;
  onToggleView: (isGridView: boolean) => void;
}

const CourseAction = ({ isGridView = false, onToggleView }: Props) => {
  // TODO: Implement handle change function
  const handleSortByCategory = (value: string) => {
    console.log(value);
  };

  const toggleView = () => {
    onToggleView(!isGridView);
  };

  // TODO: Implement filter course
  const handleFilter = () => {
    console.log('Filter');
  };

  return (
    <div className="flex gap-3">
      {categoryOptions.length && (
        <Dropdown
          options={categoryOptions}
          label="sort by"
          onChange={handleSortByCategory}
        />
      )}
      <Button type="button" onClick={handleFilter}>
        <FilterIcon />
      </Button>
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

export default CourseAction;
