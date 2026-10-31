'use client';
import Link from 'next/link';
import {useCallback,useEffect,useRef,useState,type Ref} from 'react';
import {usePathname} from 'next/navigation';
import {SiteMenu} from './SiteMenu';

export function SiteHeader({hero=false,targetRef}:{hero?:boolean;targetRef?:Ref<HTMLSpanElement>}){
 const [expanded,setExpanded]=useState(false),[menuOpen,setMenuOpen]=useState(false),lastExpanded=useRef(false);
 const pathname=usePathname();
 useEffect(()=>{
  // React only updates at the threshold; CSS handles the bounded width morph.
  const sync=()=>{const next=window.scrollY>72;if(next!==lastExpanded.current){lastExpanded.current=next;setExpanded(next);}};
  sync();window.addEventListener('scroll',sync,{passive:true});
  return()=>window.removeEventListener('scroll',sync);
 },[]);
 useEffect(()=>{setMenuOpen(false);},[pathname]);
 const closeMenu=useCallback(()=>setMenuOpen(false),[]);
 return <header className={`site-header ${hero?'site-header--hero':'site-header--solid'}`} data-expanded={expanded} data-menu-open={menuOpen}>
  <Link href="/" className="site-header__identity" aria-label="claraverse home" onClick={closeMenu}><span className="site-header__target" ref={targetRef}><span className="site-header__outline" aria-hidden="true">claraverse</span><span className="site-header__fill" aria-hidden="true">claraverse</span></span><span className="site-header__descriptor">Shopify Studio</span></Link>
  <SiteMenu expanded={expanded} open={menuOpen} onOpen={()=>setMenuOpen(true)} onClose={closeMenu}/>
  <Link href="/quote" className="quote-cta" aria-label="Start a project with Claraverse" onClick={closeMenu}><span className="header-cta__full">Start a project</span><span className="header-cta__short">Let’s talk</span></Link>
 </header>;
}
