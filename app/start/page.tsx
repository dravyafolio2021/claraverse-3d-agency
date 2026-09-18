import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Start a Project — Claraverse',
  description: 'Tell Claraverse where ecommerce growth is stuck and start a focused conversation.',
};

export default function StartPage() {
  return (
    <main className="start-page">
      <SiteHeader />
      <section className="start-layout">
        <div className="start-intro">
          <p className="section-kicker">Start a project</p>
          <h1>Let’s find the constraint worth solving.</h1>
          <p>Tell us enough to make the first conversation useful. We’ll review the brand, the numbers and the opportunity before we speak.</p>
          <div className="start-note"><span>Not ready for a brief?</span><a href="mailto:hello@claraverse.com">hello@claraverse.com</a></div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
