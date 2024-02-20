// Components
import { AvatarWithName } from '@/app/ui/commons';
import { GroupActions } from '@/app/ui/course';

// Enums
import { TableCells } from '@/app/lib/enums';

// Interfaces
import { Link } from '@/app/lib/interfaces';

type Props =
  | { type: TableCells.String; value: string }
  | { type: TableCells.Link; value: Link }
  | { type: TableCells.Action; value: { id: string } };

const TableCell = ({ type, value }: Props) => {
  switch (type) {
    case TableCells.Action:
      const { id } = value;

      return <GroupActions id={id} />;

    case TableCells.Link:
      const { text, href, src } = value;

      return <AvatarWithName link={href} src={src} name={text} />;

    default:
      return (
        <p className="overflow-hidden whitespace-nowrap text-ellipsis">
          {value}
        </p>
      );
  }
};

export default TableCell;
