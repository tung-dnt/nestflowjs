import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { baseMetadata } from '@/lib/metadata';
import { GlobalStructuredData } from '@/components/structured-data';
import './global.css';

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: '/img/logo.jpeg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GlobalStructuredData />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
