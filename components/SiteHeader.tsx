'use client';
import Link from 'next/link';
import type { Ref } from 'react';
import { SiteMenu } from './SiteMenu';
export function SiteHeader({hero=false,targetRef}:{hero?:boolean;targetRef?:Ref<HTMLSpanElement>}){
 return <header className={`site-header ${hero?'site-header--hero':'site-header--solid'}`}>
  <Link href="/" className="site-header__identity" aria-label="claraverse home"><span className="site-header__target" ref={targetRef}><span className="site-header__outline" aria-hidden="true">claraverse<span>.</span></span><span className="site-header__fill" aria-hidden="true">claraverse<span>.</span></span></span><span className="site-header__descriptor">Shopify Studio</span></Link>
  <SiteMenu />
  <Link href="/quote" className="quote-cta">Get Quote <span aria-hidden="true">↗</span></Link>
 </header>;
}
