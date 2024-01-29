'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

// Interfaces
import { Course, Option } from '@/app/lib/interfaces';

// Validation
import { createCourse, updateCourse } from '@/actions';

// Components
import Button from '@/app/ui/commons/Button';

// Initial data
const initialState = { message: null, errors: {} };

interface Props {
  course?: Course;
  categories: Option[];
  instructors: Option[];
}

export const CourseForm = ({ course, categories, instructors }: Props) => {
  const updateCourseWithId = updateCourse.bind(null, course?.id || '');
  const [state, dispatch] = useFormState(
    course?.id ? updateCourseWithId : createCourse,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block title-section">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={course?.name}
                placeholder="Enter name"
                className="peer block w-full rounded-md border py-2 pl-4 content-section outline-2"
                aria-describedby="name-error"
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-fill-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block title-section">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border py-2 pl-4 content-section outline-2"
              defaultValue={course?.categoryId || ''}
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories?.map((customer) => (
                <option key={customer.value} value={customer.value}>
                  {customer.label}
                </option>
              ))}
            </select>
          </div>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categoryId &&
              state.errors.categoryId.map((error: string) => (
                <p className="mt-2 text-sm text-fill-danger" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="instructor" className="mb-2 block title-section">
            Choose instructor
          </label>
          <div className="relative">
            <select
              id="instructor"
              name="instructorId"
              className="peer block w-full cursor-pointer rounded-md border py-2 pl-4 content-section outline-2"
              defaultValue={course?.instructorId || ''}
              aria-describedby="instructor-error"
            >
              <option value="" disabled>
                Select a instructor
              </option>
              {instructors?.map((customer) => (
                <option key={customer.value} value={customer.value}>
                  {customer.label}
                </option>
              ))}
            </select>
          </div>
          <div id="instructor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.instructorId &&
              state.errors.instructorId.map((error: string) => (
                <p className="mt-2 text-sm text-fill-danger" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block title-section">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                rows={4}
                cols={50}
                defaultValue={course?.description}
                placeholder="Enter description"
                className="peer block w-full rounded-md border py-2 pl-4 content-section outline-2"
                aria-describedby="description-error"
              />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-fill-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-fill-danger" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/courses"
          className="flex h-10 items-center rounded-lg px-4 bg-fill-text-light title-section hover:opacity-80"
        >
          Cancel
        </Link>
        <Button
          variant="warning"
          type="submit"
          buttonSize="auto"
          className="capitalize"
        >
          {course?.id ? 'edit course' : 'create course'}
        </Button>
      </div>
    </form>
  );
};
