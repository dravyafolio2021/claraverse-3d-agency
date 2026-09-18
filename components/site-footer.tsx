import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Image className="footer-logo" src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} />
      </div>
      <p>Founder-focused Shopify growth systems for fashion & skincare DTC.</p>
      <div className="footer-links">
        <Link href="/services/performance-marketing">Performance</Link>
        <Link href="/services/ai-creative">AI creative</Link>
        <Link href="/services/cro-commerce">CRO commerce</Link>
        <Link href="/insights">Insights</Link>
        <a href="mailto:hello@claraverse.in">hello@claraverse.in</a>
      </div>
      <div className="footer-bottom">
        <span>Working globally</span>
        <span>© {new Date().getFullYear()} Claraverse</span>
      </div>
    </footer>
  );
}
