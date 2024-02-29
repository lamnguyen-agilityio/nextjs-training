// Components
import { CourseCard } from '@/app/ui/course';

// Interfaces
import { CourseBase } from '@/app/lib/interfaces';

interface Props {
  data: CourseBase[];
}

const CardList = async ({ data }: Props) => (
  <div className="flex flex-wrap items-center justify-center gap-10">
    {data.map(({ id, description, name, instructor }) => (
      <div className="w-[255px]" key={id}>
        <CourseCard
          id={id}
          description={description}
          course={{
            name: name.text,
            image: name.src,
          }}
          instructor={{
            name: instructor.text,
            image: instructor.src,
          }}
        />
      </div>
    ))}
  </div>
);

export default CardList;
