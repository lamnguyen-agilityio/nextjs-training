import { render, screen } from '@testing-library/react';

// Component
import TableRows from '../TableRows';

// Mocks data
import { columns, records } from '@/mocks';

describe('TableRows component', () => {
  it('should render rows correctly with records', () => {
    render(
      <table>
        <TableRows columns={columns} data={records} />
      </table>
    );

    // Assert that the rows and cells are rendered correctly
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Web design')).toBeInTheDocument();
    expect(screen.getByText('Lorem')).toBeInTheDocument();
    expect(screen.getByText('Lorem')).toHaveClass('bg-background');
  });

  it('should render "No records" message when records are empty', () => {
    render(
      <table>
        <TableRows columns={columns} data={[]} />
      </table>
    );

    expect(screen.getByText('No records')).toBeInTheDocument();
  });
});
