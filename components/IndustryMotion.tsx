'use client';
import {useLayoutEffect,useRef,type ReactNode} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function IndustryMotion({children}:{children:ReactNode}){
 const host=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const element=host.current;if(!element)return;
  const media=gsap.matchMedia();
  media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
   element.querySelectorAll<HTMLElement>('[data-industry-parallax]').forEach(layer=>{
    gsap.fromTo(layer,{yPercent:-2},{yPercent:2,ease:'none',scrollTrigger:{trigger:layer.parentElement,start:'top bottom',end:'bottom top',scrub:.65}});
   });
  },element);
  return()=>media.revert();
 },[]);
 return <div className="interior-page industry-page" ref={host}>{children}</div>;
}
