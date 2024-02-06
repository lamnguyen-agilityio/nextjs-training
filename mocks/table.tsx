import { ColumnProps, CourseBase } from '@/app/lib/interfaces';

export const columns: Array<ColumnProps<CourseBase>> = [
  { key: 'name', title: 'Name', width: 30, sortable: true },
  { key: 'categoryName', title: 'Category', width: 30, sortable: true },
  {
    key: 'description',
    title: 'Description',
    width: 40,
    sortable: false,
    render: (_, item) => <p className="bg-background">{item.description}</p>,
  },
];

export const totalCourses = 40;
export const coursesPerPage = 4;
