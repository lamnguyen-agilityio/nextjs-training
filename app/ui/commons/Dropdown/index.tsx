'use client';

import { useState, useEffect, useRef } from 'react';

// Interfaces
import { Option } from '@/app/lib/interfaces';

// Icons
import { ArrowDownIcon } from '@/app/ui/icons';

interface Props {
  options: Option[];
  onChange: (value: string) => void;
  label: string;
  defaultLabel?: string;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  onChange,
  label,
  defaultLabel = '',
  disabled = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultLabel || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (label: string) => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <div className="relative bg-background text-sm" ref={dropdownRef}>
      <div
        className={`relative w-48 pl-2 border rounded-sm ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between hover:opacity-70">
          <p className="relative truncate py-2">
            <span className="absolute top-1 left-0 capitalize text-outline-link">
              {label}:
            </span>
            <span className="font-medium text-fill-dark-text-dark capitalize pl-14">
              {selectedOption}
            </span>
          </p>
          <span className="relative min-w-7 h-10 bg-active-link">
            <ArrowDownIcon className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 fill-outline-text-light" />
          </span>
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-background rounded-b-md shadow-md z-10">
            {options.map((option) => (
              <p
                key={option.value}
                className="p-2 cursor-pointer text-fill-dark-text-dark truncate border-b capitalize hover:opacity-70"
                data-value={option.label}
                onClick={() => {
                  handleChange(option.label);
                  onChange(option.value);
                }}
              >
                {option.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
