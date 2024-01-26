// Interfaces
import { CourseOverview } from '@/app/lib/interfaces';

interface Props {
  overview: CourseOverview[];
}

const Overview = ({ overview }: Props) => (
  <div className="flex flex-col gap-5">
    {overview.map((course) => (
      <div key={course.title}>
        <h5 className="title-section capitalize mb-3">{course.title}</h5>
        {course.type === 'single' ? (
          <p className="content-section">{course.content}</p>
        ) : (
          <ul className="flex flex-wrap pl-5">
            {(course.content as string[]).map((item) => (
              <li key={item} className="w-1/2 list-disc content-section">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

export default Overview;
