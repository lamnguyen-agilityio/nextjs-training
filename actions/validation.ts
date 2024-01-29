'use server';

import { z } from 'zod';
import { extractFormData } from '../app/lib/utils';

export type CourseState = {
  errors?: {
    name?: string[];
    categoryId?: string[];
    instructorId?: string[];
    description?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  instructorId: z.string({
    invalid_type_error: 'Please select a instructor.',
  }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }),
});

const Course = FormSchema.omit({ id: true });
const courseKeys = ['name', 'categoryId', 'instructorId', 'description'];

export const createCourse = async (_: CourseState, formData: FormData) => {
  const extractedCourse = extractFormData({ keys: courseKeys, formData });

  // Validate form fields using Zod
  const validatedFields = Course.safeParse(extractedCourse);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Course.',
    };
  }

  const { name, categoryId, instructorId, description } =
    Course.parse(extractedCourse);

  // TODO: Implement integration API
  console.log('Data: ', name, categoryId, instructorId, description);

  return {
    message: 'create',
  };
};

export const updateCourse = async (
  id: string,
  _: CourseState,
  formData: FormData
) => {
  const extractedCourse = extractFormData({ keys: courseKeys, formData });

  // Validate form fields using Zod
  const validatedFields = Course.safeParse(extractedCourse);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { name, categoryId, instructorId, description } =
    Course.parse(extractedCourse);

  // TODO: Implement integration API
  console.log('Data: ', name, categoryId, instructorId, description);
  console.log('id: ', id);

  return {
    message: 'update',
    id,
  };
};
