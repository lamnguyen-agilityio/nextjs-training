import { render, screen, fireEvent } from '@testing-library/react';

// Component
import Table from '..';

// Mocks data
import { columns, records } from '@/mocks';

describe('Table component', () => {
  it('should render table headers and rows correctly', () => {
    const onSortMock = jest.fn();
    render(<Table data={records} columns={columns} onSort={onSortMock} />);

    // Assert that headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();

    // Assert that rows are rendered
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Web design')).toBeInTheDocument();
    expect(screen.getByText('Lorem')).toBeInTheDocument();
  });

  it('should trigger onSort callback when clicking on a sortable header', () => {
    const onSortMock = jest.fn();
    const defaultSort = { key: 'name', direction: 'asc' } as const;

    render(
      <Table
        data={records}
        columns={columns}
        defaultSort={defaultSort}
        onSort={onSortMock}
      />
    );

    // Click on a sortable header
    fireEvent.click(screen.getByText('Name'));

    // Assert that onSort callback is called with the correct parameters
    expect(onSortMock).toHaveBeenCalledWith({ key: 'name', direction: 'desc' });
  });
});
