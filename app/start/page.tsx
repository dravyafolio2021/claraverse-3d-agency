import { ContactForm } from '@/components/contact-form';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('Talk About Your Shopify Store', 'Start a focused conversation about Shopify management, storefront improvements, integrations or Shopify Plus. Prepare a short review brief for Claraverse.', '/start');

export default function StartPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content" className="start-layout">
        <div className="start-intro">
          <p className="eyebrow">A useful next conversation</p>
          <h1>What would make<br />your store<br /><em>work better?</em></h1>
          <p>Tell us about the store you run and what is getting in the way. We’ll start by understanding the fit and the right next step.</p>
          <p>This is a conversation about your business. Any detailed audit, delivery scope and commercial terms are agreed together.</p>
          <div className="start-note"><span>Prefer to email us directly?</span><a href="mailto:hello@claraverse.in">hello@claraverse.in ↗</a><span>The form prepares an email draft for you to send.</span></div>
        </div>
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  );
}
