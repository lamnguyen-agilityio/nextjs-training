import { ReactNode } from 'react';
import { Metadata } from 'next';

import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';

export const metadata: Metadata = {
  title: 'E-Studies',
  description: 'A versatile app that helps you learn everything yourself',
  metadataBase: new URL('http://localhost:3000'),
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
