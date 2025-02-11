import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { Header } from '@/components/universal/Header';
import { Footer } from '@/components/universal/Footer';
import { ViewTransitions } from 'next-view-transitions';
import { Box } from '@chakra-ui/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Abia-stem LMS',
  description:
    'Abia-stem LMS is a online learning platform where you can learn from professional tutors from anywhere in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <Provider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
          >
            <Header />
            <Box mx={'auto'} width={{ base: '90%', md: '80%', lg: '70%' }}>
              <main className="min-h-screen">{children}</main>
              <Footer />
            </Box>
          </body>
        </Provider>
      </html>
    </ViewTransitions>
  );
}
