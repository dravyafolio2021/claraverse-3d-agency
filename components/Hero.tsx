'use client';
import {Heading} from '@/components/Heading';
import {useLayoutEffect,useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SiteHeader} from './SiteHeader';
import {GlobeScene} from './GlobeScene';
import {TechnologyLogos} from './TechnologyLogos';
import {type MarketRegion} from '@/lib/order-events';
import {metroFootprint} from '@/lib/commerce-network';
import {MarketStickers} from './MarketStickers';
gsap.registerPlugin(ScrollTrigger);
const clamp=(n:number)=>Math.min(1,Math.max(0,n));
const smooth=(n:number)=>n*n*(3-2*n);
export function Hero(){
 const stage=useRef<HTMLElement>(null),flight=useRef<HTMLAnchorElement>(null),target=useRef<HTMLSpanElement>(null),scrollProgress=useRef(0);
 const [region,setRegion]=useState<MarketRegion>('global'),[paused,setPaused]=useState(false),[resetKey,setResetKey]=useState(0),[focusKey,setFocusKey]=useState(0);
 const selectMarket=(market:MarketRegion)=>{setRegion(market);setFocusKey(key=>key+1);};
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)setPaused(true);},[]);
 useLayoutEffect(()=>{
  const element=stage.current,wordmark=flight.current,destination=target.current;if(!element||!wordmark||!destination)return;
  let alive=true,dx=0,dy=0,small=1,originX=0,originY=0,originWidth=1;
  const state={progress:0};
  const paint=()=>{
   const p=clamp(state.progress),t=smooth(clamp((p-.02)/.38)),fill=smooth(clamp((p-.4)/.24));
   scrollProgress.current=p;
   // The floating header changes width while scrolling. Read its live target
   // before writing the flight transform, so the wordmark docks into its cell.
   if(p<.41){const to=destination.getBoundingClientRect();dx=to.left+to.width/2-originX;dy=to.top+to.height/2-originY;small=to.width/originWidth;}
   wordmark.style.setProperty('--tx',`${dx*t}px`);wordmark.style.setProperty('--ty',`${dy*t}px`);wordmark.style.setProperty('--scale',String(1+(small-1)*t));
   // Both header layers share one grid cell; only the liquid clipping edge moves.
   const wave=Array.from({length:25},(_,index)=>{
    const x=index/24*100,y=110-fill*120+Math.sin(index*.58+p*22)*4*Math.sin(Math.PI*fill);
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
   }).join(',');
   document.documentElement.style.setProperty('--brand-liquid-clip',`polygon(${wave},100% 100%,0% 100%)`);
   wordmark.style.opacity=String(1-smooth(clamp((p-.34)/.06)));
   wordmark.style.visibility=p>=.4?'hidden':'visible';
   document.documentElement.style.setProperty('--scroll-reveal',String(t));document.documentElement.style.setProperty('--hero-progress',String(p));
   element.dataset.phase=p>.55?'globe':'intro';element.dataset.interactive=String(p>=.4);
  };
  const measure=()=>{
   wordmark.style.setProperty('--tx','0px');wordmark.style.setProperty('--ty','0px');wordmark.style.setProperty('--scale','1');
   const from=wordmark.getBoundingClientRect();originX=from.left+from.width/2;originY=from.top+from.height/2;originWidth=Math.max(1,from.width);paint();
  };
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const context=gsap.context(()=>{gsap.to(state,{progress:1,ease:'none',onUpdate:paint,scrollTrigger:{trigger:element,start:'top top',end:'bottom bottom',scrub:reduced?true:.55,invalidateOnRefresh:true,onRefresh:measure}});});
  const headerResize=new ResizeObserver(()=>{if(alive&&state.progress<.41)paint();});
  const header=destination.closest('header');if(header)headerResize.observe(header);
  measure();window.addEventListener('resize',measure);document.fonts.ready.then(()=>{if(alive){measure();ScrollTrigger.refresh();}});
  return()=>{alive=false;headerResize.disconnect();context.revert();window.removeEventListener('resize',measure);document.documentElement.style.removeProperty('--scroll-reveal');document.documentElement.style.removeProperty('--hero-progress');document.documentElement.style.removeProperty('--brand-liquid-clip');};
 },[]);
 return <><SiteHeader hero targetRef={target}/><a href="#top" className="brand-flight" ref={flight} aria-label="claraverse — back to top"><span className="brand-flight__wordmark">claraverse</span><span className="brand-flight__descriptor">Shopify Studio</span></a>
 <section id="top" ref={stage} className="hero-section" data-phase="intro"><h1 className="sr-only">claraverse — premium ecommerce intelligence agency</h1><div id="operations" className="operations-anchor" aria-hidden="true"/><div className="hero-sticky">
  <div className="commerce-watermark" aria-hidden="true"><img src="/shopify-bag.svg" alt="" width="890" height="1010"/></div><div className="hero-grain" aria-hidden="true"/><div className="hero-glow" aria-hidden="true"/>
  <div className="hero-intro"><div className="hero-meta"><span>✳</span> ecommerce intelligence. independently engineered.</div><div className="hero-technologies"><TechnologyLogos/></div><div className="hero-statement"><p>the intelligence behind your commerce.</p><span>highly efficient commerce. connected from storefront to fulfilment.</span><a href="#operations" className="hero-explore">Explore connected commerce <span>↓</span></a></div></div>
  <div className="globe-wrap"><GlobeScene focusKey={focusKey} region={region} paused={paused} resetKey={resetKey} onSelectRegion={selectMarket} scrollProgress={scrollProgress}/></div>
  <div className="commerce-heading"><span className="eyebrow">commerce, orchestrated</span><Heading mode="hero">engineered to operate. built to scale.</Heading><span className="commerce-heading__intro">Built for global ambition. Connected across the US, Europe and India.</span></div>
  <div className="commerce-overlay">
   <div className="globe-explorer">
    <div className="network-legend" aria-label="Network symbols"><span><i className="legend-hub"/> store hubs</span><span><i className="legend-customer"/> customers</span><span><i className="legend-route"/> order journeys</span></div>
    <MarketStickers value={region} onChange={selectMarket}/>
    <div className="metro-footprint" aria-live="polite"><span>{metroFootprint[region].title}</span><p>{metroFootprint[region].cities}</p></div>
    <div className="globe-controls"><span id="globe-instructions"><span className="globe-instructions__desktop">drag to rotate · Shift-drag to move · scroll to travel</span><span className="globe-instructions__touch">swipe sideways to turn · scroll to travel</span></span><button type="button" aria-label={paused?'Play commerce network':'Pause commerce network'} onClick={()=>setPaused(!paused)}>{paused?'▶ play flow':'Ⅱ pause flow'}</button><button type="button" onClick={()=>{setRegion('global');setResetKey(v=>v+1);}}>↺ reset view</button></div>
    <span className="network-disclaimer">Symbolic metro hubs · illustrative order flow</span>
   </div>
  </div>
  <div className="hero-bottom"><span>premium ecommerce intelligence<br/>architecture. operations. growth.</span><a href="#clients">scroll to explore <span>↓</span></a><span>independent by design.<br/>01 — 02</span></div>
 </div></section></>;
}
