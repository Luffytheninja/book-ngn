import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Using Geist as "Inter-like" modern font
import './globals.css';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export const metadata: Metadata = {
  title: 'BookNGN | Fiscal Clarity',
  description: 'Modern bookkeeping and tax automation for Nigerians.',
  applicationName: 'BookNGN',
  formatDetection: {
    telephone: false,
  },
};

import { BookkeepingProvider } from '@/components/providers/BookkeepingContext';
import QueryProvider from '@/components/providers/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <QueryProvider>
          <BookkeepingProvider>{children}</BookkeepingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

