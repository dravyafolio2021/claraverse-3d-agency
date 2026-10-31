'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useId,useLayoutEffect,useRef,useState,type KeyboardEvent} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {services} from '@/lib/services';
import {createServiceSceneController,serviceProgressForIndex} from '@/lib/service-scene';
import {scrollPageTo} from './SmoothScroll';
import {Heading} from './Heading';

gsap.registerPlugin(ScrollTrigger);

const pad=(value:number)=>String(value).padStart(2,'0');
const sceneCopy:Record<string,string>={
 development:'Shopify Plus, custom storefronts and apps. Built around the way your business works.',
 design:'Distinctive shopping experiences. Clear product journeys. A brand people remember.',
 integrations:'Connect products, inventory, customers and fulfilment. Keep your operation moving as one.',
 migration:'Move to Shopify with a clear plan for your data, integrations, customers and search visibility.',
 growth:'Improve conversion, performance and retention. Make your next decision an informed one.',
};

/** One scroll stage, backed by the catalog used by service pages and enquiries. */
export function Capabilities(){
 const host=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null);
 const tabList=useRef<HTMLDivElement>(null),scrollScene=useRef<ScrollTrigger|null>(null);
 const [active,setActive]=useState(0);
 const controller=useRef<ReturnType<typeof createServiceSceneController>|null>(null);
 if(!controller.current)controller.current=createServiceSceneController(services.length,setActive);
 const id=useId().replace(/:/g,'');
 const service=services[active];

 useLayoutEffect(()=>{
  const section=host.current,element=stage.current;
  if(!section||!element)return;
  const media=gsap.matchMedia();
  media.add({motion:'(prefers-reduced-motion: no-preference)',wide:'(min-width: 901px) and (min-height: 700px)'},context=>{
   if(!context.conditions?.motion)return;
   const wide=Boolean(context.conditions.wide);
   const trigger=ScrollTrigger.create({
    trigger:element,
    start:wide?'top 100px':'top 72%',
    end:wide?()=>`+=${Math.max(1200,Math.round(window.innerHeight*2.2))}`:'bottom 35%',
    pin:wide?element:false,
    pinSpacing:true,
    anticipatePin:wide?1:0,
    onUpdate:self=>controller.current?.scroll(self.progress),
   });
   scrollScene.current=trigger;
   gsap.fromTo(element.querySelector('.service-cinema__images'),{yPercent:wide?5:3},{
    yPercent:wide?-5:-3,ease:'none',scrollTrigger:{trigger:element,start:wide?()=>trigger.start:'top bottom',end:wide?()=>trigger.end:'bottom top',scrub:.7},
   });
   return()=>{scrollScene.current=null;controller.current?.release();};
  },section);
  const interrupt=()=>controller.current?.interrupt();
  const interruptKey=(event:globalThis.KeyboardEvent)=>{
   if(!tabList.current?.contains(event.target as Node)&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))interrupt();
  };
  window.addEventListener('wheel',interrupt,{passive:true});
  window.addEventListener('touchstart',interrupt,{passive:true});
  window.addEventListener('keydown',interruptKey);
  return()=>{window.removeEventListener('wheel',interrupt);window.removeEventListener('touchstart',interrupt);window.removeEventListener('keydown',interruptKey);media.revert();};
 },[]);

 useLayoutEffect(()=>{
  const element=stage.current;if(!element)return;
  const layers=element.querySelectorAll<HTMLElement>('.service-cinema__scene');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade=gsap.to(layers,{opacity:(index:number)=>index===active?1:0,duration:reduced?0:.65,ease:'power2.out',overwrite:true});
  const artwork=layers[active]?.querySelector('img');
  const settle=artwork&&!reduced?gsap.fromTo(artwork,{scale:1.06},{scale:1,duration:1.15,ease:'power2.out',overwrite:true}):null;
  return()=>{fade.kill();settle?.kill();};
 },[active]);

 const choose=(index:number)=>{
  const trigger=scrollScene.current;
  controller.current?.select(index,Boolean(trigger?.pin));
  // Touch and reduced-motion layouts switch in place without moving the page.
  if(!trigger?.pin)return;
  const top=trigger.start+(trigger.end-trigger.start)*serviceProgressForIndex(index,services.length);
  scrollPageTo(top);
 };
 const restoreScrollScene=()=>controller.current?.restore();
 const navigate=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  let next=index;
  if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%services.length;
  else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+services.length-1)%services.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=services.length-1;
  else return;
  event.preventDefault();
  tabList.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({preventScroll:true});
  choose(next);
 };

 return <section id="capabilities" className="immersive-services" ref={host} aria-labelledby="capabilities-title">
  <div className="service-cinema" ref={stage}>
   <div className="service-cinema__backdrop" aria-hidden="true">
    <div className="service-cinema__images">{services.map((item,index)=><div key={item.slug} className={`service-cinema__scene service-cinema__scene--${item.slug}`} data-active={active===index}>
     <Image src={`/services/${item.shape}-sculpture-v1.webp`} alt="" width={720} height={720} sizes="(max-width: 700px) 120vw, 90vw" loading="lazy" unoptimized/>
    </div>)}</div>
    <div className="service-cinema__shade"/>
   </div>
   <header className="service-cinema__header"><div><span className="eyebrow">the whole commerce operation</span><Heading id="capabilities-title">Services</Heading></div><span className="service-cinema__count" aria-hidden="true">{pad(active+1)}<span> / {pad(services.length)}</span></span></header>
   <div className="service-cinema__middle">
    <div className="service-cinema__tabs" ref={tabList} role="tablist" aria-label="Explore our Shopify services" aria-orientation="vertical" onPointerLeave={restoreScrollScene} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))restoreScrollScene();}}>
     {services.map((item,index)=><button key={item.slug} type="button" role="tab" id={`${id}-${item.slug}-tab`} aria-selected={active===index} aria-controls={`${id}-service-panel`} tabIndex={active===index?0:-1} onPointerEnter={event=>{if(event.pointerType==='mouse')controller.current?.preview(index);}} onFocus={()=>controller.current?.preview(index)} onClick={()=>choose(index)} onKeyDown={event=>navigate(event,index)}><span className="service-cinema__tab-number" aria-hidden="true">{item.number}</span><span>{item.name}</span><span className="service-cinema__tab-dot" aria-hidden="true"/></button>)}
    </div>
    <p className="service-cinema__hint"><span className="service-cinema__hint-scroll">Scroll to explore</span><span className="service-cinema__hint-touch">Tap a service to explore</span></p>
   </div>
   <div className="service-cinema__detail" role="tabpanel" id={`${id}-service-panel`} aria-labelledby={`${id}-${service.slug}-tab`} tabIndex={0}>
    <div className="service-cinema__summary" key={service.slug}><p className="service-cinema__hook">{service.hook}</p><p>{sceneCopy[service.slug]}</p></div>
    <div className="service-cinema__links"><Link className="service-cinema__explore" href={`/services/${service.slug}`}>Explore {service.name.toLowerCase()}<span>{pad(service.offerings.length)} services</span></Link><Link className="service-cinema__all" href="/services">All Shopify services</Link></div>
   </div>
   <div className="service-cinema__progress" aria-hidden="true">{services.map((item,index)=><span key={item.slug} data-active={index===active}/>)}</div>
  </div>
 </section>;
}
