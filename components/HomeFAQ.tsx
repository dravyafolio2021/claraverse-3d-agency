'use client';
import Link from 'next/link';
import {useEffect,useRef} from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {homeFaqs} from '@/lib/home-faqs';
import {Heading} from './Heading';

export function HomeFAQ(){
 const frame=useRef<number>(0);
 const refresh=()=>{
  cancelAnimationFrame(frame.current);
  frame.current=requestAnimationFrame(()=>ScrollTrigger.refresh());
 };
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 return <section id="faq" className="home-faq" aria-labelledby="home-faq-title">
  <div className="home-faq__intro"><span className="eyebrow">before we begin</span><Heading id="home-faq-title">good questions.<br/>clear answers.</Heading><p>A little clarity on the experience, the systems and how we work together.</p><Link href="/quote" className="text-link">Ask us about your project</Link></div>
  <div className="home-faq__list">{homeFaqs.map((item,index)=><details id={`faq-${item.id}`} key={item.id} className="home-faq__item" name="claraverse-home-faq" open={index===0} onToggle={refresh}>
   <summary><h3><span className="home-faq__number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span>{item.question}</span><span className="home-faq__mark" aria-hidden="true"/></h3></summary>
   <div className="home-faq__answer"><p>{item.answer}</p>{item.link?<Link href={item.link.href}>{item.link.label}</Link>:null}</div>
  </details>)}</div>
 </section>;
}
