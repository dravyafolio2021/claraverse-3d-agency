import Link from 'next/link';
import type {ReactNode} from 'react';
import {Heading} from './Heading';
import {ServiceArtwork} from './ServiceArtwork';
import type {ServiceShape} from '@/lib/services';
import {projects} from '@/lib/site-content';
import {portfolioSceneStyle} from '@/lib/portfolio-content';

export function InteriorHero({eyebrow,title,copy,shape,art,action,secondary}:{eyebrow:string;title:string;copy:string;shape?:ServiceShape;art?:ReactNode;action?:{href:string;label:string};secondary?:{href:string;label:string}}){
 return <header className={`interior-hero${shape||art?' interior-hero--visual':''}`}><div><span className="eyebrow">{eyebrow}</span><Heading as="h1" mode="load">{title}</Heading><p>{copy}</p>{action||secondary?<div className="interior-actions">{action?<Link href={action.href} className="button-lime">{action.label}</Link>:null}{secondary?<Link href={secondary.href} className="text-link">{secondary.label}</Link>:null}</div>:null}</div>{art??(shape?<div className="interior-hero__art" aria-hidden="true"><ServiceArtwork shape={shape} sizes="(max-width: 700px) 200px, 440px"/><span>claraverse / commerce intelligence</span></div>:null)}</header>;
}
export function SectionTitle({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <div className="interior-section__heading"><div><span className="eyebrow">{eyebrow}</span><Heading>{title}</Heading></div>{copy?<p>{copy}</p>:null}</div>;}
export function BenefitGrid({items}:{items:[string,string][]}){return <div className="interior-benefits">{items.map(([title,copy],index)=><div key={title}><span className="eyebrow">0{index+1}</span><Heading as="h3">{title}</Heading><p>{copy}</p></div>)}</div>;}
export function ProcessStrip({steps}:{steps:string[]}){return <ol className="interior-process">{steps.map((step,index)=><li key={step}><span className="eyebrow">0{index+1} / {['Define','Make','Validate'][index]??'Review'}</span><p>{step}</p></li>)}</ol>;}
export function OperatingFlow({labels}:{labels:string[]}){return <ol className="interior-flow" aria-label="Connected stages">{labels.map((label,index)=><li key={label}><span>0{index+1}</span><strong>{label}</strong></li>)}</ol>;}
export function RelatedConcept({slug}:{slug:string}){
 const project=projects.find(item=>item.slug===slug);if(!project)return null;
 return <section className="interior-section"><SectionTitle eyebrow="Thinking, made tangible" title="A direction to explore." copy="An original concept from the studio. An illustration of our thinking, rather than a commissioned case study."/><Link className="interior-concept" href={`/work/${slug}`} style={portfolioSceneStyle(slug)}><div className="interior-concept__image" aria-hidden="true"><div className="folio-scene"/><span>{project.name}</span></div><div><span className="eyebrow">Concept exploration / {project.sector}</span><Heading as="h3">{project.label}</Heading><p>{project.problem}</p><span className="text-link">Explore the story</span></div></Link></section>;
}
export function PageClose({title='Let’s make the next move clear.',copy='Tell us about the business, the challenge and where you want to go next.',href='/quote',label='Discuss your project'}:{title?:string;copy?:string;href?:string;label?:string}){return <section className="interior-section interior-close"><div><span className="eyebrow">Your next chapter</span><Heading>{title}</Heading><p>{copy}</p></div><Link className="button-lime" href={href}>{label}</Link></section>;}
