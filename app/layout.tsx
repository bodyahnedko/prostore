import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/assets/styles/globals.css';

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prostore',
  description: 'NextJs app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontInter.variable} antialiased`}>{children}</body>
    </html>
  );
}
