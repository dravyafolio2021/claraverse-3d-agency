import {notFound} from 'next/navigation';
import {PageShell} from '@/components/PageShell';
import {ServiceHub} from '@/components/ServicePages';
import {services} from '@/lib/services';
export function generateStaticParams(){return services.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=services.find(item=>item.slug===slug);return {title:`Shopify ${service?.name||'Services'} — claraverse`,description:service?.intro};}
export default async function Service({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=services.find(item=>item.slug===slug);if(!service)notFound();return <PageShell><ServiceHub service={service}/></PageShell>;}
