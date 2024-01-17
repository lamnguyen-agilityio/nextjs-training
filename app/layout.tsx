import { ReactNode } from 'react';
import { Metadata } from 'next';

// Components
import SideNav from '@/app/ui/commons/SideNav';
import Header from '@/app/ui/commons/Header';

// Fonts
import { inter } from '@/app/ui/themes/fonts';

import '@/app/ui/themes/global.css';

export const metadata: Metadata = {
  title: 'E-Studies',
  description: 'A versatile app that helps you learn everything yourself',
  metadataBase: new URL('http://localhost:3000'),
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <main className="h-screen flex flex-col bg-fill-background md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-80">
            <SideNav />
          </div>
          <div className="flex-grow">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
