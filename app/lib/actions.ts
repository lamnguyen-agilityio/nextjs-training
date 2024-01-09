'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createInvoiceToDatabase, updateInvoiceById, deleteInvoiceById } from './data';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const Invoice = FormSchema.omit({ id: true, date: true });
const date = new Date().toISOString().split('T')[0];

// TODO: Need to remove params
const userInfo = {
  name: 'Delba de Oliveira',
  email: 'delba@oliveira.com',
  image_url: '/customers/delba-de-oliveira.png'
}

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = Invoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;

  const payload = {
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
    ...userInfo
  }

  await createInvoiceToDatabase(payload);

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = Invoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;

  const payload = {
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
    ...userInfo
  }

  await updateInvoiceById(id, payload);
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await deleteInvoiceById(id);
  revalidatePath('/dashboard/invoices');
}
