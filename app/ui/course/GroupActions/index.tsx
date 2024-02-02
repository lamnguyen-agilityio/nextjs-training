import Link from 'next/link';

// Components
import Popover from '@/app/ui/commons/Popover';
import Button from '@/app/ui/commons/Button';

// Utils
import { deleteCourse } from '@/app/lib/utils';

// Icons
import { DotsIcon } from '@/app/ui/icons';

interface Props {
  id: string;
}

const GroupActions = ({ id }: Props) => {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <Popover
      trigger={<DotsIcon className="cursor-pointer" />}
      content={
        <div className="flex flex-col bg-background text-background overflow-hidden rounded-md">
          <Link className="p-2 bg-fill-info" href={`/courses/${id}/edit`}>
            Edit
          </Link>
          <form
            action={async () => {
              if (confirm('Delete this course?')) {
                await deleteCourseWithId();
              }
            }}
          >
            <Button
              type="submit"
              variant="error"
              buttonSize="auto"
              className="p-2 bg-fill-warning"
            >
              Delete
            </Button>
          </form>
        </div>
      }
    />
  );
};

export default GroupActions;
