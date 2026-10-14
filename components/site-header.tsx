import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';

export function SiteHeader({ light = false, home = false }: { light?: boolean; home?: boolean }) {
  return (
    <header className={`site-header${home ? ' home-header' : ''}${light ? ' light-header' : ''}`}>
      <Link className="brand" href="/" aria-label="Claraverse home">
        <Image src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/services/shopify-management">Expertise</Link>
        <Link href="/approach">Our approach</Link>
        <Link href="/insights">Insights</Link>
      </nav>
      <Link className="header-cta" href="/start">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><Menu size={21} aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/services/shopify-management">Shopify management</Link>
          <Link href="/services/storefront-conversion">Storefront & conversion</Link>
          <Link href="/services/integrations-automation">Integrations & automation</Link>
          <Link href="/services/shopify-plus">Shopify Plus</Link>
          <Link href="/approach">Our approach</Link>
          <Link href="/insights">Useful insights</Link>
          <Link href="/start">Let’s improve your store ↗</Link>
        </nav>
      </details>
    </header>
  );
}
