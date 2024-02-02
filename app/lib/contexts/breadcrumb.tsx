'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

// Interfaces
import { Breadcrumb } from '@/app/lib/interfaces';

interface BreadcrumbContextProps {
  breadcrumb: Breadcrumb[];
  updateBreadcrumb: (newBreadcrumb: Breadcrumb[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(
  undefined
);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([]);

  const updateBreadcrumb = useCallback((newBreadcrumb: Breadcrumb[]) => {
    setBreadcrumb(newBreadcrumb);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, updateBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): BreadcrumbContextProps => {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }

  return context;
};
