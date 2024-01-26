import { render, screen } from '@testing-library/react';

// Components
import CourseCard from '..';

// TODO: Get mock course from mocks folder
const mockCourse = {
  id: '1',
  course: {
    name: 'Course Name',
    image: '/logo-url',
  },
  instructor: {
    name: 'Instructor Name',
    image: '/instructor-image-url',
  },
  description: 'Course Description',
};

describe('CourseCard component', () => {
  it('renders CourseCard component correctly', () => {
    render(<CourseCard {...mockCourse} />);

    // Assert that the key elements are rendered
    expect(screen.getByText('Course Name')).toBeInTheDocument();
    expect(screen.getByText('Course Name')).toHaveAttribute(
      'href',
      '/courses/1'
    );
    expect(screen.getByText('Course Description')).toBeInTheDocument();
    expect(screen.getByText('Instructor Name')).toBeInTheDocument();
  });
});
