import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  sortType: 'desc' | 'asc';
  active?: boolean;
}

const generateClassName = (active: boolean): string => {
  return active ? 'fill-active-primary' : 'fill-active-text-dark';
};

export const SortIcon: React.FC<Props> = ({
  sortType,
  active = false,
  ...props
}) => (
  <svg
    width="10"
    height="13"
    viewBox="0 0 10 13"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.58579 5C8.47669 5 8.92286 3.92286 8.29289 3.29289L5.70711 0.707106C5.31658 0.316582 4.68342 0.316583 4.29289 0.707107L1.7071 3.29289C1.07714 3.92286 1.52331 5 2.41421 5L7.58579 5Z"
      className={generateClassName(active && sortType === 'asc')}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.41421 7.66663C1.52331 7.66663 1.07714 8.74377 1.70711 9.37373L4.29289 11.9595C4.68342 12.35 5.31658 12.35 5.70711 11.9595L8.2929 9.37373C8.92286 8.74377 8.47669 7.66663 7.58579 7.66663L2.41421 7.66663Z"
      className={generateClassName(active && sortType === 'desc')}
    />
  </svg>
);
