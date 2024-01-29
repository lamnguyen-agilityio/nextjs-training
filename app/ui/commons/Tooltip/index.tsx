import { ReactNode } from 'react';

interface Props {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip = ({ content, children }: Props) => {
  return (
    <div className="text-center m-10">
      <div className="relative inline-block tooltip">
        {children}
        <p className="tooltip-text">{content}</p>
      </div>
    </div>
  );
};

export default Tooltip;
