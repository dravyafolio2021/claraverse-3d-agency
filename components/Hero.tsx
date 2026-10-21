'use client';
import {useLayoutEffect,useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SiteHeader} from './SiteHeader';
import {GlobeScene} from './GlobeScene';
import {TechnologyLogos} from './TechnologyLogos';
import {demoOrders} from '@/lib/order-events';
gsap.registerPlugin(ScrollTrigger);
const clamp=(n:number)=>Math.min(1,Math.max(0,n));
const smooth=(n:number)=>n*n*(3-2*n);
export function Hero(){
 const stage=useRef<HTMLElement>(null),flight=useRef<HTMLAnchorElement>(null),target=useRef<HTMLSpanElement>(null),track=useRef<HTMLSpanElement>(null),scrollProgress=useRef(0);
 const [order,setOrder]=useState(0),[paused,setPaused]=useState(false),[resetKey,setResetKey]=useState(0);
 const selectOrder=(index:number)=>{setOrder(index);setPaused(true);};
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)setPaused(true);},[]);
 useEffect(()=>{if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setInterval(()=>setOrder(v=>(v+1)%demoOrders.length),5500);return()=>clearInterval(timer);},[paused]);
 useLayoutEffect(()=>{
  const element=stage.current,wordmark=flight.current,destination=target.current;if(!element||!wordmark||!destination)return;
  let alive=true,dx=0,dy=0,small=1;
  const state={progress:0};
  const paint=()=>{
   const p=clamp(state.progress),t=smooth(clamp((p-.02)/.38)),fill=smooth(clamp((p-.4)/.24));
   scrollProgress.current=p;
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
   element.dataset.phase=p>.25?'globe':'intro';if(track.current)track.current.style.height=`${Math.max(3,p*100)}%`;
  };
  const measure=()=>{
   wordmark.style.setProperty('--tx','0px');wordmark.style.setProperty('--ty','0px');wordmark.style.setProperty('--scale','1');
   const from=wordmark.getBoundingClientRect(),to=destination.getBoundingClientRect();dx=to.left+to.width/2-from.left-from.width/2;dy=to.top+to.height/2-from.top-from.height/2;small=to.width/from.width;paint();
  };
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const context=gsap.context(()=>{gsap.to(state,{progress:1,ease:'none',onUpdate:paint,scrollTrigger:{trigger:element,start:'top top',end:'bottom bottom',scrub:reduced?true:.55,invalidateOnRefresh:true,onRefresh:measure}});});
  measure();window.addEventListener('resize',measure);document.fonts.ready.then(()=>{if(alive){measure();ScrollTrigger.refresh();}});
  return()=>{alive=false;context.revert();window.removeEventListener('resize',measure);document.documentElement.style.removeProperty('--scroll-reveal');document.documentElement.style.removeProperty('--hero-progress');document.documentElement.style.removeProperty('--brand-liquid-clip');};
 },[]);
 const active=demoOrders[order];
 return <><SiteHeader hero targetRef={target}/><a href="#top" className="brand-flight" ref={flight} aria-label="claraverse — back to top"><span className="brand-flight__wordmark">claraverse<span className="brand-flight__period">.</span></span><span className="brand-flight__descriptor">Shopify Studio</span></a>
 <section id="top" ref={stage} className="hero-section" data-phase="intro"><h1 className="sr-only">claraverse — premium Shopify & Shopify Plus agency</h1><div className="hero-sticky">
  <div className="hero-grain" aria-hidden="true"/><div className="hero-glow" aria-hidden="true"/>
  <div className="hero-intro"><div className="hero-meta"><span>✳</span> independent thinking. exceptional commerce.</div><div className="hero-technologies"><TechnologyLogos/></div><div className="hero-statement"><p>premium Shopify & Shopify Plus engineering.</p><span>built for the brand. connected to the world.</span></div></div>
  <div className="globe-wrap"><GlobeScene activeOrder={order} paused={paused} resetKey={resetKey} onSelectOrder={selectOrder} scrollProgress={scrollProgress}/></div>
  <div className="commerce-heading"><span className="eyebrow">commerce, connected</span><p>a world of orders.</p></div>
  <div className="commerce-overlay">
   <article className="order-receipt moving-border"><div className="card-top"><span className="receipt-dot"/> Shopify order <span className="tag-demo">demo</span></div><div className="order-line"><span className="order-icon"><img src="/shopify-bag.svg" alt="Shopify" width="28" height="32"/></span><div><strong>#{1001+order}</strong><p>{active.store}<small>{active.originCity}, {active.originCountry}</small></p></div></div><div className="order-destination"><div><span>customer location</span><strong>{active.city}</strong><small>{active.country}</small></div><strong className="order-value">{new Intl.NumberFormat('en-US',{style:'currency',currency:active.market,currencyDisplay:'narrowSymbol',maximumFractionDigits:0}).format(active.value)}</strong></div><div className="card-foot">sample activity · no client stores connected</div></article>
   <div className="route-note"><span className="eyebrow">a simple connection</span><p>store → customer</p><span>Country, location and order<br/>follow the same destination.</span></div>
   <div className="globe-explorer"><div className="destination-selector" role="group" aria-label="Explore order destinations">{demoOrders.map((item,index)=><button type="button" aria-pressed={index===order} key={item.city} onClick={()=>selectOrder(index)}>{item.city}</button>)}</div><div className="globe-controls"><span id="globe-instructions">drag to rotate · select a destination</span><button type="button" aria-label={paused?'Play demo orders':'Pause demo orders'} onClick={()=>setPaused(!paused)}>{paused?'▶ play':'Ⅱ pause'}</button><button type="button" onClick={()=>setResetKey(v=>v+1)}>↺ reset</button></div></div>
  </div>
  <div className="hero-bottom"><span>Shopify & Shopify Plus<br/>design. engineering. growth.</span><a href="#next">scroll to explore <span>↓</span></a><span>independent by design.<br/>01 — 02</span></div>
 </div><div className="hero-scroll-track" aria-hidden="true"><span ref={track}/></div></section></>;
}
