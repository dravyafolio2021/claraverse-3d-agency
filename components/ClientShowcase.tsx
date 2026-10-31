'use client';
import {Heading} from '@/components/Heading';
import {useState} from 'react';
import {clientBrands} from '@/lib/client-brands';
import {BrandMark} from './BrandMark';


export function ClientShowcase(){
 const [paused,setPaused]=useState(false);
 return <section id="clients" className="client-showcase" aria-labelledby="client-showcase-title" aria-describedby="client-preview-note">
  <div className="client-showcase__inner" data-reveal>
   <div className="client-showcase__row">
    <div className="client-showcase__intro"><span className="eyebrow">clients & collaborators</span><Heading id="client-showcase-title">in good company.</Heading><p>Ambition, connected.</p></div>
    <div className="client-marquee" data-paused={paused}>
     <div className="client-marquee__track">{[0,1].map(copy=><ul key={copy} className="client-marquee__group" aria-label={copy===0?'Placeholder brand identities':undefined} aria-hidden={copy===1?true:undefined}>{clientBrands.map(brand=><li key={brand.name} className={`client-wordmark client-wordmark--${brand.style}`}>
      <BrandMark brand={brand}/>
     </li>)}</ul>)}</div>
    </div>
    <a className="client-showcase__platform" href="https://www.shopify.com/plus" target="_blank" rel="noopener noreferrer"><img src="/shopify-plus-logo.svg" alt="Shopify Plus" width="180" height="40"/></a>
   </div>
   <div className="client-showcase__foot"><p id="client-preview-note">Placeholder identities · your client logos will live here.</p><button type="button" className="client-marquee__toggle" aria-pressed={paused} aria-label={paused?'Resume brand animation':'Pause brand animation'} onClick={()=>setPaused(value=>!value)}><span aria-hidden="true">{paused?'▶':'Ⅱ'}</span>{paused?'resume':'pause'}</button></div>
  </div>
 </section>;
}
