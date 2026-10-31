import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Heading} from '@/components/Heading';
import {PageShell,PageIntro} from '@/components/PageShell';
import {ServiceArtwork} from '@/components/ServiceArtwork';
import {services} from '@/lib/services';
export function generateStaticParams(){return services.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=services.find(item=>item.slug===slug);return {title:`Shopify ${service?.name||'Services'} — claraverse`,description:service?.intro};}
export default async function Service({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,service=services.find(item=>item.slug===slug);if(!service)notFound();
 return <PageShell><PageIntro eyebrow={`Shopify services / ${service.number} / ${service.name}`} title={service.title} description={service.intro}/><section className="section service-detail"><aside className="service-detail__overview"><div className="service-detail__art" aria-hidden="true"><ServiceArtwork shape={service.shape} sizes="(max-width: 420px) 112px, (max-width: 760px) 160px, 300px"/></div><span className="eyebrow">{String(service.offerings.length).padStart(2,'0')} connected services</span><Heading>{service.hook}</Heading><Link className="text-link" href={`/quote?service=${service.slug}`}>Discuss {service.name.toLowerCase()}</Link></aside><div className="service-detail__offerings">{service.offerings.map((offering,index)=><article id={offering.slug} className="service-offering" key={offering.slug}><span className="eyebrow">{service.number}.{String(index+1).padStart(2,'0')}</span><Heading>{offering.name}</Heading><p>{offering.description}</p><Link href={`/quote?service=${service.slug}&offering=${offering.slug}`}>Discuss this service<span className="sr-only">: {offering.name}</span></Link></article>)}</div></section><section className="section service-approach"><span className="eyebrow">how we approach it</span><Heading>clear scope.<br/>connected delivery.</Heading><div className="process-grid">{service.steps.map((step,index)=><div data-reveal key={step}><span>0{index+1}</span><p>{step}</p></div>)}</div><Link className="text-link" href="/services">Explore all services</Link></section></PageShell>;
}
