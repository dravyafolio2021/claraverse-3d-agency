import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { CONTACT_EMAIL, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  'Privacy',
  'How Claraverse handles email enquiries, regional preferences and ordinary website requests.',
  '/privacy',
);

export default function PrivacyPage() {
  return (
    <main id="main-content" className="page-shell">
      <SiteHeader />
      <header className="page-intro section">
        <div className="narrow">
          <p className="eyebrow">Privacy · 14 October 2026</p>
          <h1 className="display-title">Your information.</h1>
          <p className="prose">
            What this site stores, and what happens when you prepare an enquiry.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="prose narrow">
          <h2>Preparing an enquiry</h2>
          <p>
            The enquiry form prepares an email draft on your device. It does not
            submit your form details to a Claraverse server. The details you enter
            stay in the page until you choose to open your email app.
          </p>
          <p>
            Opening your email app transfers the draft to that app. Review the
            content and choose whether to send it. Your email provider handles the
            draft and sent message under its own privacy practices. If you send
            the email, Claraverse receives the information in it and uses it to
            respond to your enquiry and discuss the work you requested.
          </p>

          <h2>Regional preferences</h2>
          <p>
            If you choose a market, this site remembers that choice in your
            browser&apos;s local storage so it can use the same regional context
            when you return. You can remove the saved preference by clearing this
            site&apos;s data in your browser settings.
          </p>
          <p>
            The hosting provider may also supply an approximate country based on
            your website request. This is used for regional context; the site
            does not request your device&apos;s precise location. An approximate
            country can be incorrect, so you can choose your own market.
          </p>

          <h2>Website requests and tracking</h2>
          <p>
            Our hosting provider processes ordinary request data to deliver and
            operate this website. Hosting records may include an IP address,
            browser information, requested pages and request times.
          </p>
          <p>
            We have not installed analytics, advertising pixels or session
            recording on this site. The saved market preference is used for
            regional context, rather than advertising tracking.
          </p>

          <h2>External services</h2>
          <p>
            When you follow an external link or use your email app, that service
            handles your information according to its own policies. This page
            describes the Claraverse website and enquiry flow.
          </p>

          <h2>Contact</h2>
          <p>
            For a privacy question, or to request a change to information you
            have emailed us, contact{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
