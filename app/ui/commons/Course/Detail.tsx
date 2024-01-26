// Components
import Tabs from '@/app/ui/commons/Tabs';
import Overview from './Overview';
import FAQ from './FAQ';
import Announcement from './Announcement';
import Lessons from './Lessons';

// Interfaces
import { CourseLesson, CourseOverview, Section } from '@/app/lib/interfaces';

interface Props {
  id: string;
  src: string;
  personName: string;
  role: string;
  time: string;
  notification: string;
  avatar: string;
  lessons: CourseLesson[];
  sections: Section[];
  courseOverview: CourseOverview[];
}

const Detail = ({
  id,
  src,
  personName,
  role,
  time,
  notification,
  avatar,
  lessons,
  sections,
  courseOverview,
}: Props) => {
  const tabs = [
    {
      label: 'Overview',
      content: <Overview overview={courseOverview} />,
    },
    {
      label: 'FAQ',
      content: <FAQ sections={sections} />,
    },
    {
      label: 'Announcements',
      content: (
        <Announcement
          name={personName}
          role={role}
          time={time}
          content={notification}
          src={avatar}
        />
      ),
    },
  ];

  return (
    <main className="flex justify-start gap-x-8 pr-10">
      <div className="w-full sm:w-[70%]">
        <iframe
          src={src}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          className="w-full rounded-md min-h-[400px] mb-8"
        />
        <Tabs tabs={tabs} />
      </div>
      <div className="w-full sm:w-[30%]">
        <Lessons lessons={lessons} />
      </div>
    </main>
  );
};

export default Detail;
