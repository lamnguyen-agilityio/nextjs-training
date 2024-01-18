import { render, screen, fireEvent } from '@testing-library/react';

// Components
import PageNumbers from '../PageNumbers';

// Mocks data
const defaultProps = {
  currentPage: 1,
  totalPages: 10,
  maxPageNumbersToShow: 5,
  disabled: false,
  onPageChange: jest.fn(),
};

describe('PageNumbers component', () => {
  it('should render page numbers with default props', () => {
    render(<PageNumbers {...defaultProps} />);
    const pageNumbers = screen.getAllByRole('button');

    expect(pageNumbers).toHaveLength(5);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
    expect(pageNumbers[3]).toHaveTextContent('4');
    expect(pageNumbers[4]).toHaveTextContent('5');
  });

  it('should call onPageChange when a page number is clicked', () => {
    render(<PageNumbers {...defaultProps} />);
    const pageButton = screen.getByText('2');

    fireEvent.click(pageButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should apply disabled styles to the current page', () => {
    render(<PageNumbers {...defaultProps} currentPage={3} />);
    const currentPageButton = screen.getByText('3');

    expect(currentPageButton).toHaveClass('pointer-events-none');
  });

  it('should handle endPage greater than totalPages', () => {
    render(<PageNumbers {...defaultProps} totalPages={3} />);
    const pageNumbers = screen.getAllByRole('button');

    expect(pageNumbers).toHaveLength(3);
    expect(pageNumbers[0]).toHaveTextContent('1');
    expect(pageNumbers[1]).toHaveTextContent('2');
    expect(pageNumbers[2]).toHaveTextContent('3');
  });
});
