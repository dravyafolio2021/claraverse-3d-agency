import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <nav className={`topbar inner-header${light ? ' on-dark' : ''}`} aria-label="Primary navigation">
      <a className="brand" href="/" aria-label="Claraverse home">
        <Image className="brand-logo" src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} />
      </a>
      <div className="nav-links">
        <a href="/#expertise">Expertise</a>
        <a href="/#work">Selected work</a>
        <a href="/insights">Insights</a>
      </div>
      <a className="nav-cta" href="/start">
        Start a project <ArrowUpRight size={15} strokeWidth={1.8} />
      </a>
    </nav>
  );
}
