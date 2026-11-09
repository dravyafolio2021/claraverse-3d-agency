'use client';
import {useLayoutEffect,useRef,type ReactNode} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Page-owned motion; all copy and links remain available without animation. */
export function ProjectStoryMotion({children}:{children:ReactNode}){
 const host=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const element=host.current;if(!element)return;
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   element.querySelectorAll<HTMLElement>('.case-parallax').forEach(layer=>{
    gsap.fromTo(layer,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:layer.parentElement,start:'top bottom',end:'bottom top',scrub:.7}});
   });
  },element);
  return()=>media.revert();
 },[]);
 return <div className="case-story" ref={host}>{children}</div>;
}
