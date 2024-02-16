'use client';

import { useState, ReactNode, useEffect, useRef } from 'react';

interface Props {
  trigger: ReactNode;
  content: ReactNode;
}

const Popover = ({ trigger, content }: Props) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={togglePopover}>{trigger}</div>

      {isPopoverVisible && (
        <div
          className="absolute z-10 right-0 border rounded shadow-lg"
          onClick={() => setPopoverVisible(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
