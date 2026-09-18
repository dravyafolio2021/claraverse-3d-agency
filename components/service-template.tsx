import { ArrowDownRight, ArrowUpRight, Check } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type ServiceTemplateProps = {
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

export function ServiceTemplate(props: ServiceTemplateProps) {
  return (
    <main className="inner-page" style={{ '--service-accent': props.accent } as React.CSSProperties}>
      <SiteHeader light />
      <section className="service-hero">
        <div className="service-hero-index">Service / {props.index}</div>
        <div className="service-hero-copy">
          <p>{props.eyebrow}</p>
          <h1>{props.title}<br /><em>{props.italic}</em></h1>
          <div className="service-hero-bottom">
            <p>{props.description}</p>
            <a href="#service-detail">Understand the system <ArrowDownRight size={22} /></a>
          </div>
        </div>
        <div className="service-visual" aria-hidden="true">
          <span /><span /><span /><i />
        </div>
      </section>

      <section className="service-thesis" id="service-detail">
        <div className="section-index">The point of view</div>
        <p>{props.thesis}</p>
      </section>

      <section className="outcomes-section">
        <div className="section-index">Designed to move</div>
        <div className="outcomes-list">
          {props.outcomes.map((outcome, index) => (
            <article key={outcome.label}>
              <span>0{index + 1}</span>
              <h2>{outcome.label}</h2>
              <p>{outcome.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="deliverables-section">
        <div>
          <p className="section-kicker">What we own</p>
          <h2>Senior direction.<br />Hands-on delivery.</h2>
        </div>
        <ul>
          {props.deliverables.map((item) => (
            <li key={item}><Check size={16} />{item}</li>
          ))}
        </ul>
      </section>

      <section className="service-process">
        <div className="section-index light">How it moves</div>
        <div className="service-process-grid">
          {props.steps.map((step, index) => (
            <article key={step.title}>
              <span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-cta">
        <p className="section-kicker">One useful conversation</p>
        <h2>Let’s find the constraint<br />that matters most.</h2>
        <a href="/start">Book a growth audit <ArrowUpRight size={28} /></a>
      </section>
      <SiteFooter />
    </main>
  );
}
