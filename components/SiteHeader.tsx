'use client';
import Link from 'next/link';
import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {gsap} from 'gsap';
import {SiteMenu} from './SiteMenu';
import {useHeaderContrast} from './useHeaderContrast';
import {HeaderStylePreview,type StickyHeaderStyle} from './HeaderStylePreview';

export function SiteHeader(){
 const [stuck,setStuck]=useState(false),[menuOpen,setMenuOpen]=useState(false);
 const [stickyStyle,setStickyStyle]=useState<StickyHeaderStyle>('depth');
 const selectedStyle:StickyHeaderStyle=stickyStyle==='rail'||stickyStyle==='glass'?stickyStyle:'depth';
 const pathname=usePathname();
 const hero=pathname==='/';
 const host=useRef<HTMLElement>(null);
 const theme=useHeaderContrast(host,pathname,menuOpen);
 useLayoutEffect(()=>{
  const header=host.current;if(!header)return;
  const media=gsap.matchMedia();
  media.add({animated:'(prefers-reduced-motion: no-preference)',reduced:'(prefers-reduced-motion: reduce)'},context=>{
   const animated=Boolean(context.conditions?.animated),driver={depth:0};
   let frame=0,lastDepth=-1;
   const paint=()=>{
    const arc=animated?Math.sin(driver.depth*Math.PI):0;
    header.style.setProperty('--header-depth',String(driver.depth));
    header.style.setProperty('--header-bend',`${-1.2*arc}deg`);
    header.style.setProperty('--header-lift',`${-2*arc}px`);
   };
   const chase=animated?gsap.quickTo(driver,'depth',{duration:.38,ease:'power3.out',onUpdate:paint}):null;
   const sync=(immediate=false)=>{
    frame=0;const y=Math.max(0,window.scrollY),next=Math.min(1,Math.max(0,(y-24)/120));
    setStuck(y>24);
    if(immediate||!chase){driver.depth=animated?next:y>24?1:0;paint();}
    else if(Math.abs(next-lastDepth)>.0001)chase(next);
    lastDepth=next;
   };
   const schedule=()=>{if(!frame)frame=requestAnimationFrame(()=>sync());};
   sync(true);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
   return()=>{cancelAnimationFrame(frame);chase?.tween.kill();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);header.style.removeProperty('--header-depth');header.style.removeProperty('--header-bend');header.style.removeProperty('--header-lift');};
  },header);
  return()=>media.revert();
 },[pathname]);
 useEffect(()=>{setMenuOpen(false);if(new URL(window.location.href).searchParams.get('header-preview')!=='1')setStickyStyle('depth');},[pathname]);
 const closeMenu=useCallback(()=>setMenuOpen(false),[]);
 return <><header ref={host} className={`site-header ${hero?'site-header--hero':'site-header--solid'}`} data-theme={theme} data-stuck={stuck} data-sticky-style={selectedStyle} data-menu-open={menuOpen}><div className="site-header__inner">
  <Link href="/" className="site-header__identity" aria-label="claraverse home" onClick={closeMenu}><span className="site-header__target" id="site-header-brand"><span className="site-header__outline" aria-hidden="true">claraverse</span><span className="site-header__fill" aria-hidden="true">claraverse</span></span><span className="site-header__descriptor">Shopify Studio</span></Link>
  <SiteMenu open={menuOpen} onOpen={()=>setMenuOpen(true)} onClose={closeMenu}/>
  <Link href="/quote" className="quote-cta" aria-label="Start a project with Claraverse" onClick={closeMenu}><span className="header-cta__full">Start a project</span><span className="header-cta__short">Let’s talk</span></Link>
 </div></header><div className="site-header__scrim" data-open={menuOpen} aria-hidden="true" onPointerDown={closeMenu}/>{process.env.NODE_ENV==='development'?<HeaderStylePreview value={selectedStyle} onChange={setStickyStyle}/>:null}</>;
}
