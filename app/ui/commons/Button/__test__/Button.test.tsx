import { render, screen, fireEvent } from '@testing-library/react';

// Component
import Button from '../';

// Mocks data
const defaultProps = {
  type: 'button' as const,
  children: 'Click me',
  onClick: jest.fn(),
};

describe('Button', () => {
  it('renders button with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('rounded-sm');
    expect(button).toHaveClass('btn--primary');
    expect(button).toHaveClass('btn--medium');
    expect(button).toHaveClass('hover:opacity-70');
    expect(button).not.toHaveClass('cursor-not-allowed');
  });

  it('renders button with custom variant, size, and additional className', () => {
    render(
      <Button
        {...defaultProps}
        variant="info"
        buttonSize="large"
        className="custom-class"
      >
        Custom Button
      </Button>
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn--info');
    expect(button).toHaveClass('btn--large');
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick handler when button is clicked', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('applies disabled styles and prevents click when disabled', () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('pointer-events-none');
    expect(button).toHaveAttribute('disabled');
  });
});
