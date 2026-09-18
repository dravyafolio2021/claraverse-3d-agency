export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">C</span>
        <strong>CLARAVERSE</strong>
      </div>
      <p>Growth systems for fashion & skincare ecommerce.</p>
      <div className="footer-links">
        <a href="/services/performance-marketing">Performance</a>
        <a href="/services/ai-creative">AI creative</a>
        <a href="/services/cro-commerce">CRO commerce</a>
        <a href="/insights">Insights</a>
      </div>
      <div className="footer-bottom">
        <span>Working globally</span>
        <span>© {new Date().getFullYear()} Claraverse</span>
      </div>
    </footer>
  );
}
