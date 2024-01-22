import { render, screen } from '@testing-library/react';

// Components
import Card from '..';

// TODO: Get mock course from mocks folder
const mockCourse = {
  id: '1',
  logo: '/logo-url',
  name: 'Course Name',
  description: 'Course Description',
  instructor: {
    id: '1',
    name: 'Instructor Name',
    avatar: '/instructor-image-url',
  },
};

describe('Card component', () => {
  it('renders Card component correctly', () => {
    render(<Card {...mockCourse} />);

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
