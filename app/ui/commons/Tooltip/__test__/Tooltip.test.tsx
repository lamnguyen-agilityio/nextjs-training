import { render, screen } from '@testing-library/react';

// Component
import Tooltip from '..';

describe('Tooltip Component', () => {
  test('should render tooltip content when hovered', () => {
    const content = 'Tooltip Content';
    const children = <span>Hover me</span>;

    render(<Tooltip content={content}>{children}</Tooltip>);

    const tooltipTrigger = screen.getByText('Hover me');
    const tooltipContent = screen.queryByText(content);

    // tooltip-text include hidden class
    expect(tooltipContent).toHaveClass('tooltip-text');

    tooltipTrigger.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true })
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
