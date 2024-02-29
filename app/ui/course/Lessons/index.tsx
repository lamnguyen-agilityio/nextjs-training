'use client';
import { useState } from 'react';

// Components
import { Checkbox, Accordion } from '@/app/ui/commons';

// Utils
import { convertSeconds } from '@/app/lib/utils';

// Icons
import { MovieIcon } from '@/app/ui/icons';

// Interfaces
import { CourseLesson } from '@/app/lib/interfaces';

interface Props {
  lessons: CourseLesson[];
}

const convertSectionsToJSX = (
  sections: CourseLesson[],
  indexActive: number | null
) => {
  return sections.map((section, index) => {
    const sectionTitle = (
      <div className="flex flex-col gap-1">
        <p
          className={`text-sm font-medium ${index === indexActive ? 'text-background' : 'text-fill-text-dark'}`}
        >{`Section ${index}: ${section.title}`}</p>
        <div
          className={`flex items-center gap-2 text-xs ${index === indexActive ? 'text-background fill-background' : 'text-fill-text-main fill-active-secondary'}`}
        >
          <MovieIcon />
          <span>{`${section.list.length} video | ${convertSeconds(section.totalTime)}`}</span>
        </div>
      </div>
    );

    const sectionContent = (
      <div className="flex flex-col gap-2">
        {section.list.map((item, itemIndex) => (
          <div key={item.name} className="flex gap-2">
            <Checkbox
              checked={item.isDone}
              onChange={(value) => console.log(value)}
              disabled
            />
            <div className="flex flex-col gap-1 title-section -mt-[2px]">
              {`${itemIndex + 1}. ${item.name}`}
              <p className="flex items-center gap-2 fill-active-secondary content-section">
                <MovieIcon />
                {`${item.totalVideo} video | ${convertSeconds(item.time)}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    );

    return {
      title: sectionTitle,
      content: sectionContent,
    };
  });
};

const Lessons = ({ lessons }: Props) => {
  const [indexActive, setIndexActive] = useState<number | null>(null);
  const convertedSections = convertSectionsToJSX(lessons, indexActive);

  return (
    <div className="w-full bg-background rounded-md pt-4">
      <h5 className="title-section px-4">Course content</h5>
      <Accordion sections={convertedSections} onSetActive={setIndexActive} />
    </div>
  );
};

export default Lessons;
