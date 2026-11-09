import type {MetadataRoute} from 'next';
import {services} from '@/lib/services';
import {industries,projects,articles} from '@/lib/site-content';
export const dynamic = 'force-static';

export default function sitemap():MetadataRoute.Sitemap{
 const paths=['','/services','/industries','/work','/about','/insights','/quote','/faq',...services.map(item=>`/services/${item.slug}`),...services.flatMap(service=>service.offerings.map(item=>`/services/${service.slug}/${item.slug}`)),...industries.map(item=>`/industries/${item.slug}`),...projects.map(item=>`/work/${item.slug}`),...articles.map(item=>`/insights/${item.slug}`)];
 return paths.map(path=>({url:`https://claraverse.in${path||'/'}`}));
}
