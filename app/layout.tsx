import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://claraverse-growth.dravyafolio.chatgpt.site'),
  title: 'Claraverse — Ecommerce Growth Systems',
  description:
    'Performance marketing, AI-powered creative and conversion-first commerce for ambitious fashion and skincare brands.',
  openGraph: {
    title: 'Claraverse — Global Ecommerce Growth Partner',
    description: 'Performance, creative and commerce for fashion and skincare brands.',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Claraverse global ecommerce growth partner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claraverse — Global Ecommerce Growth Partner',
    description: 'Performance, creative and commerce for fashion and skincare brands.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
