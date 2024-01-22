import Image from 'next/image';
import Link from 'next/link';

// Interfaces
import { Instructor } from '@/app/lib/interfaces';

interface Props {
  id: string;
  logo: string;
  name: string;
  description: string;
  instructor: Instructor;
}

const Card = ({ id, logo, name, description, instructor }: Props) => {
  return (
    <section className="relative flex flex-col justify-between gap-3 group bg-background rounded-md overflow-hidden text-xs px-5 py-3">
      <div className="flex justify-between items-center">
        <Image
          src={logo}
          alt="angular"
          width={22}
          height={28}
          className="rounded-full w-auto h-auto"
        />
        {/* TODO: Update action icon */}
        <p>Icon</p>
      </div>
      <Link
        href={`/courses/${id}`}
        className="relative inline-block text-sm text-fill-text-dark font-medium py-2 before:w-4 before:h-[1px]
       before:absolute before:bottom-0 before:left-0 before:bg-fill-success"
      >
        {name}
      </Link>
      <span className="pb-1 border-b text-fill-text-main line-clamp-3">
        {description}
      </span>
      <div className="flex gap-2 items-center mt-auto">
        <Image
          src={instructor.avatar}
          alt="angular"
          width={22}
          height={28}
          className="rounded-full w-auto h-auto"
        />
        <p className="text-fill-text-dark font-medium">{instructor.name}</p>
      </div>
      <span className="absolute inset-0 bg-fill-primary w-1 h-0 transition-all duration-500 group-hover:h-full" />
    </section>
  );
};

export default Card;
