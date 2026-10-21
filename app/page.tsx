import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Layers, Workflow, MousePointer2 } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CommerceExperience } from '@/components/commerce-experience';
import { MarketContext } from '@/components/market-context';
import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const capabilities = [
  { number: '01', label: 'Keep things moving', title: ['Management', '& support'], copy: 'A clear backlog. An accountable team. Ongoing development and maintenance that keep your store moving.', href: '/services/shopify-management', icon: Layers },
  { number: '02', label: 'Make buying easier', title: ['Storefront', '& conversion'], copy: 'Thoughtful design and precise engineering, from product discovery to a confident checkout.', href: '/services/storefront-conversion', icon: MousePointer2 },
  { number: '03', label: 'Connect the operation', title: ['Integrations', '& automation'], copy: 'Bring your inventory, fulfilment and customer systems together. Reduce the work between them.', href: '/services/integrations-automation', icon: Workflow },
  { number: '04', label: 'Build for what’s next', title: ['Plus', '& expansion'], copy: 'Deeper checkout, wholesale and international capabilities when your business is ready for them.', href: '/services/shopify-plus', icon: ArrowUpRight },
];

const checks = [
  ['Does checkout work through every payment path?', 'Test the payment methods your customers actually use, on supported devices. Follow failed and pending payments through confirmation and fulfilment. A payment icon alone does not tell you whether the journey works.'],
  ['Does your mobile product page answer buying questions?', 'Check variants, sizing or ingredients, delivery, returns and the purchase action on a small screen. Prioritise improvements using real customer questions and observed behaviour.'],
  ['Which apps create value—and which add complexity?', 'List each app’s job, owner, recurring cost and impact on the storefront. Look for overlapping functions and recurring failures before replacing or removing anything.'],
  ['Where does your team repeat work by hand?', 'Follow one order from payment to dispatch and one product update from source to storefront. Find duplicate entry and exceptions. Define the right data and an owner before automating.'],
  ['Can you explain and verify your last release?', 'Look for a preview, approval record, mobile and payment checks, a rollback plan and post-release observation. Clear release ownership is often the most useful first improvement.'],
];

export default function Home() {
  return (
    <main id="main-content" className="home-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Claraverse', url: SITE_URL, logo: `${SITE_URL}/brand/claraverse-logo.svg`, description: 'Shopify development, optimization and ongoing management for established ecommerce brands.', email: 'hello@claraverse.in' }) }} />
      <SiteHeader home />
      <CommerceExperience>
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" /> Your ecommerce intelligence agency</p>
          <h1>Commerce intelligence.<br /><em>Built into the operation.</em></h1>
          <p className="hero-deck">We connect the architecture behind your business. Shopify, operations, integrations and intelligence — working as one, across every market.</p>
          <div className="hero-actions"><Link className="primary-button" href="/start">Let’s connect your operation <ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="text-link" href="#commerce-network">Explore connected commerce <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </CommerceExperience>

      <section className="section opening-section" id="expertise">
        <p className="section-label">01 / A better way to run commerce</p>
        <h2 className="section-heading">Your store has a roadmap.<br /><em>Let’s make it happen.</em></h2>
        <p className="section-deck">Your next improvement should not get lost between an app, an agency and a developer. We bring the thinking and the execution together, so someone owns the whole journey.</p>
        <div className="principle-row"><span><Check size={15} aria-hidden="true" /> Clear priorities</span><span><Check size={15} aria-hidden="true" /> Hands-on engineering</span><span><Check size={15} aria-hidden="true" /> Tested releases</span><span><Check size={15} aria-hidden="true" /> Ongoing improvement</span></div>
      </section>

      <section className="section capabilities-section" id="services">
        <div className="section-topline"><p className="section-label">02 / Connected expertise</p><span>One platform. Every part of the operation.</span></div>
        <div className="capability-grid">{capabilities.map(item => <Link className="capability-card" href={item.href} key={item.number}><div className="capability-top"><span>{item.number}</span><item.icon size={24} strokeWidth={1.25} aria-hidden="true" /></div><p className="eyebrow">{item.label}</p><h3>{item.title.map((line, index) => <span key={line}>{index > 0 ? <br /> : null}{line}</span>)}</h3><p className="capability-description">{item.copy}</p><span className="card-link">Explore this expertise <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div>
      </section>

      <section className="section experience-section" id="work">
        <div className="section-topline"><p className="section-label">03 / Experience behind the work</p><span>Shopify & Shopify Plus</span></div>
        <div className="experience-heading"><h2 className="section-heading">Built where commerce<br /><em>gets complex.</em></h2><div><p>Our delivery experience includes established Shopify and Plus stores, often as the technical team behind an agency partnership.</p><p>We bring that experience into the details that matter: a dependable storefront, connected systems and changes that your team can confidently approve.</p><Link className="text-link" href="/approach">Meet our way of working <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>
        <div className="practice-grid">
          <article className="practice-card"><div className="practice-visual storefront-visual" aria-hidden="true"><div className="mini-product"><div className="product-art"><span /><span /></div><div><i /><i /><i /><b /></div></div><span className="visual-caption">Product experience</span></div><p className="eyebrow">Customer-facing engineering</p><h3>Good design.<br />Better buying decisions.</h3><p>Theme development, merchandising and mobile journeys that help customers understand the product and move forward.</p></article>
          <article className="practice-card"><div className="practice-visual operations-visual" aria-hidden="true"><span className="system-node">Shopify</span><i /><div><span className="system-node">Inventory</span><span className="system-node">Fulfilment</span><span className="system-node">Customers</span></div><span className="visual-caption">Connected workflows</span></div><p className="eyebrow">Operational thinking</p><h3>Less passing work.<br />More joined-up systems.</h3><p>Integrations and automation scoped around how your business actually handles products, orders and customer information.</p></article>
          <article className="practice-card"><div className="practice-visual release-visual" aria-hidden="true"><span><i /> Prioritise the change</span><span><i /> Preview & test</span><span><i /> Approve & release</span><span className="visual-caption">An accountable process</span></div><p className="eyebrow">Delivery through partnerships</p><h3>Clear ownership.<br />From brief to release.</h3><p>Work alongside your commercial team and existing agency, with a shared roadmap and a deliberate release process.</p></article>
        </div>
        <p className="experience-note">Illustrative system views · Delivery experience includes work through agency partnerships.</p>
      </section>

      <MarketContext />

      <section className="section rhythm-section">
        <p className="section-label">05 / The way we work</p><h2 className="section-heading">Senior thinking.<br /><em>Steady momentum.</em></h2><p className="section-deck">A useful roadmap is only the beginning. We take each priority through the decisions, testing and follow-through it needs.</p>
        <ol className="process-grid">{[['Understand', 'Start with the store, the systems and the business constraint.'], ['Prioritise', 'Agree what matters, what comes next and who owns the decision.'], ['Build & release', 'Design, engineer, test and get approval before a change goes live.'], ['Review & improve', 'Look at the evidence, resolve exceptions and choose the next move.']].map(([title, copy], index) => <li className="process-step" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        <Link className="text-link" href="/approach">Understand the operating model <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>

      <section className="section value-section" id="store-check">
        <div><p className="section-label">06 / Start with something useful</p><h2 className="section-heading">Five checks.<br /><em>A clearer next move.</em></h2><p className="section-deck">A practical starting point for your existing Shopify store. Read it, use it and bring us the questions worth solving.</p><span className="quiet-tag">No email required</span></div>
        <div className="checklist">{checks.map(([title, copy], index) => <details key={title}><summary><span className="check-number">0{index + 1}</span><span>{title}</span><span className="check-plus" aria-hidden="true" /></summary><p>{copy}</p></details>)}<Link className="text-link" href="/insights/shopify-store-health-check">Read the full store-health guide <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </section>

      <section className="section insights-section" id="insights"><div className="section-topline"><p className="section-label">07 / Thinking for operators</p><Link className="text-link" href="/insights">All insights <ArrowRight size={16} aria-hidden="true" /></Link></div><div className="grid-two"><Link className="insight-card" href="/insights/shopify-store-health-check"><span className="eyebrow">Store operations</span><h3>Where to start when your Shopify store needs to work better.</h3><span className="card-link">Read the guide <ArrowUpRight size={17} aria-hidden="true" /></span></Link><Link className="insight-card" href="/insights/shopify-app-stack-review"><span className="eyebrow">Apps & integrations</span><h3>Before you add another app, review the stack you already have.</h3><span className="card-link">Read the guide <ArrowUpRight size={17} aria-hidden="true" /></span></Link></div></section>

      <section className="section closing-section"><p className="section-label">A useful next conversation</p><h2>Let’s make your store<br /><em>work better.</em></h2><p>Tell us what is getting in the way. We’ll start with the right questions.</p><Link className="primary-button" href="/start">Talk about your Shopify store <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
      <SiteFooter />
    </main>
  );
}
