'use client';

import { useState, ReactNode } from 'react';

// Icons
import { DropdownIcon } from '@/app/ui/icons';

// Interface
import { Section } from '@/app/lib/interfaces';
interface Props {
  type?: 'primary' | 'secondary';
  sections: Section[];
  onSetActive?: (value: number | null) => void;
}

const Accordion = ({ type = 'primary', sections, onSetActive }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    onSetActive?.(activeIndex === index ? null : index);
  };

  return (
    <div>
      {sections.map((section, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className={`${type === 'primary' ? 'border-b' : 'mb-3 bg-background'}`}
          >
            <div
              className={`cursor-pointer p-4 border-b ${isActive && type === 'primary' && 'bg-active-primary text-background pl-8'}`}
              onClick={() => handleToggle(index)}
              aria-expanded={isActive}
            >
              <div className="flex justify-between items-start">
                <div>{section.title}</div>
                <span
                  className={`${isActive && type === 'primary' && 'fill-background stroke-background'}`}
                >
                  <DropdownIcon className={`${isActive && 'rotate-180'}`} />
                </span>
              </div>
            </div>
            {isActive && (
              <div
                className={`${isActive && type === 'primary' && 'px-8'} p-4`}
              >
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
