import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  alternates: { canonical: '/services/integrations-automation' },
  title: 'Shopify Integrations & Automation — Claraverse',
  description: 'Connect Shopify with operational systems and reduce recurring manual work. Integration scoping, Shopify Flow, exception handling and maintainable delivery.',
};

export default function IntegrationsAutomationPage() {
  return <ServiceTemplate service={getService('integrations-automation')} />;
}
