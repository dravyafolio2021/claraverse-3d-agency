import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <nav className={`topbar inner-header${light ? ' on-dark' : ''}`} aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label="Claraverse home">
        <Image className="brand-logo" src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} />
      </Link>
      <div className="nav-links">
        <Link href="/#expertise">Expertise</Link>
        <Link href="/#work">Selected work</Link>
        <Link href="/insights">Insights</Link>
      </div>
      <Link className="nav-cta" href="/start">
        Start a project <ArrowUpRight size={15} strokeWidth={1.8} />
      </Link>
    </nav>
  );
}
