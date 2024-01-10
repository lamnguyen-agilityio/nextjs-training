import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  InvoicePayload,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_PRIMARY}/revenue`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Revenue[] = await res.json();
 
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_PRIMARY}/customers?limit=5&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data: LatestInvoiceRaw[] = await res.json();
 
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache'
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
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards?limit=${ITEMS_PER_PAGE}&page=${currentPage}&search=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data = await res.json();
  const formattedData: InvoicesTable[] = data === 'Not found' ? [] : data;
 
  return formattedData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards?search=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data = await res.json();
  const formattedData: InvoicesTable[] = data === 'Not found' ? [] : data;
  const totalPages = Math.ceil(Number(formattedData.length) / ITEMS_PER_PAGE);
 
  return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data = await res.json();

  if (data !== 'Not found') {
    data.amount = data.amount / 100;
  }

  return data === 'Not found' ? undefined : data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomers() {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_PRIMARY}/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data: CustomerField[] = await res.json();
 
  return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function createInvoiceToDatabase(invoice: InvoicePayload) {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice)
  })
 
  const data: LatestInvoiceRaw = await res.json();
 
  return {...data, hasError: false};
  } catch (err) {
    console.error('Database Error:', err);

    return { message: 'Database Error: Failed to create Invoice.', hasError: true };
  }
}

export async function updateInvoiceById(id: string, invoice: InvoicePayload) {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoice)
  })

  const data: LatestInvoiceRaw = await res.json();
 
  return {...data, hasError: false};
  } catch (err) {
    console.error('Database Error:', err);

    return { message: 'Database Error: Failed to update Invoice.', hasError: true };
  }
}

export async function deleteInvoiceById(id: string) {
  noStore();

  try {
    const res = await fetch(`${process.env.API_URL_SECONDARY}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const data: LatestInvoiceRaw = await res.json();
 
  return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to delete invoice by id.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
