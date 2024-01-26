import Link from 'next/link';

interface Props {
  link: string;
  title: string;
}

const NotFound = ({ link, title }: Props) => (
  <main className="flex h-full flex-col items-center justify-center gap-2">
    <h3 className="text-xl font-semibold">404 Not Found</h3>
    <p>{title}</p>
    <Link
      href={link}
      className="mt-4 rounded-md bg-active-primary px-4 py-2 text-sm text-background transition-colors hover:opacity-70"
    >
      Go Back
    </Link>
  </main>
);

export default NotFound;
