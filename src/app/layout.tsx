import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import { NavBar } from '@/components/layout/nav-bar';
import { Providers } from '@/components/providers';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'calidevs — Branding Studio',
  description: 'Brand assets, templates, and content studio for calidevs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmSerif.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Providers>
          <NavBar />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
