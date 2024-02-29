import { SVGProps } from 'react';

export const CompletedCourseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 2H7.5C5.567 2 4 3.567 4 5.5V19.5C4 21.433 5.567 23 7.5 23H17.5C19.433 23 21 21.433 21 19.5V5.5C21 3.567 19.433 2 17.5 2ZM5 5.5C5 4.11929 6.11929 3 7.5 3H17.5C18.8807 3 20 4.11929 20 5.5V19.5C20 20.8807 18.8807 22 17.5 22H7.5C6.11929 22 5 20.8807 5 19.5V5.5Z"
      />
    </svg>
  );
};
