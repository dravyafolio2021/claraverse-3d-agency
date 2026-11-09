'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import type {IndustryJourneyStep} from '@/lib/industry-pages';

/** Two connected perspectives, navigated with touch, mouse or standard tab keys. */
export function IndustryJourney({steps,industry}:{steps:IndustryJourneyStep[];industry:string}){
 const [active,setActive]=useState(0),id=useId(),buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const step=steps[active];
 useEffect(()=>{const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());return()=>cancelAnimationFrame(frame);},[active]);
 const choose=(index:number)=>{setActive(index);buttons.current[index]?.focus({preventScroll:true});};
 return <div className="industry-journey">
  <div className="industry-journey__tabs" role="tablist" aria-label={`${industry} customer journey`}>{steps.map((item,index)=><button key={item.name} ref={element=>{buttons.current[index]=element;}} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={index===active} aria-controls={`${id}-panel`} tabIndex={index===active?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>{
   const direction=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
   if(direction){event.preventDefault();event.stopPropagation();choose((index+direction+steps.length)%steps.length);}
   else if(event.key==='Home'||event.key==='End'){event.preventDefault();choose(event.key==='Home'?0:steps.length-1);}
  }}><span aria-hidden="true">0{index+1}</span>{item.name}</button>)}</div>
  <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="industry-journey__panel">
   <div className="industry-journey__perspectives" key={active}>
    <div className="industry-journey__customer"><span className="eyebrow">What the customer experiences</span><h3>{step.customer[0]}</h3><p>{step.customer[1]}</p><span className="industry-journey__stage">{step.name.toLowerCase()}</span></div>
    <div className="industry-journey__operation"><span className="eyebrow">What makes it work</span><h3>{step.operation[0]}</h3><p>{step.operation[1]}</p><div className="industry-journey__connection"><i aria-hidden="true"/>{step.connection}</div></div>
   </div>
  </div>
  <p className="industry-journey__note">An illustrative journey. The final experience is shaped around your products, customers and systems.</p>
 </div>;
}
