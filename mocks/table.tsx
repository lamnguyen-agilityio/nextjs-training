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
  {
    id: '2',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '3',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '4',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '5',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '6',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '7',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '8',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '9',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
  {
    id: '10',
    name: 'John',
    logo: '/',
    categoryName: 'Web design',
    instructorName: 'John',
    instructorAvatar: '/',
    description: 'Lorem',
  },
];

export const totalCourses = 40;
export const coursesPerPage = 4;
