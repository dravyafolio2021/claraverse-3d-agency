import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

const publicRoutes = [
  '/',
  '/services/shopify-management',
  '/services/storefront-conversion',
  '/services/integrations-automation',
  '/services/shopify-plus',
  '/services/performance-marketing',
  '/services/ai-creative',
  '/approach',
  '/insights',
  '/insights/shopify-store-health-check',
  '/insights/shopify-app-stack-review',
  '/start',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({ url: absoluteUrl(path) }));
}
