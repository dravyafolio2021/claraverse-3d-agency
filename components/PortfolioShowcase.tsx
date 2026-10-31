'use client';
import Link from 'next/link';
import {useId,useLayoutEffect,useRef,useState,type CSSProperties,type KeyboardEvent} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {projects} from '@/lib/site-content';
import {folderPlacement,portfolioDirections,portfolioSceneStyle} from '@/lib/portfolio-content';
import {Heading} from './Heading';
gsap.registerPlugin(ScrollTrigger);
const pad=(value:number)=>String(value).padStart(2,'0');
const folderShape='M28 2H285C305 2 312 31 336 31H871Q898 31 898 59V281Q898 308 871 308H29Q2 308 2 281V29Q2 2 28 2Z';

function FolderSurface({id,back=false}:{id:string;back?:boolean}){
 return <svg className={`folder-surface ${back?'folder-surface--back':''}`} viewBox="0 0 900 310" preserveAspectRatio="none" aria-hidden="true">
  <defs><linearGradient id={`${id}-paper`} x1="0" y1="0" x2=".85" y2="1"><stop stopColor={back?'#42522b':'#4b602b'}/><stop offset=".38" stopColor={back?'#293b1b':'#30461d'}/><stop offset="1" stopColor={back?'#192b12':'#203214'}/></linearGradient><linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d1edab" stopOpacity=".6"/><stop offset=".45" stopColor="#8da861" stopOpacity=".22"/><stop offset="1" stopColor="#bdde8a" stopOpacity=".38"/></linearGradient><filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".74" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><clipPath id={`${id}-clip`}><path d={folderShape}/></clipPath></defs>
  <path d={folderShape} fill={`url(#${id}-paper)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
  <rect width="900" height="310" filter={`url(#${id}-grain)`} clipPath={`url(#${id}-clip)`} opacity=".045"/>
  {!back?<><path d="M25 43H299C318 43 322 49 343 49H875" fill="none" stroke="#0c1b0b" strokeOpacity=".45" strokeWidth="2" vectorEffect="non-scaling-stroke"/><path d="M29 288H871" fill="none" stroke="#9ebd74" strokeOpacity=".16" vectorEffect="non-scaling-stroke"/><path className="folder-surface__glint" d={folderShape} pathLength="2500" fill="none" stroke="#d5ff91" strokeOpacity=".8" strokeWidth="1.4" strokeDasharray="95 2405" vectorEffect="non-scaling-stroke"/></>:null}
 </svg>;
}

function StorefrontFile({index}:{index:number}){
 const project=projects[index],direction=portfolioDirections[project.slug];
 return <div className={`folio-storefront folio-storefront--${project.tone}`} style={portfolioSceneStyle(project.slug)} aria-hidden="true"><div className="folio-storefront__bar"><b>{project.name}</b><span>collection    our world</span><span>bag (0)</span></div><div className="folio-storefront__scene"><div className="folio-scene"/><div className="folio-storefront__copy"><span>{direction.category}</span><p>{direction.line}</p><span className="folio-storefront__shop">explore the collection</span></div></div><div className="folio-storefront__bottom"><span>claraverse / concept file</span><span>{pad(index+1)}</span></div></div>;
}

function ProjectFolder(){
 const [active,setActive]=useState(0),[open,setOpen]=useState(true),id=useId().replace(/:/g,''),project=projects[active],direction=portfolioDirections[project.slug];
 const choices=useRef<(HTMLButtonElement|null)[]>([]),count=projects.length;
 const select=(index:number)=>{setActive((index+count)%count);setOpen(true);};
 const browseKeys=(event:KeyboardEvent<HTMLDivElement>)=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?count-1:(active+(event.key==='ArrowLeft'?-1:1)+count)%count;
  select(next);choices.current[next]?.focus();
 };
 return <div className="folio-folder folio-folder--physical">
  <div className="folio-folder__stage" data-open={open}><div className="folio-folder__halo" aria-hidden="true"/><div className="folder-ground-shadow" aria-hidden="true"/>
   <div className="folder-back"><FolderSurface id={`${id}-back`} back/></div><div className="folder-interior" aria-hidden="true"/>
   <div id="portfolio-files" className="folio-folder__fan" role="group" aria-label="Project files" aria-hidden={!open}>{projects.map((item,index)=>{const placement=folderPlacement(index,active,count);return <button type="button" className={`folio-folder__sheet ${index===active?'is-active':''}`} key={item.slug} aria-label={`Select ${item.name} concept`} aria-pressed={index===active} tabIndex={open&&index===active?0:-1} onClick={()=>select(index)} style={{'--fan-x':`${placement.x}%`,'--fan-y':`${placement.y}px`,'--fan-angle':`${placement.angle}deg`,'--fan-layer':placement.layer,'--file-depth':placement.depth} as CSSProperties}><span className="folder-file-edge" aria-hidden="true"/><StorefrontFile index={index}/><span className="folder-file-index" aria-hidden="true">{pad(index+1)}</span></button>;})}</div>
   <div className="folio-folder__front"><FolderSurface id={`${id}-front`}/><div className="folio-folder__tab">the claraverse collection</div><div className="folder-pocket-copy"><div className="folio-folder__front-top"><span>selected explorations</span><button className="folder-latch" type="button" aria-expanded={open} aria-controls="portfolio-files" onClick={()=>setOpen(value=>!value)}><span aria-hidden="true">{open?'−':'+'}</span>{open?'close folder':'open folder'}</button></div><div className="folio-folder__front-title"><span className="folio-folder__asterisk" aria-hidden="true">✳</span><span>{project.name}</span><Link href={`/work/${project.slug}`} aria-label={`Open ${project.name} concept study`}>View details</Link></div><div className="folio-folder__front-bottom"><span>{project.sector}</span><span className="folder-file-count">file {pad(active+1)} / {pad(count)}</span></div></div></div>
  </div>
  <div className="folder-browser"><span>pick a file. explore the thinking.</span><div><button type="button" aria-label="Previous project" onClick={()=>select(active-1)}>Prev</button><span aria-live="polite">{pad(active+1)} <i>/</i> {pad(count)}</span><button type="button" aria-label="Next project" onClick={()=>select(active+1)}>Next</button></div></div>
  <div className="folio-folder__choices" role="group" aria-label="Choose a project. Use left and right arrows to browse." onKeyDown={browseKeys}>{projects.map((item,index)=><button ref={element=>{choices.current[index]=element;}} type="button" className={`folio-folder__choice ${index===active?'is-active':''}`} key={item.slug} onClick={()=>select(index)} tabIndex={index===active?0:-1} aria-pressed={index===active} aria-controls="portfolio-project-details" aria-label={`Show ${item.name} concept — ${item.sector}`}><span className="folio-folder__thumb" style={portfolioSceneStyle(item.slug)} aria-hidden="true"/><span className="folio-folder__choice-copy"><span>{pad(index+1)}</span><strong>{item.name}</strong></span></button>)}</div>
  <div className="folio-folder__description" id="portfolio-project-details" aria-live="polite"><div><span className="eyebrow">inside this file / {project.name}</span><Heading as="h3">{project.label}</Heading><ul className="folder-project-scope">{direction.scope.map(scope=><li key={scope}>{scope}</li>)}</ul></div><div><p>{project.approach}</p><Link className="text-link" href={`/work/${project.slug}`}>Explore {project.name}</Link></div></div>
 </div>;
}

export function PortfolioShowcase(){
 const host=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{
  const media=gsap.matchMedia();
  const context=gsap.context(()=>{media.add('(prefers-reduced-motion: no-preference)',()=>{gsap.fromTo('.folio-folder__stage',{y:24,opacity:.25},{y:0,opacity:1,duration:1.1,ease:'power2.out',scrollTrigger:{trigger:host.current,start:'top 85%',once:true}});});},host);
  ScrollTrigger.refresh();return()=>{media.revert();context.revert();};
 },[]);
 return <section id="portfolio" className="portfolio-showcase portfolio-showcase--folder portfolio-showcase--selected" ref={host} aria-labelledby="portfolio-title"><div className="folio-intro"><div><span className="eyebrow">selected work / the concept collection</span><Heading id="portfolio-title">Featured Stores</Heading></div><div className="folio-intro__aside"><p>The experience people see.<br/>The connected thinking behind it.</p><span className="folder-edition"><i aria-hidden="true"/>{pad(projects.length)} files. a world of possibilities.</span></div></div><ProjectFolder/><div className="folio-end"><p>Original concept studies · client projects and results to follow.</p><Link href="/work" className="text-link">All explorations</Link></div></section>;
}
