import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Link className="brand" href="/" aria-label="Claraverse home"><Image src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} /></Link><p>One team to make your<br />Shopify business work better.</p></div>
        <nav aria-label="Service navigation"><span>Our expertise</span><Link href="/services/shopify-management">Management & support</Link><Link href="/services/storefront-conversion">Storefront & conversion</Link><Link href="/services/integrations-automation">Integrations & automation</Link><Link href="/services/shopify-plus">Shopify Plus & expansion</Link></nav>
        <nav aria-label="Company navigation"><span>Get to know us</span><Link href="/approach">Our approach</Link><Link href="/insights">Insights</Link><Link href="/start">Start a conversation</Link><a href="mailto:hello@claraverse.in">hello@claraverse.in ↗</a></nav>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Claraverse</span><span>Shopify expertise. Global perspective.</span><Link href="/privacy">Privacy</Link></div>
    </footer>
  );
}
