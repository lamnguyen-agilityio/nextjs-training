import { render, fireEvent } from '@testing-library/react';

// Component
import Checkbox from '..';

describe('Checkbox component', () => {
  it('should render', () => {
    const { container } = render(
      <Checkbox checked={false} onChange={() => {}} />
    );

    // Assert that the input element is rendered
    const checkboxInput = container.querySelector('input[type="checkbox"]');
    expect(checkboxInput).toBeInTheDocument();
  });

  it('should render with correct className', () => {
    const { container } = render(
      <Checkbox checked={false} variant="success" onChange={() => {}} />
    );

    // Assert that the input element is rendered
    const checkboxInput = container.querySelector('input[type="checkbox"]');
    expect(checkboxInput).toHaveClass('checkbox--success');
  });

  it('should handle checkbox change', () => {
    let isChecked = false;
    const handleChange = (value: boolean) => {
      isChecked = value;
    };

    const { container } = render(
      <Checkbox checked={isChecked} onChange={handleChange} />
    );

    // Trigger a change event on the checkbox
    const checkboxInput = container.querySelector('input[type="checkbox"]');

    if (!checkboxInput) {
      return;
    }

    fireEvent.click(checkboxInput);

    // Assert that the onChange handler has been called and isChecked is updated
    expect(isChecked).toBe(true);
  });

  it('should apply disabled styles', () => {
    const { container } = render(
      <Checkbox checked={false} disabled={true} onChange={() => {}} />
    );

    // Assert that the disabled styles are applied when disabled is true
    const checkboxInput = container.querySelector('input[type="checkbox"]');
    expect(checkboxInput).toHaveClass('pointer-events-none');
    expect(checkboxInput).toHaveClass('opacity-50');
  });
});
