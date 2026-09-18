import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';

export const metadata: Metadata = {
  title: 'Performance Marketing — Claraverse',
  description: 'Full-funnel paid media for fashion and skincare brands, built around profitable growth.',
};

export default function PerformanceMarketingPage() {
  return <ServiceTemplate
    index="01" accent="#ff775e" eyebrow="Performance marketing"
    title="Make every signal" italic="work harder."
    description="We turn paid media into a disciplined learning system—one that knows where growth comes from, what it costs and when to press the advantage."
    thesis="The media account is not the strategy. Profitable scale comes from connecting commercial targets, customer intent, creative learning and landing-page behaviour into one decision system."
    outcomes={[
      { label: 'Sharper economics', copy: 'Planning tied to contribution margin, blended efficiency and the realities of inventory.' },
      { label: 'Faster learning', copy: 'A testing cadence that turns audience, offer and creative signals into next-week decisions.' },
      { label: 'Durable scale', copy: 'Channel mix and budget movement designed to reduce dependency on any single win.' },
    ]}
    deliverables={['Growth model and measurement architecture','Meta and Google campaign management','Budget planning and daily optimisation','Creative testing roadmap and briefs','Landing-page experiment direction','Weekly commercial decision calls']}
    steps={[
      { title: 'Model', copy: 'Define the economics and the real guardrails for growth.' },
      { title: 'Instrument', copy: 'Make tracking useful enough to support confident decisions.' },
      { title: 'Experiment', copy: 'Run structured tests across message, audience, offer and journey.' },
      { title: 'Scale', copy: 'Move spend when the evidence and operations are ready.' },
    ]}
  />;
}
