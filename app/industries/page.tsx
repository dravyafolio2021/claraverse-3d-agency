import Link from 'next/link';
import {PageShell,PageIntro} from '@/components/PageShell';
import {industries} from '@/lib/site-content';
export const metadata={title:'Industries — claraverse Shopify studio'};
export default function Industries(){return <PageShell><PageIntro eyebrow="02 / industries" title="your world. thoughtfully connected." description="Different products ask different things of a storefront. We shape the architecture, content and customer journey around the way your business works."/><section className="section industry-grid">{industries.map((industry,index)=><Link href={`/industries/${industry.slug}`} className={`industry-card moving-border industry-card--${industry.tone}`} data-reveal key={industry.slug}><span className="eyebrow">0{index+1} / {industry.name}</span><h2>{industry.headline}</h2><p>{industry.copy}</p><span className="text-link">Explore this industry ↗</span></Link>)}</section></PageShell>;}
