// Components
import AvatarWithName from '@/app/ui/commons/AvatarWithName';

// Interfaces
import { ColumnProps, CourseBase, Category } from '@/app/lib/interfaces';

// Icons
import { CourseActions } from '@/app/ui/course';

export const COURSES_PER_PAGE = 10;
export const COLUMNS: ColumnProps<CourseBase>[] = [
  {
    key: 'name',
    title: 'course name',
    width: 20,
    sortable: true,
    render: (_, row) => (
      <AvatarWithName
        link={`courses/${row.id}`}
        src={row.logo}
        name={row.name}
      />
    ),
  },
  { key: 'categoryName', title: 'category', width: 20, sortable: true },
  {
    key: 'instructor',
    title: 'instructor',
    width: 20,
    sortable: true,
    render: (_, row) => (
      <AvatarWithName src={row.instructorAvatar} name={row.instructorName} />
    ),
  },
  {
    key: 'description',
    title: 'Description',
    width: 35,
    sortable: true,
    render: (_, row) => (
      <p className="overflow-hidden whitespace-nowrap text-ellipsis">
        {row.description}
      </p>
    ),
  },
  {
    key: 'action',
    title: 'Action',
    width: 5,
    render: (_, row) => <CourseActions id={row.id} />,
  },
];

export const MAPPING_OPTION: Record<'value' | 'label', keyof Category> = {
  value: 'id',
  label: 'name',
};
