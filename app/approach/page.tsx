import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  alternates: { canonical: '/approach' },
  title: 'How We Work — Claraverse',
  description: 'A clear working cycle for ongoing Shopify development: understand the store, prioritize, design and build, check and release, then review what comes next.',
};

const cycle = [
  { title: 'Understand the store', copy: 'Start with the business priorities, the buying journey and the operational work taking time from your team. Review the existing theme, apps, integrations and available measurement.' },
  { title: 'Choose the next priority', copy: 'Turn findings into an agreed backlog. Define the problem, the proposed work, its dependencies and how you will decide whether it helped.' },
  { title: 'Design and build', copy: 'Work within the store’s architecture and plan. Use a preview for feedback and keep the changes maintainable for the people who will use them.' },
  { title: 'Check and release', copy: 'Test the affected purchase and operating paths, resolve feedback and get approval. Record the release and prepare an appropriate recovery option.' },
  { title: 'Review and continue', copy: 'Discuss what shipped, what changed and what remains uncertain. Use that evidence and your business calendar to choose the next improvement.' },
];

export default function ApproachPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <header className="page-intro">
          <p className="eyebrow">The working relationship</p>
          <h1 className="display-title">Progress with a clear owner.</h1>
          <p className="muted narrow">An established Shopify store needs steady attention. We connect the roadmap, the implementation and the release process so the next improvement has somewhere to go.</p>
          <Link className="primary-button" href="/start">Request an efficiency review <span aria-hidden="true">↗</span></Link>
        </header>

        <section className="section grid-two" aria-labelledby="approach-first">
          <div><p className="section-label">A useful starting point</p><h2 id="approach-first" className="section-heading">Bring us the constraint.</h2></div>
          <div className="prose"><p>A slow change queue, a difficult product journey or a recurring manual task is enough to start a conversation. You do not need to arrive with a technical specification.</p><p className="muted">We review the fit first. Any deeper discovery, access, deliverables, capacity and commercial terms are agreed before the work begins. The initial request is a conversation about your store, not an automatic scan or a booked appointment.</p></div>
        </section>

        <section className="section" aria-labelledby="approach-cycle">
          <p className="section-label">Our operating cycle</p><h2 id="approach-cycle" className="section-heading">A roadmap that learns as it moves.</h2>
          <div className="process-grid">{cycle.map((step, index) => <article className="process-step" key={step.title}><span className="eyebrow">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p className="muted">{step.copy}</p></article>)}</div>
        </section>

        <section className="section grid-two" aria-labelledby="approach-scope">
          <div><p className="section-label">Before delivery</p><h2 id="approach-scope" className="section-heading">Define the agreement.</h2><p className="muted">Clear scope makes an ongoing relationship easier to run.</p></div>
          <ul className="checklist">
            <li><strong>Work and capacity.</strong> The tasks included, priorities, available capacity and how additional work is assessed.</li>
            <li><strong>People and approvals.</strong> Your decision-maker, our delivery responsibilities and the other teams or vendors involved.</li>
            <li><strong>Communication and support.</strong> Where requests live, when work is reviewed, coverage arrangements and how an urgent issue is raised.</li>
            <li><strong>Access and ownership.</strong> Necessary permissions, repositories, accounts, documentation and the ownership of ongoing services.</li>
            <li><strong>Measurement and releases.</strong> Acceptance criteria, testing, approval, release notes and the evidence to review afterward.</li>
          </ul>
        </section>

        <section className="section" aria-labelledby="approach-models">
          <p className="section-label">Fit the way you work</p><h2 id="approach-models" className="section-heading">One team, or part of yours.</h2>
          <div className="grid-three">
            <article className="numbered-card"><h3>Ongoing improvement</h3><p className="muted">For a store with a continuing queue of development, maintenance and optimization work. The backlog and capacity are agreed around the business priorities.</p></article>
            <article className="numbered-card"><h3>A defined project</h3><p className="muted">For a specific change such as a storefront refresh or a scoped integration. Discovery, deliverables, dependencies and acceptance criteria define the project.</p></article>
            <article className="numbered-card"><h3>Working through a partner</h3><p className="muted">For an agency or existing delivery team that needs Shopify support. We agree the contribution, communication and release ownership within the wider team.</p></article>
          </div>
        </section>

        <section className="section grid-two" aria-labelledby="approach-evidence">
          <div><p className="section-label">Experience, accurately described</p><h2 id="approach-evidence" className="section-heading">The contribution matters.</h2></div>
          <div className="prose"><p>Our delivery experience includes Shopify work through agency partnerships. On those projects, our contribution sits within a wider team and a partner’s client relationship.</p><p className="muted">We know how to work with the people already invested in your store. Clear responsibilities, shared priorities and a deliberate release process keep the whole team moving in the same direction.</p></div>
        </section>

        <section className="page-cta section"><p className="section-label">The next conversation</p><h2 className="section-heading">What would make your store easier to run?</h2><p className="muted narrow">Tell us where your team is spending time and what you want to improve. We will help define a practical starting point.</p><Link className="primary-button" href="/start">Request an efficiency review <span aria-hidden="true">↗</span></Link></section>
      </main>
      <SiteFooter />
    </div>
  );
}
