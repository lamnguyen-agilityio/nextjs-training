import { render, fireEvent, screen } from '@testing-library/react';

// Component
import Collapse from '..';

// Mocks data
const mockContent = <p>This is some content.</p>;

describe('Collapse component', () => {
  test('should render content with out "Show More" and "Show Less', () => {
    const { getByText } = render(
      <Collapse content={mockContent} maxLength={5} />
    );

    expect(getByText('This is some content.')).toBeInTheDocument();
    expect(screen.queryByText('+ see more')).not.toBeInTheDocument();
    expect(screen.queryByText('- see less')).not.toBeInTheDocument();
  });

  test('should render content with "Show More" link', () => {
    const { getByText } = render(
      <Collapse content={mockContent} maxLength={0} />
    );

    expect(getByText('+ see more')).toBeInTheDocument();
  });

  test('should expand content when "Show More" is clicked', () => {
    const { getByText } = render(
      <Collapse content={mockContent} maxLength={0} />
    );

    fireEvent.click(getByText('+ see more'));

    expect(getByText('This is some content.')).toBeInTheDocument();
    expect(getByText('- see less')).toBeInTheDocument();
  });
});
