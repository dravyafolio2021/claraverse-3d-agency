import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';

export const metadata: Metadata = {
  title: 'AI Video & Creative — Claraverse',
  description: 'A high-velocity AI-assisted creative system for fashion and skincare growth.',
};

export default function AiCreativePage() {
  return <ServiceTemplate
    index="02" accent="#7167e8" eyebrow="AI video & creative"
    title="More ideas." italic="More winners."
    description="We combine human taste, performance evidence and AI production to build a creative engine that learns faster than fatigue can catch it."
    thesis="AI makes production faster. It does not make the idea better. Our system begins with customer truth and brand judgement, then uses AI to explore more angles, formats and iterations without lowering the bar."
    outcomes={[
      { label: 'Creative velocity', copy: 'More meaningful tests each week—not endless cosmetic variants.' },
      { label: 'Stronger angles', copy: 'Concepts drawn from real objections, desires, use cases and product proof.' },
      { label: 'Brand memory', copy: 'Performance assets that remain recognisable, coherent and worth remembering.' },
    ]}
    deliverables={['Creative strategy and research','Concepting and hook development','AI-assisted video production','Static and motion ad systems','UGC direction and creator briefs','Performance analysis and iteration']}
    steps={[
      { title: 'Listen', copy: 'Mine customer language, product truth and competitive patterns.' },
      { title: 'Frame', copy: 'Turn insights into differentiated concepts and testable hypotheses.' },
      { title: 'Produce', copy: 'Build polished assets quickly across formats and placements.' },
      { title: 'Learn', copy: 'Read the signals and feed them directly into the next sprint.' },
    ]}
  />;
}
