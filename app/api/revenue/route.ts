export const dynamic = 'force-dynamic' // defaults to auto

export async function fetchRevenue() {
  try {
    console.log('URL: ', process.env.API_URL_PRIMARY);
    const res = await fetch(`${process.env.API_URL_PRIMARY}/revenue`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data = await res.json();
 
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
