'use client';
import {useLayoutEffect,useRef,type ReactNode} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** The editorial page stays in normal flow; only decorative existing artwork moves. */
export function AboutPageMotion({children}:{children:ReactNode}){
 const host=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const element=host.current;if(!element)return;
  const media=gsap.matchMedia();
  media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
   element.querySelectorAll<HTMLElement>('[data-studio-parallax]').forEach(art=>{
    gsap.fromTo(art,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:art.closest('[data-about-scene]'),start:'top bottom',end:'bottom top',scrub:.7}});
   });
  },element);
  return()=>media.revert();
 },[]);
 return <div className="interior-page about-page" ref={host}>{children}</div>;
}
