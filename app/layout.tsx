import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';

// Components
import { Header, SideNav } from '@/app/ui/commons';

// Fonts
import { inter } from '@/app/ui/themes/fonts';

// Providers
import { BreadcrumbProvider } from './lib/contexts/breadcrumb';

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
        <BreadcrumbProvider>
          <main className="flex flex-col bg-fill-background md:flex-row">
            <div className="w-full flex-none md:w-80">
              <SideNav />
            </div>
            <div className="flex-grow">
              <Suspense>
                <Header />
              </Suspense>
              {children}
            </div>
          </main>
        </BreadcrumbProvider>
      </body>
    </html>
  );
};

export default RootLayout;
