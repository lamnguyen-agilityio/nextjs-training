import Link from 'next/link';

// Components
import { Popover } from '@/app/ui/commons';

// Utils
import { deleteCourse } from '@/app/lib/utils';

// Icons
import { DotsIcon } from '@/app/ui/icons';

// Constants
import { ROUTES } from '@/app/lib/constants';

interface Props {
  id: string;
}

const GroupActions = ({ id }: Props) => {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <Popover
      trigger={<DotsIcon className="cursor-pointer" />}
      content={
        <div className="flex flex-col bg-background text-background overflow-hidden">
          <Link
            className="ml-[1px] mr-[1px] p-2 bg-fill-info rounded-none"
            href={`${ROUTES.COURSE_LIST}/${id}/edit`}
          >
            Edit
          </Link>
          <form
            action={deleteCourseWithId}
            className="rounded-none border p-2 bg-fill-warning"
          >
            <button>Delete</button>
          </form>
        </div>
      }
    />
  );
};

export default GroupActions;
