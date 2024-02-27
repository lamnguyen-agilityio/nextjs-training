'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import { TableActions } from '@/app/ui/course';

// Contexts
import { useBreadcrumb } from '@/app/lib/contexts/breadcrumb';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Enums
import { View } from '@/app/lib/enums';

// Constants
import { ROUTES, SEARCH_KEY_PARAMS } from '@/app/lib/constants';

interface Props {
  defaultLabel: string;
  view: View;
  categoryOptions: Option[];
  onSetView: (newView: View) => void;
}

const CourseHeader = ({
  defaultLabel,
  categoryOptions,
  view,
  onSetView,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    defaultLabel
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateBreadcrumb } = useBreadcrumb();

  const handleFilterByCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategory = categoryOptions.find(
      (category) => category.value === value
    )?.label;

    setSelectedCategory(currentCategory);

    if (value) {
      params.set(SEARCH_KEY_PARAMS.FILTER_FIELD, 'categoryId');
      params.set(SEARCH_KEY_PARAMS.FILTER_VALUE, value);
    } else {
      params.delete(SEARCH_KEY_PARAMS.FILTER_FIELD);
      params.delete(SEARCH_KEY_PARAMS.FILTER_VALUE);
    }

    params.delete(SEARCH_KEY_PARAMS.OFFSET);
    router.push(`${pathname}?${params}`);
  };

  useEffect(() => {
    updateBreadcrumb([{ title: 'My Course', href: ROUTES.COURSE_LIST }]);
  }, [updateBreadcrumb]);

  return (
    <div className="flex items-center justify-between">
      <h5 className="text-lg text-fill-dark-link">
        My Courses for
        <span className="font-bold text-fill-light-link capitalize pl-1">
          &quot;{selectedCategory}&quot;
        </span>
      </h5>
      <TableActions
        defaultLabel={defaultLabel}
        categoryOptions={categoryOptions}
        view={view}
        onFilterByCategory={handleFilterByCategory}
        onSetView={onSetView}
      />
    </div>
  );
};

export default CourseHeader;
