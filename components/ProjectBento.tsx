'use client';
import Link from 'next/link';
import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {projects} from '@/lib/site-content';
import {portfolioDirections,portfolioSceneStyle} from '@/lib/portfolio-content';
import {Heading} from './Heading';

gsap.registerPlugin(ScrollTrigger);
const pad=(value:number)=>String(value).padStart(2,'0');

/** Decorative storefront compositions; the enclosing card is the single link. */
function StorefrontDevice({slug,kind}:{slug:string;kind:'desktop'|'phone'|'tablet'}){
 const project=projects.find(item=>item.slug===slug)!;
 const direction=portfolioDirections[slug];
 return <div className={`bento-device bento-device--${kind}`} aria-hidden="true">
  <div className="bento-device__screen"><div className="bento-device__bar"><b>{project.name}</b><span>collection&nbsp;&nbsp; our world</span><span>bag (0)</span></div>
   <div className="bento-device__visual" style={portfolioSceneStyle(slug)}><div className="folio-scene"/><div className="bento-device__copy"><span>{direction.category}</span><p>{direction.line}</p><span className="bento-device__shop">discover the collection</span></div></div>
   <div className="bento-device__foot"><span>considered in every detail.</span><span>{pad(projects.findIndex(item=>item.slug===slug)+1)}</span></div>
  </div>
 </div>;
}

export function ProjectBento(){
 const host=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{
  const element=host.current;if(!element)return;
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   element.querySelectorAll<HTMLElement>('.project-bento__card').forEach(card=>{
    gsap.fromTo(card.querySelector('.project-bento__scene'),{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:.6}});
   });
  },element);
  return()=>media.revert();
 },[]);

 return <section id="project-spotlight" className="project-bento" ref={host} aria-labelledby="project-bento-title" aria-describedby="project-bento-note">
  <header className="project-bento__intro"><div><span className="eyebrow">a closer look / the concept collection</span><Heading id="project-bento-title">work, in perspective.</Heading></div><div><p>The experience, up close.<br/>The connected thinking behind it.</p><p className="project-bento__preview-note" id="project-bento-note">Concept previews · delivered client work to follow.</p></div></header>
  <div className="project-bento__grid">{projects.map((project,index)=>{
   const direction=portfolioDirections[project.slug];
   const device=index===0?'desktop':index===2?'phone':index===4?'tablet':null;
   return <Link key={project.slug} href={`/work/${project.slug}`} className={`project-bento__card project-bento__card--${project.slug}${index===0?' project-bento__card--feature':''}`} aria-label={`Explore ${project.name} — ${project.sector} concept study`}>
    <div className="project-bento__art" aria-hidden="true"><div className="project-bento__scene" style={portfolioSceneStyle(project.slug)}><div className="folio-scene"/></div><div className="project-bento__scrim"/>{device?<StorefrontDevice slug={project.slug} kind={device}/>:null}</div>
    <div className="project-bento__top"><div><Heading as="h3">{project.name}</Heading><p>{project.sector}</p></div><span className="project-bento__index" aria-hidden="true">{pad(index+1)} / concept</span></div>
    <div className="project-bento__bottom"><span>{direction.scope[0]}</span><span className="project-bento__action">View project</span></div>
   </Link>;
  })}</div>
  <div className="project-bento__end"><p>Original concept studies. Client identities and case studies will replace these previews.</p><Link href="/work" className="text-link">Explore the collection</Link></div>
 </section>;
}
