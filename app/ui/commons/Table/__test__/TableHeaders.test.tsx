import { render, screen, fireEvent } from '@testing-library/react';

// Components
import TableHeaders from '../TableHeaders';

// Mocks data
import { columns } from '@/mocks';

jest.mock('@/app/ui/icons', () => ({
  SortIcon: jest.fn(() => <p>sort icon</p>),
}));

const onSortMock = jest.fn();

describe('TableHeaders component', () => {
  it('should render headers correctly', () => {
    render(
      <table>
        <TableHeaders columns={columns} onSort={onSortMock} />
      </table>
    );

    // Confirm the presence of title cells in the correct width
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Name').parentElement).toHaveStyle('width: 30%');

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Category').parentElement).toHaveStyle(
      'width: 30%'
    );

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Description').parentElement).toHaveStyle(
      'width: 40%'
    );
  });

  it('should handle sort when clicked', () => {
    render(
      <table>
        <TableHeaders columns={columns} onSort={onSortMock} />
      </table>
    );

    // Simulate a click on the 'Name' column header
    fireEvent.click(screen.getByText('Name'));

    // Assert that the onSortMock function has been called with the correct arguments
    expect(onSortMock).toHaveBeenCalledWith({ key: 'name', direction: 'asc' });

    // Simulate another click on the same column header
    fireEvent.click(screen.getByText('Name'));

    // Assert that the onSortMock function has been called with the updated arguments
    expect(onSortMock).toHaveBeenCalledWith({ key: 'name', direction: 'desc' });
  });
});
