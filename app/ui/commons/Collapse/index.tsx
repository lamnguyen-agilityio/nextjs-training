'use client';

import { useState, ReactNode, isValidElement, Children } from 'react';

interface Props {
  content: ReactNode;
  maxLength: number;
  showLessText?: string;
  showMoreText?: string;
}

const Collapse = ({
  content,
  maxLength,
  showLessText = '- see less',
  showMoreText = '+ see more',
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childContent = isValidElement(content)
    ? content.props.children
    : content;

  const truncatedContent = Children.toArray(childContent).slice(0, maxLength);
  const isTruncated = Children.count(childContent) > maxLength;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return isTruncated ? (
    <>
      {isExpanded ? content : truncatedContent}
      <span
        onClick={toggleExpand}
        className="cursor-pointer text-base text-active-primary capitalize"
      >
        {isExpanded ? showLessText : showMoreText}
      </span>
    </>
  ) : (
    content
  );
};

export default Collapse;
