import { render, screen, fireEvent } from '@testing-library/react';

// Component
import Pagination from '..';

// Mocks data
const defaultProps = {
  totalItems: 20,
  itemsPerPage: 5,
  onPageChange: jest.fn(),
  disabled: false,
};

describe('Pagination component', () => {
  it('should render pagination with default props', () => {
    render(<Pagination {...defaultProps} />);
    const rowPerPageElement = screen.getByText('1 to 6 of 20 records');

    expect(rowPerPageElement).toBeInTheDocument();
  });

  it('should call onPageChange when page navigation buttons are clicked', () => {
    render(<Pagination {...defaultProps} />);

    const previousPageButton = screen.getByText('<');
    const nextPageButton = screen.getByText('>');

    fireEvent.click(nextPageButton);
    fireEvent.click(previousPageButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(2);
  });

  it('should apply disabled styles to navigation buttons when disabled prop is true', () => {
    render(<Pagination {...defaultProps} disabled />);

    const previousPageButton = screen.getByText('<');
    const nextPageButton = screen.getByText('>');

    expect(previousPageButton).toHaveAttribute('disabled');
    expect(nextPageButton).toHaveAttribute('disabled');
  });

  it('should display get more pagination', () => {
    render(<Pagination {...defaultProps} totalItems={62} />);

    const previousPageButton = screen.getByText('...');

    expect(previousPageButton).toBeInTheDocument();
  });

  it('should display start records and end record same value', () => {
    render(<Pagination {...defaultProps} totalItems={6} />);

    const nextPageButton = screen.getByText('>');
    fireEvent.click(nextPageButton);

    const previousPageButton = screen.getByText('6 to 6 of 6 records');

    expect(previousPageButton).toBeInTheDocument();
  });
});
