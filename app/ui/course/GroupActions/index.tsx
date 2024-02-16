import Link from 'next/link';

// Components
import { Button, Popover } from '@/app/ui/commons';

// Utils
import { deleteCourse } from '@/app/lib/utils';

// Icons
import { DotsIcon } from '@/app/ui/icons';

interface Props {
  id: string;
}

const GroupActions = ({ id }: Props) => {
  const handleDeleteCourse = async () => {
    if (confirm('Delete this course?')) {
      await deleteCourse(id);
    }
  };

  return (
    <Popover
      trigger={<DotsIcon className="cursor-pointer" />}
      content={
        <div className="flex flex-col bg-background text-background overflow-hidden rounded-md">
          <Link className="p-2 bg-fill-info" href={`/courses/${id}/edit`}>
            Edit
          </Link>
          <Button
            type="submit"
            variant="error"
            buttonSize="auto"
            className="p-2 bg-fill-warning"
            onClick={handleDeleteCourse}
          >
            Delete
          </Button>
        </div>
      }
    />
  );
};

export default GroupActions;
