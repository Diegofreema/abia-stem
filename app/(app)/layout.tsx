import { Footer } from '@/components/universal/Footer';
import { Header } from '@/components/universal/Header';
import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className={`antialiased bg-white min-h-screen`}>
      <Header />
      <Box pb={50}>
        <main className="min-h-screen">{children}</main>
      </Box>
      <Box borderWidth={1} borderStyle={'solid'} borderColor={colors.textGrey}>
        <Footer />
      </Box>
    </Box>
  );
}
