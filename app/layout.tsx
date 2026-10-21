import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://claraverse.in'),
  title: 'claraverse — premium ecommerce intelligence agency',
  description: 'Premium ecommerce intelligence agency. Commerce architecture, Shopify Plus, connected operations, systems integration and automation across markets.',
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#080d0b', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
