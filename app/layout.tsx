import ConvexClientProvider from '@/components/ConvexProvider';
import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import { Toaster } from '@/components/ui/toaster';

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
      {/* <ConvexAuthNextjsServerProvider> */}
      <ConvexClientProvider>
        <html lang="en">
          <Provider>
            <NuqsAdapter>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
              >
                <main className="min-h-screen">{children}</main>
                <Toaster />
              </body>
            </NuqsAdapter>
          </Provider>
        </html>
      </ConvexClientProvider>
      {/* </ConvexAuthNextjsServerProvider> */}
    </ViewTransitions>
  );
}
