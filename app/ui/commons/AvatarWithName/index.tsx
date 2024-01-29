import Image from 'next/image';
import Link from 'next/link';

interface Props {
  src: string;
  name: string;
  link?: string;
}

const AvatarWithName = ({ src, name, link }: Props) => {
  return link ? (
    <Link
      href={link}
      className="flex items-center gap-2 text-active-primary hover:underline"
    >
      <Image
        src={src}
        alt="angular"
        width={24}
        height={24}
        className="rounded-full w-6 h-6"
      />
      <span>{name}</span>
    </Link>
  ) : (
    <div className="flex items-center gap-2">
      <Image
        src={src}
        alt="angular"
        width={24}
        height={24}
        className="rounded-full w-6 h-6"
      />
      <span>{name}</span>
    </div>
  );
};

export default AvatarWithName;
