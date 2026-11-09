import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import 'lenis/dist/lenis.css';
import '@heycora/next/styles.css';
import './globals.css';
import {SmoothScroll} from '@/components/SmoothScroll';
import {SiteHeader} from '@/components/SiteHeader';

const displayFont=localFont({src:'../public/fonts/unbounded-latin.woff2',variable:'--font-display-local',weight:'400 500',display:'swap',preload:true});

export const metadata: Metadata = {
  metadataBase: new URL('https://claraverse.in'),
  title: 'claraverse — premium ecommerce intelligence agency',
  description: 'Premium Shopify ecommerce intelligence for Beauty, Fashion, Wellness and Petcare. Connected design, commerce architecture, operations and integrations.',
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#080d0b', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Grammarly can add attributes to body before hydration. This is shallow:
  // mismatches in the application's children are still checked normally.
  return <html lang="en" data-scroll-behavior="smooth" className={displayFont.variable}><body suppressHydrationWarning><SmoothScroll/><SiteHeader/>{children}</body></html>;
}
