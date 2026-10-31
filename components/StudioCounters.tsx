'use client';
import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {studioMetrics} from '@/lib/studio-metrics';

gsap.registerPlugin(ScrollTrigger);
const format=(value:number)=>String(Math.round(value));

export function StudioCounters(){
 const host=useRef<HTMLElement>(null);
 useLayoutEffect(()=>{
  if(studioMetrics.every(metric=>metric.value===null))return;
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const resetters:(()=>void)[]=[];
   const context=gsap.context(()=>{
    const timeline=gsap.timeline({scrollTrigger:{trigger:host.current,start:'top 85%',once:true}});
    studioMetrics.forEach((metric,index)=>{
     if(metric.value===null)return;
     const node=host.current?.querySelector<HTMLElement>(`[data-metric-value="${metric.id}"]`);
     if(!node)return;
     const end=metric.value,state={value:0};
     node.textContent='0';
     const number=node.closest('.studio-counter__number');
     const at=index*.12;
     timeline.to(state,{value:end,duration:1.65,ease:'power2.out',onUpdate:()=>{node.textContent=format(state.value);},onComplete:()=>{node.textContent=format(end);}},at);
     if(number)timeline.fromTo(number,{y:10,opacity:.45},{y:0,opacity:1,duration:.7,ease:'power2.out'},at);
     resetters.push(()=>{node.textContent=format(end);});
    });
   },host);
   return()=>{context.revert();resetters.forEach(reset=>reset());};
  });
  return()=>media.revert();
 },[]);
 const pending=studioMetrics.some(metric=>metric.value===null);
 return <section id="studio-numbers" className="studio-counters" aria-labelledby="studio-counters-title" ref={host}>
  <h2 id="studio-counters-title" className="sr-only">The studio in numbers</h2>
  <dl className="studio-counters__grid">{studioMetrics.map(metric=><div className="studio-counter" key={metric.id}>
   <dt className="studio-counter__label">{metric.label}</dt>
   <dd className="studio-counter__number"><span aria-hidden="true"><span data-metric-value={metric.id}>{metric.value===null?'—':format(metric.value)}</span>{metric.value!==null&&<span className="studio-counter__suffix">{metric.suffix}</span>}</span><span className="sr-only">{metric.value===null?'Figure to be confirmed':`${format(metric.value)}${metric.suffix}`}</span></dd>
   <dd className="studio-counter__description">{metric.description}</dd>
  </div>)}</dl>
  {pending&&<p className="studio-counters__note">Verified studio figures to follow.</p>}
 </section>;
}
