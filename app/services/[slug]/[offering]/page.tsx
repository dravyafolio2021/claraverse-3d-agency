import {notFound} from 'next/navigation';
import {PageShell} from '@/components/PageShell';
import {OfferingPage} from '@/components/ServicePages';
import {services,findOffering} from '@/lib/services';
export function generateStaticParams(){return services.flatMap(service=>service.offerings.map(offering=>({slug:service.slug,offering:offering.slug})));}
export async function generateMetadata({params}:{params:Promise<{slug:string;offering:string}>}){const {slug,offering}=await params;const item=findOffering(services.find(service=>service.slug===slug),offering);return {title:`${item?.name||'Service'} — claraverse`,description:item?.description};}
export default async function ServiceDetail({params}:{params:Promise<{slug:string;offering:string}>}){const {slug,offering}=await params;const service=services.find(item=>item.slug===slug);const item=findOffering(service,offering);if(!service||!item)notFound();return <PageShell><OfferingPage service={service} offering={item}/></PageShell>;}
