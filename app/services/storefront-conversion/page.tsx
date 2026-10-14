import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/service-template';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  alternates: { canonical: '/services/storefront-conversion' },
  title: 'Shopify Storefront Design & Conversion — Claraverse',
  description: 'Shopify UX, theme development, mobile performance and conversion improvements based on the buying journey, with a clear scope and measurement plan.',
};

export default function StorefrontConversionPage() {
  return <ServiceTemplate service={getService('storefront-conversion')} />;
}
