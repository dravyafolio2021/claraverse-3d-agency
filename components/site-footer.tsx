import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Image className="footer-logo" src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} />
      </div>
      <p>Founder-focused Shopify growth systems for fashion & skincare DTC.</p>
      <div className="footer-links">
        <a href="/services/performance-marketing">Performance</a>
        <a href="/services/ai-creative">AI creative</a>
        <a href="/services/cro-commerce">CRO commerce</a>
        <a href="/insights">Insights</a>
        <a href="mailto:hello@claraverse.in">hello@claraverse.in</a>
      </div>
      <div className="footer-bottom">
        <span>Working globally</span>
        <span>© {new Date().getFullYear()} Claraverse</span>
      </div>
    </footer>
  );
}
