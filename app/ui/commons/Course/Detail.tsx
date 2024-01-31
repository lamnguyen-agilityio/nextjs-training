// Components
import Tabs from '@/app/ui/commons/Tabs';
import Overview from './Overview';
import FAQ from './FAQ';
import Announcement from './Announcement';
import Lessons from './Lessons';

// Interfaces
import { CourseDetail, CourseLesson, Instructor } from '@/app/lib/interfaces';

// Utils
import { convertTimestampToDate, getRelativeTime } from '@/app/lib/utils';

interface Props {
  lessons: CourseLesson[];
  course?: CourseDetail;
  instructor?: Instructor;
}

const Detail = ({ lessons, course, instructor }: Props) => {
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
        content: <Overview overview={course.overview} />,
      },
      {
        label: 'FAQ',
        content: <FAQ sections={course.faq} />,
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

  return (
    <main className="flex justify-start gap-x-8 pr-10">
      {course && (
        <div className="w-full sm:w-[70%]">
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
        <Lessons lessons={lessons} />
      </div>
    </main>
  );
};

export default Detail;
