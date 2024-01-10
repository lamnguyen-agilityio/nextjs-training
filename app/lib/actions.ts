'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createInvoiceToDatabase, updateInvoiceById, deleteInvoiceById } from './data';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
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

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = Invoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

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

  const response = await createInvoiceToDatabase(payload);

  if (response.hasError) {
    return response;
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
   // Validate form fields using Zod
   const validatedFields = Invoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

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

  const response = await updateInvoiceById(id, payload);

  if (response.hasError) {
    return response;
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// TODO: Handle notification when an error occurs
export async function deleteInvoice(id: string) {
  const response = await deleteInvoiceById(id);

  if (response.id) {
    revalidatePath('/dashboard/invoices');
  }
}
