'use client';
import Link from 'next/link';
import { useEffect,useRef,useState } from 'react';
import {services,industries,articles} from '@/lib/site-content';
const groups=[{name:'Services',path:'/services',items:services.map(x=>({name:x.name,path:`/services/${x.slug}`}))},{name:'Industries',path:'/industries',items:industries.map(x=>({name:x.name,path:`/industries/${x.slug}`}))},{name:'Insights',path:'/insights',items:articles.map(x=>({name:x.title,path:`/insights/${x.slug}`}))}];
export function SiteMenu(){
 const [mobile,setMobile]=useState(false),[active,setActive]=useState<string|null>(null);
 const host=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null),triggers=useRef<Record<string,HTMLButtonElement|null>>({});
 const close=()=>{setMobile(false);setActive(null);};
 useEffect(()=>{const outside=(event:PointerEvent)=>{if(!host.current?.contains(event.target as Node)){setMobile(false);setActive(null);}};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[]);
 return <div className="site-menu" ref={host} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))close();}} onKeyDown={event=>{if(event.key==='Escape'){if(active){triggers.current[active]?.focus();setActive(null);}else{setMobile(false);toggle.current?.focus();}}}}>
  <button ref={toggle} className="site-menu__toggle" aria-expanded={mobile} aria-controls="primary-navigation" onClick={()=>{setMobile(!mobile);setActive(null);}}>menu <span>{mobile?'−':'+'}</span></button>
  <nav id="primary-navigation" className={`site-menu__navigation${mobile?' is-open':''}`} aria-label="Main navigation">
   <Link className="site-menu__trigger" href="/work" onClick={close}>Work</Link>
   {groups.map((group,index)=><div className="site-menu__item" key={group.name}>
    {index===2&&<Link className="site-menu__trigger about-link" href="/about" onClick={close}>About</Link>}
    <button ref={element=>{triggers.current[group.name]=element;}} className="site-menu__trigger" aria-expanded={active===group.name} aria-controls={`nav-${group.name}`} onClick={()=>setActive(active===group.name?null:group.name)}>{group.name}<span>{active===group.name?'−':'+'}</span></button>
    <div className="site-menu__panel" id={`nav-${group.name}`} hidden={active!==group.name}>
     <div><span className="eyebrow">claraverse / {group.name.toLowerCase()}</span><Link className="menu-overview" href={group.path} onClick={close}>Explore {group.name.toLowerCase()} <span>↗</span></Link><p>Considered thinking. Purposeful design. Commerce engineered around your brand.</p></div>
     <div className="menu-links">{group.items.map(item=><Link key={item.path} href={item.path} onClick={close}>{item.name}<span>↗</span></Link>)}</div>
    </div>
   </div>)}
  </nav>
 </div>;
}
