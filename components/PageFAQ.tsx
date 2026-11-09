'use client';
import {useEffect,useId,useRef} from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Heading} from './Heading';
export type FAQItem={question:string;answer:string};
export function PageFAQ({items}:{items:FAQItem[]}){
 const id=useId(),frame=useRef(0);
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 return <section className="interior-section page-faq" aria-labelledby={`${id}-title`}><div><span className="eyebrow">A little clarity</span><Heading id={`${id}-title`}>Before we begin.</Heading></div><div>{items.map(item=><details name={`${id}-questions`} key={item.question} onToggle={()=>{cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(()=>ScrollTrigger.refresh());}}><summary>{item.question}<i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>;
}
