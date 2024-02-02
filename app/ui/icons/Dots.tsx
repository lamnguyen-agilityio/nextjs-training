import { SVGProps } from 'react';

export const DotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="4"
    height="13"
    viewBox="0 0 4 13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z" />
    <path d="M1 7C1 7.55228 1.44772 8 2 8C2.55228 8 3 7.55228 3 7C3 6.44772 2.55228 6 2 6C1.44772 6 1 6.44772 1 7Z" />
    <path d="M1 12C1 12.5523 1.44772 13 2 13C2.55228 13 3 12.5523 3 12C3 11.4477 2.55228 11 2 11C1.44772 11 1 11.4477 1 12Z" />
  </svg>
);
