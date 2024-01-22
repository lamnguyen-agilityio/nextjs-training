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

export const records: CourseBase[] = [
  {
    id: '1',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
];
