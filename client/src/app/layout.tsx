import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChatBox from '@/components/common/ChatBox';
import ClientWrapper from '@/components/ClientWrapper';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobsPortal - Your Career Starts Here',
  description: 'Find your dream job with JobsPortal. Browse thousands of job listings from top companies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper>
            <div className='min-h-screen flex flex-col'>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatBox />
            </div>
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
