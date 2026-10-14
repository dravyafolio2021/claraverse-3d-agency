import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import type { ServiceContent } from '@/lib/services';
import { SITE_URL } from '@/lib/site';

type LegacyServiceProps = {
  index: string;
  accent: string;
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  thesis: string;
  outcomes: { label: string; copy: string }[];
  deliverables: string[];
  steps: { title: string; copy: string }[];
};

type ServiceTemplateProps = { service: ServiceContent } | LegacyServiceProps;

export function ServiceTemplate(props: ServiceTemplateProps) {
  if (!('service' in props)) return <SupportingService {...props} />;
  const service = props.service;

  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: service.label, item: SITE_URL + service.href }] }) }} />
        <header className="page-intro">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/#services">Services</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{service.label}</span>
          </nav>
          <p className="eyebrow">{service.label}</p>
          <h1 className="display-title">{service.title}</h1>
          <p className="muted narrow">{service.description}</p>
          <div className="page-actions">
            <Link className="primary-button" href="/start">Request an efficiency review <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#service-scope">Explore the scope <span aria-hidden="true">↓</span></a>
          </div>
        </header>

        <section className="section grid-two" aria-labelledby="service-fit">
          <div><p className="section-label">Who it helps</p><h2 id="service-fit" className="section-heading">For the store you already run.</h2></div>
          <div className="prose"><p>{service.audience}</p><p className="muted">{service.problem}</p></div>
        </section>

        <section className="section" aria-labelledby="service-outcomes">
          <p className="section-label">What the work is designed to improve</p>
          <h2 id="service-outcomes" className="section-heading">A better way to operate.</h2>
          <div className="grid-three">
            {service.outcomes.map((item, index) => (
              <article className="numbered-card" key={item.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3><p className="muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section grid-two" id="service-scope" aria-labelledby="service-deliverables">
          <div><p className="section-label">The agreed scope</p><h2 id="service-deliverables" className="section-heading">What we deliver.</h2><p className="muted">A clear set of work, shaped around your store and priorities.</p></div>
          <dl className="service-detail-list">
            {service.deliverables.map((item) => <div key={item.title}><dt>{item.title}</dt><dd className="muted">{item.copy}</dd></div>)}
          </dl>
        </section>

        <section className="section" aria-labelledby="service-cycle">
          <p className="section-label">How the work moves</p><h2 id="service-cycle" className="section-heading">One improvement informs the next.</h2>
          <div className="process-grid">
            {service.cycle.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p className="muted">{step.copy}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/approach">See the working relationship <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="section" aria-labelledby="service-ownership">
          <p className="section-label">Clear responsibilities</p><h2 id="service-ownership" className="section-heading">Everyone knows what they own.</h2>
          <div className="grid-three">
            <article className="numbered-card"><h3>Our part</h3><p className="muted">{service.responsibilities.ours}</p></article>
            <article className="numbered-card"><h3>Your part</h3><p className="muted">{service.responsibilities.yours}</p></article>
            <article className="numbered-card"><h3>Agreed separately</h3><p className="muted">{service.responsibilities.boundaries}</p></article>
          </div>
        </section>

        <section className="section grid-two" aria-labelledby="service-faq">
          <div><p className="section-label">Before we begin</p><h2 id="service-faq" className="section-heading">Useful questions.</h2></div>
          <div className="faq-list">
            {service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p className="muted">{faq.answer}</p></details>)}
            {service.sources ? <div className="prose"><p className="eyebrow">Platform references · checked 14 October 2026</p><ul>{service.sources.map((source) => <li key={source.href}><a className="text-link" href={source.href}>{source.title} <span aria-hidden="true">↗</span></a></li>)}</ul></div> : null}
          </div>
        </section>

        <section className="section grid-two" aria-labelledby="service-reading">
          <div><p className="section-label">A useful place to start</p><h2 id="service-reading" className="section-heading">Take a closer look.</h2></div>
          <article className="numbered-card"><h3><Link href={service.article.href}>{service.article.title}</Link></h3><p className="muted">{service.article.copy}</p><Link className="text-link" href={service.article.href}>Read the guide <span aria-hidden="true">↗</span></Link></article>
        </section>

        <section className="page-cta section">
          <p className="section-label">Your next improvement</p><h2 className="section-heading">Start with the constraint.</h2>
          <p className="muted narrow">Tell us about your store and the work that keeps getting in the way. We will review the fit and help define a useful next step.</p>
          <Link className="primary-button" href="/start">Request an efficiency review <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SupportingService(props: LegacyServiceProps) {
  return <div className="page-shell"><SiteHeader /><main id="main-content">
    <header className="page-intro"><p className="eyebrow">Supporting expertise / {props.eyebrow}</p><h1 className="display-title">{props.title}<br /><em>{props.italic}</em></h1><p className="muted narrow">{props.description}</p><Link className="primary-button" href="/start">Discuss your brand <span aria-hidden="true">↗</span></Link></header>
    <section className="section grid-two"><div><p className="section-label">Connected to commerce</p><h2 className="section-heading">Work around the business.</h2></div><p className="muted">{props.thesis}</p></section>
    <section className="section"><p className="section-label">The priorities</p><div className="grid-three">{props.outcomes.map(item => <article className="numbered-card" key={item.label}><h3>{item.label}</h3><p className="muted">{item.copy}</p></article>)}</div></section>
    <section className="section grid-two"><div><p className="section-label">The scope</p><h2 className="section-heading">Direction and delivery.</h2></div><ul className="checklist">{props.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section className="section"><p className="section-label">The working cycle</p><div className="process-grid">{props.steps.map((step,index) => <article className="process-step" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
    <section className="page-cta section"><h2 className="section-heading">Connect the work to your store.</h2><p className="muted narrow">We agree the scope, commercial priorities and measurement before the engagement begins.</p><Link className="primary-button" href="/start">Start a conversation <span aria-hidden="true">↗</span></Link></section>
  </main><SiteFooter /></div>;
}
