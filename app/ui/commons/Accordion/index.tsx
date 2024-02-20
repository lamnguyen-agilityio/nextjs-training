'use client';

import { useState } from 'react';

// Icons
import { DropdownIcon } from '@/app/ui/icons';

// Interface
import { Section } from '@/app/lib/interfaces';
interface Props {
  type?: 'primary' | 'secondary';
  sections: Section[];
  onSetActive?: (value: number | null) => void;
}

const convertSectionsToJSX = (sections: Section[]) => {
  return sections.map((section) => {
    const sectionTitle = (
      <div className="text-sm font-medium text-fill-text-dark">
        {section.title}
      </div>
    );

    const sectionContent = (
      <div className="text-xs text-fill-text-main">{section.content}</div>
    );

    return {
      title: sectionTitle,
      content: sectionContent,
    };
  });
};

const Accordion = ({ type = 'primary', sections, onSetActive }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const convertedSections = convertSectionsToJSX(sections);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    onSetActive?.(activeIndex === index ? null : index);
  };

  return (
    <div>
      {convertedSections.map((section, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={section.title.toString()}
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
