import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import 'lenis/dist/lenis.css';
import './globals.css';
import {SmoothScroll} from '@/components/SmoothScroll';

const bodyFont=localFont({src:'../public/fonts/inter-latin.woff2',variable:'--font-body-local',weight:'400 500',display:'swap',preload:true});
const displayFont=localFont({src:'../public/fonts/unbounded-latin.woff2',variable:'--font-display-local',weight:'400 500',display:'swap',preload:true});

export const metadata: Metadata = {
  metadataBase: new URL('https://claraverse.in'),
  title: 'claraverse — premium ecommerce intelligence agency',
  description: 'Premium ecommerce intelligence agency. Commerce architecture, Shopify Plus, connected operations, systems integration and automation across markets.',
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#080d0b', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Grammarly can add attributes to body before hydration. This is shallow:
  // mismatches in the application's children are still checked normally.
  return <html lang="en" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable}`}><body suppressHydrationWarning><SmoothScroll/>{children}</body></html>;
}
