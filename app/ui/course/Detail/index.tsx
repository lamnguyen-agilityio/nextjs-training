'use client';

import { useEffect } from 'react';

// Components
import { Tabs } from '@/app/ui/commons';
import {
  Announcement,
  CourseFAQ,
  CourseLessons,
  CourseOverview,
} from '@/app/ui/course';

// Interfaces
import { CourseDetail, CourseLesson, Instructor } from '@/app/lib/interfaces';

// Utils
import { convertTimestampToDate, getRelativeTime } from '@/app/lib/utils';

// Contexts
import { useBreadcrumb } from '@/app/lib/contexts/breadcrumb';

// Constants
import { ROUTES } from '@/app/lib/constants';

interface Props {
  lessons?: CourseLesson[];
  course?: CourseDetail;
  instructor?: Instructor;
}

const Detail = ({ lessons, course, instructor }: Props) => {
  const { updateBreadcrumb } = useBreadcrumb();

  const time =
    (course &&
      getRelativeTime(
        convertTimestampToDate(
          course.createdAt.seconds,
          course.createdAt.nanoseconds
        )
      )) ||
    '';
  const tabs = course &&
    instructor && [
      {
        label: 'Overview',
        content: <CourseOverview overview={course.overview} />,
      },
      {
        label: 'FAQ',
        content: <CourseFAQ sections={course.faq} />,
      },
      {
        label: 'Announcements',
        content: (
          <Announcement
            name={course.name}
            role={instructor.role}
            time={time}
            content={course.announcement}
            src={instructor.avatar}
          />
        ),
      },
    ];

  useEffect(() => {
    if (course?.name) {
      updateBreadcrumb([
        { title: 'My Course', href: ROUTES.COURSE_LIST },
        { title: course?.name, href: ROUTES.COURSE_LIST, active: true },
      ]);
    }

    return () => {
      updateBreadcrumb([{ title: 'My Course', href: ROUTES.COURSE_LIST }]);
    };
  }, [course?.name, updateBreadcrumb]);

  return (
    <main className="flex justify-start gap-x-8 pr-10">
      {course && (
        <div className="w-full sm:w-[70%] pb-3">
          <iframe
            src={course.src}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="w-full rounded-md min-h-[400px] mb-8"
          />
          <Tabs tabs={tabs || []} />
        </div>
      )}
      <div className="w-full sm:w-[30%]">
        <CourseLessons lessons={lessons || []} />
      </div>
    </main>
  );
};

export default Detail;
