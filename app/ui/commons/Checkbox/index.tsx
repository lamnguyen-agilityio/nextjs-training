'use client';

import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface Props {
  checked: boolean;
  variant?: 'success' | 'info' | 'warning';
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = ({
  checked,
  variant = 'success',
  disabled = false,
  onChange,
}: Props) => {
  const toggleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const isCheckedStatus = event.target.checked;

    onChange(isCheckedStatus);
  };

  return (
    <input
      type="checkbox"
      className={clsx(`checkbox--base checkbox--${variant}`, {
        'pointer-events-none opacity-50': disabled,
      })}
      checked={checked}
      onChange={toggleCheckbox}
    />
  );
};

export default Checkbox;
