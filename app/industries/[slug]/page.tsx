import {Heading} from '@/components/Heading';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {PageShell,PageIntro} from '@/components/PageShell';
import {industries} from '@/lib/site-content';
export function generateStaticParams(){return industries.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${industries.find(x=>x.slug===slug)?.name||'Industries'} — claraverse`};}
export default async function Industry({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const industry=industries.find(x=>x.slug===slug);if(!industry)notFound();return <PageShell><PageIntro eyebrow={`industries / ${industry.name}`} title={industry.headline} description={industry.copy}/><section className="section editorial-split" data-reveal><Heading>commerce shaped<br/><span>around your customer.</span></Heading><div><ul className="statement-list">{industry.needs.map(need=><li key={need}>{need}</li>)}</ul><p className="body-copy">We begin with your catalog, operations and customer journey, then decide how design and engineering can serve them. Shopify and Shopify Plus are the foundation; your brand defines the experience.</p><Link className="text-link" href="/quote">Let’s talk about your brand ↗</Link></div></section></PageShell>;}
