'use client';
import {Children,cloneElement,isValidElement,useLayoutEffect,useRef,type HTMLAttributes,type ReactNode} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type HeadingProps=HTMLAttributes<HTMLHeadingElement>&{as?:'h1'|'h2'|'h3';mode?:'scroll'|'load'|'hero';pace?:'default'|'relaxed';readingGuide?:boolean};
function readableText(children:ReactNode):string{
 return Children.toArray(children).map(child=>{
  if(typeof child==='string'||typeof child==='number')return String(child);
  if(isValidElement<{children?:ReactNode}>(child))return child.type==='br'?' ':readableText(child.props.children);
  return '';
 }).join('');
}
function lettering(children:ReactNode,splitCharacters:boolean):ReactNode{
 return Children.map(children,child=>{
  if(typeof child==='string'||typeof child==='number')return String(child).split(/(\s+)/).map((word,index)=>/\s/.test(word)?word:<span className="heading-fill__word" key={index}>{splitCharacters?Array.from(word).map((letter,at)=><span className="heading-fill__char" key={at}>{letter}</span>):word}</span>);
  if(isValidElement<{children?:ReactNode}>(child)&&child.type!=='br')return cloneElement(child,{},lettering(child.props.children,splitCharacters));
  return child;
 });
}

/** Default display-heading treatment. Native line breaks and word wrapping survive. */
export function Heading({as:Tag='h2',mode='scroll',pace='relaxed',readingGuide=true,children,className='',...props}:HeadingProps){
 const host=useRef<HTMLHeadingElement>(null);
 useLayoutEffect(()=>{
  const element=host.current;if(!element)return;
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const targets=element.querySelectorAll<HTMLElement>(readingGuide?'.heading-fill__word':'.heading-fill__char');if(!targets.length)return;
   const hero=mode==='hero'?element.closest<HTMLElement>('.hero-section'):null;
   // Sticky hero copy becomes visible much later than its document position.
   const heroPosition=(fraction:number)=>hero?hero.getBoundingClientRect().top+window.scrollY+(hero.offsetHeight-window.innerHeight)*fraction:0;
   // Reading guides keep every word visible, then brighten complete words in
   // reading order. Whole-letter animation is an explicit opt-out only.
   // Opacity endpoints and letter order are fixed. Invalidating a stagger on
   // refresh leaves not-yet-started letters at their previous bright value.
   // ScrollTrigger still recalculates the start/end positions on every refresh.
   const tween=gsap.fromTo(targets,{opacity:readingGuide?0.36:0},{opacity:1,duration:readingGuide?0.22:0.5,
    stagger:mode==='load'?{amount:Math.min(1.2,targets.length*.05),from:'start'}:readingGuide?0.18:0.05,ease:'none',
    ...(mode==='load'?{}:{scrollTrigger:hero?{trigger:hero,start:()=>heroPosition(.54),end:()=>heroPosition(.94),scrub:true}:{trigger:element,start:pace==='relaxed'?'clamp(top 82%)':'clamp(top 80%)',end:pace==='relaxed'?'clamp(top 0%)':'clamp(top 10%)',scrub:pace==='relaxed'?0.45:true}})});
   element.dataset.fillReady='true';
   return()=>{tween.revert();delete element.dataset.fillReady;};
  });
  return()=>media.revert();
 },[mode,pace,readingGuide,children]);
 return <Tag {...props} className={`heading-fill ${readingGuide?'heading-fill--reading ':''}${className}`.trim()} aria-label={props['aria-label']??readableText(children).replace(/\s+/g,' ').trim()} ref={host}><span className="heading-fill__text" aria-hidden="true">{lettering(children,!readingGuide)}</span></Tag>;
}
