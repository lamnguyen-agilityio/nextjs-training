import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Component
import Accordion from '..';

// Mocks data
const mockSections = [
  {
    title: 'Section 1',
    content: <p>This is the content of Section 1.</p>,
  },
  {
    title: 'Section 2',
    content: <p>This is the content of Section 2.</p>,
  },
  {
    title: 'Section 3',
    content: <p>This is the content of Section 3.</p>,
  },
];
const AccordionComponent = <Accordion sections={mockSections} />;

describe('Accordion component', () => {
  it('should render with sections', () => {
    const { getByText } = render(AccordionComponent);

    mockSections.forEach((section) => {
      expect(getByText(section.title)).toBeInTheDocument();
    });
  });

  it('should toggle section content on click', () => {
    const { getByText, queryByText } = render(AccordionComponent);

    // Initially, content is not visible
    expect(
      queryByText('This is the content of Section 1.')
    ).not.toBeInTheDocument();

    // Click to expand content
    fireEvent.click(getByText('Section 1'));
    expect(getByText('This is the content of Section 1.')).toBeInTheDocument();

    // Click again to collapse content
    fireEvent.click(getByText('Section 1'));
    expect(
      queryByText('This is the content of Section 1.')
    ).not.toBeInTheDocument();
  });
});
