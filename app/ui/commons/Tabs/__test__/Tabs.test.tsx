import { render, screen, fireEvent } from '@testing-library/react';

// Component
import Tabs from '..';

// Mocks data
const tabsMock = [
  { label: 'Tab 1', content: 'Content for Tab 1' },
  { label: 'Tab 2', content: 'Content for Tab 2' },
  { label: 'Tab 3', content: 'Content for Tab 3' },
];

describe('Tabs component', () => {
  it('should render with initial state', () => {
    render(<Tabs tabs={tabsMock} />);

    // Assert that the initial tab is rendered with the correct label and content
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    // Assert that the other tabs are not initially rendered
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('should switch tabs and updates content', () => {
    render(<Tabs tabs={tabsMock} />);

    // Click on the second tab
    fireEvent.click(screen.getByText('Tab 2'));

    // Assert that the second tab is now active and its content is displayed
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();

    // Assert that the other tabs are not visible
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });
});
