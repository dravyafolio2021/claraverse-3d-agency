import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Insights — Claraverse',
  description: 'Practical thinking on performance media, creative systems and conversion for ecommerce operators.',
};

const insights = [
  { tag: 'Creative systems', title: 'Why your next growth hire might be a creative operating system.', read: '7 min', color: '#ff775e' },
  { tag: 'Performance', title: 'ROAS is a report. Contribution margin is a decision.', read: '6 min', color: '#d5ff62' },
  { tag: 'Commerce', title: 'The product page is where acquisition strategy becomes visible.', read: '8 min', color: '#7167e8' },
  { tag: 'International', title: 'Global media, local trust: what actually changes market to market.', read: '9 min', color: '#50c8ff' },
];

export default function InsightsPage() {
  return (
    <main className="insights-page">
      <SiteHeader />
      <header className="insights-header">
        <div className="section-index">Intelligence / 2026</div>
        <p className="section-kicker">For ecommerce operators</p>
        <h1>Useful ideas.<br /><em>No content theatre.</em></h1>
      </header>
      <section className="insight-grid">
        {insights.map((insight, index) => (
          <article key={insight.title} style={{ '--article-color': insight.color } as React.CSSProperties}>
            <div><span>0{index + 1}</span><span>{insight.tag}</span></div>
            <h2>{insight.title}</h2>
            <p>{insight.read} read</p>
            <ArrowUpRight size={22} />
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
