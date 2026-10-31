'use client';
import Link from 'next/link';
import {useLayoutEffect,useRef} from 'react';

/** Fit the existing type without stretching glyphs or clipping either edge. */
export function FooterWordmark(){
 const host=useRef<HTMLAnchorElement>(null),word=useRef<HTMLSpanElement>(null);
 useLayoutEffect(()=>{
  const container=host.current,text=word.current;
  if(!container||!text)return;
  let width=0,disposed=false;
  const fit=(force=false)=>{
   const available=container.clientWidth;
   if(!available||(!force&&available===width))return;
   width=available;
   text.style.fontSize='100px';
   const natural=text.getBoundingClientRect().width;
   if(natural)text.style.fontSize=`${100*available/natural*.995}px`;
  };
  fit();
  const observer=new ResizeObserver(()=>fit());
  observer.observe(container);
  // Refit after the actual local typeface replaces a possible fallback font.
  void document.fonts.ready.then(()=>{if(!disposed)fit(true);});
  return()=>{disposed=true;observer.disconnect();};
 },[]);
 return <Link href="/" className="footer-wordmark" ref={host} aria-label="Claraverse home"><span ref={word} aria-hidden="true">claraverse</span></Link>;
}
