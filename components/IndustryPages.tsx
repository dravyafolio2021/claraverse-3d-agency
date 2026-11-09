import Image from 'next/image';
import Link from 'next/link';
import {industries} from '@/lib/site-content';
import {industryPages} from '@/lib/industry-pages';
import {services} from '@/lib/services';
import {studioMetrics} from '@/lib/studio-metrics';
import {portfolioSceneStyle} from '@/lib/portfolio-content';
import {Heading} from './Heading';
import {InteriorHero,SectionTitle,BenefitGrid,RelatedConcept,PageClose} from './Interior';
import {PageFAQ} from './PageFAQ';
import {IndustryJourney} from './IndustryJourney';
import {IndustryMotion} from './IndustryMotion';

type Industry=typeof industries[number];
function IndustryVisual({industry,hero=false}:{industry:Industry;hero?:boolean}){
 const page=industryPages[industry.slug];
 return <div className={`industry-visual industry-visual--${industry.slug}`} style={page.project?portfolioSceneStyle(page.project):undefined} aria-hidden="true">
  {page.project?<div className="industry-visual__scene" data-industry-parallax={hero?'':undefined}><div className="folio-scene"/></div>:<>
   <div className="industry-visual__type"><span>the experience.</span><span>the operation.</span><span>connected.</span></div>
   <div className="industry-visual__art" data-industry-parallax={hero?'':undefined}><Image src={`/services/${page.shape}-sculpture-v1.webp`} alt="" width={720} height={720} priority={hero} sizes={hero?'(max-width: 700px) 200px, 500px':'300px'}/></div>
  </>}
 </div>;
}

export function IndustriesDirectory(){return <div className="interior-page"><InteriorHero eyebrow="Our industries" title="Four worlds. One connected approach." copy="Shopify commerce intelligence for Beauty, Fashion, Wellness and Petcare. We connect the experience customers see with the operation that makes it possible."/><section className="interior-section industry-directory" aria-label="Our four industry specialisms">{industries.map((industry,index)=>{const page=industryPages[industry.slug];return <Link className="industry-directory__item" href={`/industries/${industry.slug}`} key={industry.slug}><IndustryVisual industry={industry}/><div className="industry-directory__caption"><span className="eyebrow">0{index+1} / {industry.name}</span><Heading as="h2">{industry.headline}</Heading><p>{page.caption}</p><span className="text-link">Explore {industry.name.toLowerCase()}</span></div></Link>;})}</section><PageClose/></div>;}

export function IndustryDetail({industry}:{industry:Industry}){
 const page=industryPages[industry.slug];
 const facts=studioMetrics.filter(item=>['projects','experience','satisfaction'].includes(item.id));
 return <IndustryMotion>
  <header className="industry-opening">
   <nav className="industry-opening__breadcrumb" aria-label="Breadcrumb"><Link href="/industries">Industries</Link><span aria-hidden="true">/</span><span aria-current="page">{industry.name}</span></nav>
   <div className="industry-opening__copy"><div><span className="eyebrow">{industry.name} / Shopify & Shopify Plus</span><Heading as="h1" mode="load">{page.hero}</Heading></div><div><p>{page.intro}</p><Link href="/quote" className="button-lime">Discuss your {industry.name.toLowerCase()} business</Link></div></div>
   <figure className="industry-opening__visual"><IndustryVisual industry={industry} hero/><figcaption><span>{page.caption}</span><span>{page.project?`Studio concept / ${page.project}`:'Customer experience + connected operations'}</span></figcaption></figure>
  </header>
  <section className="interior-section industry-perspective" aria-labelledby="industry-perspective-title"><span className="eyebrow">Understanding {industry.name.toLowerCase()} commerce</span><div><Heading id="industry-perspective-title">{page.statement}</Heading><p>{page.statementCopy}</p></div></section>
  {page.project?<RelatedConcept slug={page.project}/>:null}
  <section className="interior-section industry-facts" aria-label="Claraverse studio experience"><div><span className="eyebrow">The studio behind the work</span><p>Design, Shopify expertise<br/>and connected operations.</p></div><dl>{facts.map(fact=><div key={fact.id}><dt>{fact.label}</dt><dd>{fact.value}{fact.suffix}</dd></div>)}</dl><span className="industry-facts__note">Agency-wide figures.</span></section>
  <section className="interior-section"><SectionTitle eyebrow="The opportunities" title="Built around the decisions that matter." copy={`A ${industry.name.toLowerCase()} experience needs more than a good first impression. We connect customer decisions with practical operating requirements.`}/><BenefitGrid items={page.priorities}/></section>
  <section className="interior-section industry-experience" aria-labelledby="industry-experience-title"><div className="interior-section__heading"><div><span className="eyebrow">From first visit to next order</span><Heading id="industry-experience-title">One journey. Two connected perspectives.</Heading></div><p>Choose a moment to see what the customer needs—and what the operation needs to deliver it.</p></div><IndustryJourney steps={page.journey} industry={industry.name}/></section>
  <section className="interior-section industry-solutions"><SectionTitle eyebrow={`Solutions for ${industry.name.toLowerCase()}`} title="The detail makes the difference."/><div className="industry-solutions__list">{page.features.map(([label,title,copy],index)=><article key={title}><span className="eyebrow">0{index+1} / {label}</span><div><Heading as="h3">{title}</Heading><p>{copy}</p></div></article>)}</div></section>
  <section className="interior-section industry-services"><SectionTitle eyebrow="Relevant expertise" title={`The right capabilities for your ${industry.name.toLowerCase()} business.`} copy="Start with the business need, then bring the right design, engineering and systems work together."/><div>{page.services.map((path,index)=>{const [category,slug]=path.split('/');const service=services.find(item=>item.slug===category)!;const offering=service.offerings.find(item=>item.slug===slug)!;return <article key={path}><span className="eyebrow">0{index+1} / {service.name}</span><div><Heading as="h3">{offering.name}</Heading><p>{page.serviceNotes[index]}</p></div><Link href={`/services/${path}`} className="text-link" aria-label={`Explore ${offering.name}`}>Explore service</Link></article>;})}</div><Link className="text-link industry-services__all" href="/services">Explore all services</Link></section>
  <section className="interior-section"><div className="industry-conversation"><div><span className="eyebrow">A useful starting point</span><Heading>What needs to work better?</Heading><p>A clearer buying journey. A more capable platform. Systems that stay in agreement. Tell us where the friction is, and we’ll start there.</p></div><Link href="/quote" className="button-lime">Talk to the studio</Link></div></section>
  <section className="interior-section industry-delivery"><SectionTitle eyebrow="From ambition to operation" title="A clear route through the work." copy="Define the important decisions early. Validate the customer experience and the operation together."/><ol>{page.process.map(([title,copy],index)=><li key={title}><span className="eyebrow">0{index+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
  <PageFAQ items={page.faqs}/>
  <section className="interior-section industry-others" aria-labelledby="other-industries-title"><div><span className="eyebrow">Our other worlds</span><Heading id="other-industries-title">Four specialisms. Shared intelligence.</Heading></div><nav aria-label="Other industry specialisms">{industries.filter(item=>item.slug!==industry.slug).map(item=><Link href={`/industries/${item.slug}`} key={item.slug}><span>{item.name}</span><span>{industryPages[item.slug].caption}</span></Link>)}</nav></section>
  <PageClose title={page.close} copy="Tell us about your products, your customers and the operation you want to build next." label="Start the conversation"/>
 </IndustryMotion>;
}
