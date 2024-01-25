import { render, fireEvent } from '@testing-library/react';

// Components
import Popover from '..';

// Mocks data
const triggerText = 'Click me';
const contentText = 'Popover content';
const PopoverComponent = (
  <Popover
    trigger={<div>{triggerText}</div>}
    content={<div>{contentText}</div>}
  />
);

describe('Popover component', () => {
  it('should render trigger and content', () => {
    const { getByText } = render(PopoverComponent);

    const triggerElement = getByText(triggerText);
    expect(triggerElement).toBeInTheDocument();

    fireEvent.click(triggerElement);

    const contentElement = getByText(contentText);
    expect(contentElement).toBeInTheDocument();
  });

  it('should close popover when clicking outside', () => {
    const { getByText, queryByText } = render(PopoverComponent);

    const triggerElement = getByText(triggerText);
    fireEvent.click(triggerElement);

    const contentElement = getByText(contentText);
    expect(contentElement).toBeInTheDocument();

    // Clicking outside the popover should close it
    fireEvent.click(document.body);

    const closedContentElement = queryByText(contentText);
    expect(closedContentElement).toBeNull();
  });
});
