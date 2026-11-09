'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {services} from '@/lib/services';

export function ServicesMegaMenu({pathname,onNavigate}:{pathname:string;onNavigate:()=>void}){
 const [selected,setSelected]=useState(()=>services.find(service=>pathname.startsWith(`/services/${service.slug}`))?.slug??services[0].slug);
 useEffect(()=>{const current=services.find(service=>pathname.startsWith(`/services/${service.slug}`));if(current)setSelected(current.slug);},[pathname]);
 const current=(path:string)=>pathname===path?'page' as const:undefined;
 return <div className="services-mega">
  <div className="services-mega__heading"><div><span className="eyebrow">Our Shopify expertise</span><h2>From storefront to systems.</h2></div><Link href="/services" onClick={onNavigate} aria-current={current('/services')}>All services</Link></div>
  <div className="services-mega__categories" role="group" aria-label="Service areas">{services.map(service=><button type="button" key={service.slug} aria-pressed={selected===service.slug} aria-controls={`mega-category-${service.slug}`} onClick={()=>setSelected(service.slug)}>{service.name}</button>)}</div>
  <div className="services-mega__columns">{services.map(service=><section className="services-mega__group" key={service.slug} id={`mega-category-${service.slug}`} data-selected={selected===service.slug} aria-labelledby={`mega-category-title-${service.slug}`}>
   <h3 id={`mega-category-title-${service.slug}`}><Link href={`/services/${service.slug}`} onClick={onNavigate} aria-current={current(`/services/${service.slug}`)}><span aria-hidden="true">{service.number}</span>{service.name}</Link></h3>
   <ul>{service.offerings.map(offering=>{const href=`/services/${service.slug}/${offering.slug}`;return <li key={offering.slug}><Link href={href} onClick={onNavigate} aria-label={offering.name} aria-current={current(href)}>{offering.name.replace(/^Shopify\s+/,'')}</Link></li>;})}</ul>
  </section>)}</div>
 </div>;
}
