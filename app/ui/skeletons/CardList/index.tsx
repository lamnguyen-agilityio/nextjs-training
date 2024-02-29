import { CardSkeleton } from '..';

interface Props {
  dataLength: number;
}

const CardList = ({ dataLength }: Props) => {
  const array = Array.from({ length: dataLength }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {array.map((item) => (
        <div key={item} className="w-[255px]">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default CardList;
