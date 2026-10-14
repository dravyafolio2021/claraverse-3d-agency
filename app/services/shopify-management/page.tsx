import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  alternates: { canonical: '/services/shopify-management' },
  title: 'Shopify Management & Ongoing Development — Claraverse',
  description: 'Ongoing Shopify development, maintenance, theme improvements and release QA for established brands. A clear backlog and an accountable working relationship.',
};

export default function ShopifyManagementPage() {
  return <ServiceTemplate service={getService('shopify-management')} />;
}
