import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  buttonSize?: 'small' | 'medium' | 'large' | 'auto';
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  buttonSize = 'medium',
  className = '',
  disabled = false,
  children,
  onClick = () => {},
  ...props
}: Props) => (
  <button
    type={type}
    className={clsx(
      `flex items-center justify-center rounded-sm btn--${variant} btn--${buttonSize} hover:opacity-70`,
      { 'pointer-events-none opacity-50': disabled },
      className
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
