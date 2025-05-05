import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

// Metadata can remain here since this is a server component
export const metadata: Metadata = {
  title: 'Graduation Management System',
  description: 'IYTE Graduation Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
