'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

// Interfaces
import { Course, Option } from '@/app/lib/interfaces';

// Components
import Button from '@/app/ui/commons/Button';

// Utils
import { addCourse, editCourseById } from '@/app/lib/utils';

interface Props {
  id?: string;
  course?: Course;
  categories: Option[];
  instructors: Option[];
}

const Form = ({ id, course, categories, instructors }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Course>();

  const onSubmit: SubmitHandler<Course> = async (data) => {
    if (id) {
      return await editCourseById(id, data);
    }

    await addCourse(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block title-section">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                type="string"
                defaultValue={course?.name}
                placeholder="Enter name"
                className="peer block w-full rounded-md border py-2 pl-4 content-section outline-2"
                {...register('name', { required: true })}
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {errors.name && (
                <p className="mt-2 text-sm text-fill-danger">
                  Please enter a name
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="logo" className="mb-2 block title-section">
            Logo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="logo"
                type="string"
                defaultValue={course?.logo}
                placeholder="Enter logo"
                className="peer block w-full rounded-md border py-2 pl-4 content-section outline-2"
                aria-describedby="logo-error"
                {...register('logo', { required: true })}
              />
            </div>
            <div id="logo-error" aria-live="polite" aria-atomic="true">
              {errors.logo && (
                <p className="mt-2 text-sm text-fill-danger">
                  Please enter a logo
                </p>
              )}
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
              className="peer block w-full cursor-pointer rounded-md border py-2 pl-4 content-section outline-2"
              defaultValue={course?.categoryId || ''}
              aria-describedby="category-error"
              {...register('categoryId', { required: true })}
            >
              {categories?.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  disabled={!category.value}
                  className="capitalize"
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {errors.categoryId && (
              <p className="mt-2 text-sm text-fill-danger">
                Please choose the category
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="instructor" className="mb-2 block title-section">
            Choose instructor
          </label>
          <div className="relative">
            <select
              id="instructor"
              className="peer block w-full cursor-pointer rounded-md border py-2 pl-4 content-section outline-2"
              defaultValue={course?.instructorId || ''}
              aria-describedby="instructor-error"
              {...register('instructorId', { required: true })}
            >
              <option value="" disabled>
                Select a instructor
              </option>
              {instructors?.map((customer) => (
                <option
                  key={customer.value}
                  value={customer.value}
                  className="capitalize"
                >
                  {customer.label}
                </option>
              ))}
            </select>
          </div>
          <div id="instructor-error" aria-live="polite" aria-atomic="true">
            {errors.instructorId && (
              <p className="mt-2 text-sm text-fill-danger">
                Please choose the instructor
              </p>
            )}
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
                rows={4}
                cols={50}
                defaultValue={course?.description}
                placeholder="Enter description"
                className="peer block w-full rounded-md border py-2 pl-4 content-section outline-2"
                aria-describedby="description-error"
                {...register('description', { required: true })}
              />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {errors?.description && (
                <p className="mt-2 text-sm text-fill-danger">
                  Please enter the description
                </p>
              )}
            </div>
          </div>
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
          disabled={!isValid}
        >
          {id ? 'edit course' : 'create course'}
        </Button>
      </div>
    </form>
  );
};

export default Form;
