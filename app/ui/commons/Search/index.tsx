'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';

// Icons
import { SearchIcon } from '@/app/ui/icons';

interface Props {
  placeholder?: string;
  debounceTime?: number;
  onChange: (value: string) => void;
}

const SearchComponent = ({
  placeholder = 'Search...',
  debounceTime = 1000,
  onChange,
}: Props) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };

  // TODO: Implement the hook to handle debounce
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Clear any existing debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set up a new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      onChange(value);
    }, debounceTime);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <SearchIcon
        data-testid="search-icon"
        className="absolute top-0 right-0 focus:outline-none cursor-pointer mt-2 mr-2"
        onClick={toggleInputVisibility}
      />
      <input
        type="text"
        data-testid="search-input"
        placeholder={placeholder}
        className={`focus:outline-none rounded transition-all duration-500 bg-transparent p-2 pr-9 ${
          isInputVisible
            ? 'w-52 border border-fill-link pl-4'
            : 'w-0 border-transparent'
        }`}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
