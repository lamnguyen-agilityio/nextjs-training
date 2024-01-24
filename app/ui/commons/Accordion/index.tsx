'use client';

import { useState, ReactNode } from 'react';

// Icons
import { DropdownIcon } from '@/app/ui/icons';

interface Section {
  title: ReactNode;
  content: ReactNode;
}

interface Props {
  sections: Section[];
}

const Accordion = ({ sections }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {sections.map((section, index) => {
        const isActive = activeIndex === index;

        return (
          <div key={index} className="border-b">
            <div
              className={`cursor-pointer p-4 ${isActive && 'bg-active-primary text-background pl-8'}`}
              onClick={() => handleToggle(index)}
              aria-expanded={isActive}
            >
              <div className="flex justify-between items-start">
                <div>{section.title}</div>
                <span
                  className={`${isActive && 'fill-background stroke-background'}`}
                >
                  <DropdownIcon className={`${isActive && 'rotate-180'}`} />
                </span>
              </div>
            </div>
            {isActive && (
              <div className={`${isActive && 'p-4 px-8'}`}>
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
