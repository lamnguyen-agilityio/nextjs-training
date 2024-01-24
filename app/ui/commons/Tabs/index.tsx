'use client';

import { useState, ReactNode } from 'react';
import clsx from 'clsx';

interface Tab {
  label: string;
  content: ReactNode;
}

interface Props {
  tabs: Tab[];
}

const Tabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="flex text-sm text-fill-text-main font-medium">
        {tabs.map((tab, index) => {
          const isActiveTab = activeTab === index;

          return (
            <div
              key={index}
              className={clsx(
                'cursor-pointer p-3 mr-7 transition-all transform',
                { 'pl-0': index === 0 },
                { 'text-fill-text-dark': isActiveTab }
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
              {isActiveTab && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-active-primary" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8">{tabs[activeTab].content}</div>
    </>
  );
};

export default Tabs;
