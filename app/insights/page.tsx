import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  alternates: { canonical: '/insights' },
  title: 'Shopify Insights for Established Brands — Claraverse',
  description: 'Practical Shopify guides for commerce teams: review store health, simplify the app stack and choose useful improvements. Full articles, freely available.',
};

const articles = [
  {
    title: 'A practical Shopify store health check',
    href: '/insights/shopify-store-health-check',
    category: 'Store operations',
    description: 'Five checks for product discovery, mobile usability, purchase paths, operational handoffs and measurement. Turn findings into a useful action list.',
  },
  {
    title: 'How to review your Shopify app stack',
    href: '/insights/shopify-app-stack-review',
    category: 'Commerce systems',
    description: 'Map what each tool does, who depends on it and what it costs to maintain. Plan changes around the workflow, including a safe removal process.',
  },
];

export default function InsightsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <header className="page-intro">
          <p className="eyebrow">For the people running the store</p>
          <h1 className="display-title">Useful work starts with a better question.</h1>
          <p className="muted narrow">Practical guides to understand your Shopify operation and choose the next improvement. Read them here and use them with your team.</p>
        </header>
        <section className="section grid-two" aria-label="Shopify guides">
          {articles.map((article, index) => (
            <article className="numbered-card" key={article.href}>
              <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {article.category}</p>
              <h2><Link href={article.href}>{article.title}</Link></h2>
              <p className="muted">{article.description}</p>
              <p className="eyebrow">Updated <time dateTime="2026-10-14">14 October 2026</time></p>
              <Link className="text-link" href={article.href}>Read the complete guide <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </section>
        <section className="section grid-two">
          <div><p className="section-label">From understanding to delivery</p><h2 className="section-heading">Give the next improvement an owner.</h2></div>
          <div className="prose"><p className="muted">A guide can help you find a constraint. Our ongoing work connects that finding to an agreed scope, implementation and release.</p><Link className="text-link" href="/approach">See how we work <span aria-hidden="true">↗</span></Link></div>
        </section>
        <section className="page-cta section">
          <p className="section-label">Your store, your priorities</p><h2 className="section-heading">What keeps getting in the way?</h2>
          <p className="muted narrow">Share your store and the main constraint. We will review the fit and discuss a practical next step.</p>
          <Link className="primary-button" href="/start">Request an efficiency review <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
