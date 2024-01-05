import { formatCurrency } from '../../lib/utils';

export async function fetchCardData() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data = await res.json();
  
  const numberOfInvoices = Number(data.length ?? '0');
  const totalPaidInvoices = formatCurrency(data.map((item: { status: string; }) => item.status === 'paid').length ?? '0');
  const totalPendingInvoices = formatCurrency(data.map((item: { status: string; }) => item.status === 'pending').length ?? '0');
 
  return {
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
