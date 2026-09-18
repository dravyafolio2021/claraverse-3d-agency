import { ArrowUpRight } from 'lucide-react';

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <nav className={`topbar inner-header${light ? ' on-dark' : ''}`} aria-label="Primary navigation">
      <a className="brand" href="/" aria-label="Claraverse home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>CLARAVERSE</span>
      </a>
      <div className="nav-links">
        <a href="/#expertise">Expertise</a>
        <a href="/#work">Approach</a>
        <a href="/insights">Insights</a>
      </div>
      <a className="nav-cta" href="/start">
        Start a project <ArrowUpRight size={15} strokeWidth={1.8} />
      </a>
    </nav>
  );
}
