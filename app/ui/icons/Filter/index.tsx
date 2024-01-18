import { SVGProps } from 'react';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.21036 6.5179V10.2349C8.21036 10.3686 8.13715 10.4908 8.02126 10.5506L5.28469 11.9623C5.05725 12.0796 4.78964 11.909 4.78964 11.6466V6.5179L0.0779714 0.576415C-0.104769 0.345978 0.0541396 0 0.34272 0H12.6573C12.9459 0 13.1048 0.345978 12.922 0.576415L8.21036 6.5179Z" />
    </svg>
  );
};

export { FilterIcon };
