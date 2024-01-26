import dynamic from 'next/dynamic';

// Mocks data
import {
  courseOverview,
  courseSections,
  courseSrc,
  lessons,
  notification,
  personName,
  role,
  createdAt,
} from '@/mocks';

// Utils
import { getRelativeTime } from '@/app/lib/utils';

// Components
const CourseDetail = dynamic(() => import('@/app/ui/commons/Course/Detail'));

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <CourseDetail
      id={id}
      src={courseSrc}
      sections={courseSections}
      courseOverview={courseOverview}
      personName={personName}
      role={role}
      time={getRelativeTime(createdAt)}
      notification={notification}
      avatar="/"
      lessons={lessons}
    />
  );
};

export default Page;
