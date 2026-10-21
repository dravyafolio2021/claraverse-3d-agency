'use client';
import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function MotionReveal({children}:{children:React.ReactNode}){
 const host=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const context=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element=>{gsap.fromTo(element,{y:28,autoAlpha:0},{y:0,autoAlpha:1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 94%',once:true}});});},host);
  return()=>context.revert();
 },[]);
 return <div ref={host}>{children}</div>;
}
