'use client';
import {useEffect,useState} from 'react';

export type StickyHeaderStyle='depth'|'rail'|'glass';
const directions:[StickyHeaderStyle,string,string][]=[
 ['depth','Depth','A jade surface that settles gradually with the page scroll.'],
 ['rail','Inset','A contained rail with breathing room around it.'],
 ['glass','Glass','A smoked surface with a compact lime CTA.'],
];
function showSticky(){window.scrollTo({top:Math.max(320,window.scrollY),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}

/** Explicit, development-only comparison; absent from ordinary and production visits. */
export function HeaderStylePreview({value,onChange}:{value:StickyHeaderStyle;onChange:(value:StickyHeaderStyle)=>void}){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  if(process.env.NODE_ENV!=='development')return;
  const query=new URL(window.location.href).searchParams;
  if(query.get('header-preview')!=='1')return;
  const requested=directions.find(([id])=>id===query.get('header-style'))?.[0]??'depth';
  onChange(requested);setVisible(true);
  const frame=requestAnimationFrame(showSticky);return()=>cancelAnimationFrame(frame);
 },[onChange]);
 if(!visible)return null;
 const choose=(next:StickyHeaderStyle)=>{
  onChange(next);
  const url=new URL(window.location.href);url.searchParams.set('header-preview','1');url.searchParams.set('header-style',next);
  window.history.replaceState(window.history.state,'',url);showSticky();
 };
 const close=()=>{
  setVisible(false);const url=new URL(window.location.href);url.searchParams.delete('header-preview');url.searchParams.delete('header-style');window.history.replaceState(window.history.state,'',url);
 };
 return <aside className="header-preview" aria-label="Compare sticky header designs">
  <div className="header-preview__top"><span>STICKY DIRECTIONS</span><button type="button" onClick={close} aria-label="Close header comparison">Close</button></div>
  <div className="header-preview__choices" role="group" aria-label="Sticky header style">{directions.map(([id,label],index)=><button type="button" key={id} aria-pressed={value===id} onClick={()=>choose(id)}><small>0{index+1}</small>{label}</button>)}</div>
  <p>{directions.find(([id])=>id===value)?.[2]}</p>
  <button type="button" className="header-preview__normal" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Compare with the normal header</button>
 </aside>;
}
