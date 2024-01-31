import Image from 'next/image';
import Link from 'next/link';

// Components
import { CourseActions } from '@/app/ui/course';

interface CommonContent {
  name: string;
  image: string;
}

interface Props {
  id: string;
  description: string;
  course: CommonContent;
  instructor: CommonContent;
}

const CourseCard = ({ id, description, course, instructor }: Props) => {
  return (
    <section className="relative flex flex-col justify-between gap-3 group bg-background rounded-md overflow-hidden text-xs px-5 py-3">
      <div className="flex justify-between items-center">
        <Image
          src={course.image}
          alt="angular"
          width={24}
          height={28}
          className="rounded-full w-auto h-auto"
        />
        <CourseActions id={id} />
      </div>
      <Link
        href={`/courses/${id}`}
        className="relative inline-block text-sm text-active-primary font-medium pb-2 hover:underline before:w-4 before:h-[1px]
       before:absolute before:bottom-0 before:left-0 before:bg-fill-success"
      >
        {course.name}
      </Link>
      <span className="pb-1 border-b text-fill-text-main line-clamp-3">
        {description}
      </span>
      <div className="flex gap-2 items-center mt-auto">
        <Image
          src={instructor.image}
          alt="angular"
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
        />
        <p className="text-fill-text-dark font-medium">{instructor.name}</p>
      </div>
      <span className="absolute inset-0 bg-fill-primary w-1 h-0 transition-all duration-500 group-hover:h-full" />
    </section>
  );
};

export default CourseCard;
