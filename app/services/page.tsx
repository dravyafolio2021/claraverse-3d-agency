import Link from 'next/link';
import {PageShell,PageIntro} from '@/components/PageShell';
import {services} from '@/lib/site-content';
export const metadata={title:'Shopify & Shopify Plus services — claraverse'};
export default function Services(){return <PageShell><PageIntro eyebrow="01 / services" title="better commerce. built deliberately." description="Commerce architecture, connected operations, integrations and intelligence. We build around Shopify Plus to bring your systems, teams and markets into a coherent operation."/><section className="section page-list">{services.map(service=><Link href={`/services/${service.slug}`} className="detail-row" data-reveal key={service.slug}><span className="eyebrow">{service.number}</span><div><h2>{service.name}</h2><p>{service.intro}</p></div><span className="row-arrow">↗</span></Link>)}</section></PageShell>;}
