'use client';
import {useEffect,useState,type RefObject} from 'react';
import {navigationThemeFor,opaqueBackground,relativeLuminance,type NavigationTheme} from '@/lib/navigation-contrast';

function surfaceAt(x:number,y:number,header:HTMLElement){
 const under=document.elementsFromPoint(x,y).find(element=>!header.contains(element)&&!element.closest('.brand-flight,.site-header__scrim'));
 if(!under)return null;
 const declared=under.closest<HTMLElement>('[data-nav-surface]')?.dataset.navSurface;
 if(declared==='dark')return 0;
 if(declared==='light')return 1;
 for(let element:Element|null=under;element;element=element.parentElement){
  const rgb=opaqueBackground(getComputedStyle(element).backgroundColor);
  if(rgb)return relativeLuminance(rgb);
 }
 return 0;
}

export function useHeaderContrast(ref:RefObject<HTMLElement|null>,pathname:string,menuOpen:boolean){
 const [theme,setTheme]=useState<NavigationTheme>('lifted');
 useEffect(()=>{
  const header=ref.current;if(!header||menuOpen)return;
  let frame=0,timer:number|undefined,lastRead=0;
  const read=()=>{
   frame=0;lastRead=performance.now();
   const rect=header.getBoundingClientRect();
   const values=[.18,.5,.82].map(fraction=>surfaceAt(rect.left+rect.width*fraction,Math.max(0,Math.min(innerHeight-1,rect.top+rect.height/2)),header)).filter((value):value is number=>value!==null).sort((a,b)=>a-b);
   if(values.length){const luminance=values[Math.floor(values.length/2)];setTheme(previous=>navigationThemeFor(luminance,previous));}
  };
  const schedule=()=>{
   if(frame||timer!==undefined)return;
   timer=window.setTimeout(()=>{timer=undefined;frame=requestAnimationFrame(read);},Math.max(0,90-(performance.now()-lastRead)));
  };
  schedule();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  const resize=new ResizeObserver(schedule);resize.observe(header);
  return()=>{cancelAnimationFrame(frame);if(timer!==undefined)clearTimeout(timer);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[ref,pathname,menuOpen]);
 return theme;
}
