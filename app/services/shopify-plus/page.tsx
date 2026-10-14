import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  alternates: { canonical: '/services/shopify-plus' },
  title: 'Shopify Plus Development & Checkout — Claraverse',
  description: 'Scoped Shopify Plus checkout, wholesale and complex commerce development. Start with the requirement and confirm plan boundaries before building.',
};

export default function ShopifyPlusPage() {
  return <ServiceTemplate service={getService('shopify-plus')} />;
}
