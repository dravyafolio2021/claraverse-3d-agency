import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Shopify Development, Optimization & Management | Claraverse',
  description: 'One ongoing team to design, engineer and manage your Shopify store. Storefront optimization, integrations, maintenance and Shopify Plus expertise for established brands.',
  openGraph: { type: 'website', siteName: 'Claraverse', title: 'Your Shopify store. Working better.', description: 'Development, optimization and ongoing management for established Shopify brands.' },
  twitter: { card: 'summary_large_image', title: 'Your Shopify store. Working better.', description: 'Your ongoing Shopify development and commerce operations team.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={GeistSans.variable}><a href="#main-content" className="skip-link">Skip to content</a>{children}</body></html>;
}
