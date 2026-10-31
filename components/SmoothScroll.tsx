'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let activePageScroll:Lenis|undefined;
/** Use the existing wheel controller for section navigation when it is active. */
export function scrollPageTo(top:number){
 if(activePageScroll){activePageScroll.scrollTo(top,{duration:.85,lerp:0,easing:value=>1-Math.pow(1-value,3)});return;}
 window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}

/** A restrained wheel enhancement; touch, keyboard and reduced motion stay native. */
export function SmoothScroll(){
 const pathname=usePathname();
 useEffect(()=>{
  const preference=window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let disposed=false,generation=0,instance:Lenis|undefined,stopTick:(()=>void)|undefined;
  const teardown=()=>{if(activePageScroll===instance)activePageScroll=undefined;stopTick?.();stopTick=undefined;instance?.destroy();instance=undefined;};
  const sync=async()=>{
   const ticket=++generation;
   teardown();
   if(!preference.matches)return;
   try{
    // Do not download or initialise the wheel enhancement on touch-only devices.
    const {default:Lenis}=await import('lenis');
    if(disposed||ticket!==generation||!preference.matches)return;
    const lenis=new Lenis({
     lerp:0.16,wheelMultiplier:0.94,smoothWheel:true,syncTouch:false,
     anchors:true,stopInertiaOnNavigate:true,respectReducedMotion:true,
     prevent:node=>node.matches('.site-menu__navigation,.site-menu__panel,textarea,select,[data-lenis-prevent]'),
    });
    instance=lenis;activePageScroll=lenis;
    const update=()=>ScrollTrigger.update();
    // Share GSAP's ticker, using wall-clock time without changing its global timing.
    const tick=()=>lenis.raf(performance.now());
    lenis.on('scroll',update);gsap.ticker.add(tick);
    stopTick=()=>{gsap.ticker.remove(tick);lenis.off('scroll',update);};
   }catch{
    // Scrolling is a progressive enhancement; native scrolling remains available.
    teardown();
   }
  };
  void sync();preference.addEventListener('change',sync);
  return()=>{disposed=true;generation++;preference.removeEventListener('change',sync);teardown();};
 },[pathname]);
 return null;
}
