import { notFound } from 'next/navigation';

export default function Page() {
  const condition = true;

  // Demo not found page
  if (condition) {
    notFound();
  }

  return <p>Customers Page</p>;
}
