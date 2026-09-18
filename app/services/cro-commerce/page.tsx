import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';

export const metadata: Metadata = {
  title: 'CRO Commerce — Claraverse',
  description: 'Research-led Shopify design, development and conversion management for ecommerce brands.',
};

export default function CroCommercePage() {
  return <ServiceTemplate
    index="03" accent="#d5ff62" eyebrow="CRO commerce experiences"
    title="Turn attention into" italic="confident action."
    description="We design, build and continuously improve commerce experiences that answer the right questions, remove friction and make buying feel inevitable."
    thesis="A high-converting store is not a pile of best practices. It is a clear argument built around this product, this customer and this moment—validated through evidence instead of opinion."
    outcomes={[
      { label: 'Clearer journeys', copy: 'Information architecture shaped around how customers actually decide.' },
      { label: 'Higher confidence', copy: 'Merchandising, proof and product education placed where doubt appears.' },
      { label: 'Better conversion', copy: 'A continuous programme of prioritised experiments across the buying journey.' },
    ]}
    deliverables={['Conversion and analytics audit','Customer research and journey mapping','UX and visual direction','Shopify design and development','Landing pages and campaign journeys','CRO roadmap and experiment management']}
    steps={[
      { title: 'Observe', copy: 'Study behaviour, feedback, analytics and operational constraints.' },
      { title: 'Prioritise', copy: 'Rank the highest-value friction and opportunity areas.' },
      { title: 'Build', copy: 'Design and develop with speed, clarity and maintainability.' },
      { title: 'Improve', copy: 'Measure the commercial effect and keep compounding.' },
    ]}
  />;
}
