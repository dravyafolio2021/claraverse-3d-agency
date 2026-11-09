'use client';
import {useId,useState,type KeyboardEvent} from 'react';
import type {StoryStage} from '@/lib/project-stories';
import {portfolioDirections,portfolioSceneStyle} from '@/lib/portfolio-content';

/** A guided concept preview, not a functioning shop or a claim of delivery. */
export function ProjectJourney({slug,name,stages}:{slug:string;name:string;stages:StoryStage[]}){
 const [active,setActive]=useState(0);
 const prefix=useId();
 const stage=stages[active];
 function navigate(event:KeyboardEvent<HTMLButtonElement>,index:number){
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%stages.length;
  else if(event.key==='ArrowLeft')next=(index-1+stages.length)%stages.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=stages.length-1;
  else return;
  event.preventDefault();setActive(next);
  document.getElementById(`${prefix}-tab-${next}`)?.focus();
 }
 return <div className="case-journey">
  <div className="case-journey__tabs" role="tablist" aria-label="Explore the customer journey">{stages.map((item,index)=><button key={item.name} type="button" role="tab" id={`${prefix}-tab-${index}`} aria-selected={active===index} aria-controls={`${prefix}-panel`} tabIndex={active===index?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>navigate(event,index)}><span aria-hidden="true">0{index+1}</span>{item.name}</button>)}</div>
  <div className="case-journey__panel" role="tabpanel" id={`${prefix}-panel`} aria-labelledby={`${prefix}-tab-${active}`} tabIndex={0}>
   <div className="case-journey__screen" data-nav-surface="light" style={portfolioSceneStyle(slug)}>
    <div className="case-journey__browser" aria-hidden="true"><span/><span/><span/><small>{name} / experience direction</small></div>
    <div className="case-journey__brand" aria-hidden="true"><b>{name}</b><span>{portfolioDirections[slug].category}</span><span>collection</span></div>
    <div className="case-journey__canvas"><div className="case-journey__image" data-nav-surface="dark" aria-hidden="true"><div className="folio-scene"/><span>{portfolioDirections[slug].line}</span></div><div className="case-journey__content" key={active}><span className="case-kicker">{stage.label}</span><h3>{stage.title}</h3><p>{stage.copy}</p><span className="case-journey__detail">{stage.detail}</span></div></div>
   </div>
   <p className="case-journey__caption">Illustrative experience · not a live storefront</p>
  </div>
 </div>;
}
