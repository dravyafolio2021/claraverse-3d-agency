'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {services,industries,articles} from '@/lib/site-content';

const groups=[
 {name:'Services',path:'/services',summary:'The strategy, experience and systems behind your commerce operation.',items:services.map(item=>({name:item.name,path:`/services/${item.slug}`}))},
 {name:'Industries',path:'/industries',summary:'Commerce shaped around your products, your customers and the way your business works.',items:industries.map(item=>({name:item.name,path:`/industries/${item.slug}`}))},
 {name:'Insights',path:'/insights',summary:'Perspectives on building a more connected, efficient commerce business.',items:articles.map(item=>({name:item.title,path:`/insights/${item.slug}`}))},
];

export function SiteMenu({expanded,open,onOpen,onClose}:{expanded:boolean;open:boolean;onOpen:()=>void;onClose:()=>void}){
 const [active,setActive]=useState<string|null>(null);
 const host=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null),triggers=useRef<Record<string,HTMLButtonElement|null>>({});
 const pathname=usePathname();
 const closeTimer=useRef<number|null>(null),openedByHover=useRef(false);
 const cancelClose=()=>{if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}};
 const desktopHover=()=>window.matchMedia('(min-width: 961px) and (hover: hover) and (pointer: fine)').matches;
 const close=()=>{cancelClose();openedByHover.current=false;setActive(null);onClose();};
 const preview=(name:string)=>{
  if(!desktopHover())return;
  cancelClose();
  if(open&&active===name)return;
  openedByHover.current=true;setActive(name);onOpen();
 };
 const leave=()=>{
  if(!desktopHover())return;
  cancelClose();
  closeTimer.current=window.setTimeout(()=>{
   closeTimer.current=null;
   const focused=document.activeElement;
   // A keyboard user can keep reading the open panel after the pointer leaves.
   if(focused&&host.current?.contains(focused)&&focused.matches(':focus-visible'))return;
   openedByHover.current=false;setActive(null);onClose();
  },220);
 };
 const leaveCategory=()=>{
  if(!desktopHover())return;
  cancelClose();openedByHover.current=false;setActive(null);
  if(!toggle.current?.getClientRects().length)onClose();
 };
 useEffect(()=>()=>{if(closeTimer.current!==null)window.clearTimeout(closeTimer.current);},[]);
 useEffect(()=>{if(!open){setActive(null);openedByHover.current=false;if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}}},[open]);
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{if(!host.current?.contains(event.target as Node)){if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}openedByHover.current=false;onClose();}};
  const escape=(event:KeyboardEvent)=>{
   if(event.key!=='Escape')return;
   event.preventDefault();
   if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}
   openedByHover.current=false;
   if(active){triggers.current[active]?.focus();setActive(null);if(!toggle.current?.getClientRects().length)onClose();}
   else{onClose();const next=toggle.current?.getClientRects().length?toggle.current:host.current?.querySelector<HTMLAnchorElement>('a.site-menu__trigger');next?.focus();}
  };
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[open,active,expanded,onClose]);
 const select=(name:string)=>{
  cancelClose();
  // The first click confirms a hover-opened category instead of closing it.
  if(open&&active===name&&openedByHover.current){openedByHover.current=false;return;}
  openedByHover.current=false;
  if(active===name){setActive(null);if(!toggle.current?.getClientRects().length)onClose();}
  else{setActive(name);onOpen();}
 };
 const current=(path:string)=>pathname===path?'page' as const:undefined;
 return <div className="site-menu" ref={host} onPointerEnter={cancelClose} onPointerLeave={event=>{if(event.pointerType==='mouse')leave();}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))close();}}>
  <button ref={toggle} type="button" className="site-menu__toggle" aria-expanded={open} aria-controls="primary-navigation" aria-label={open?'Close navigation menu':'Open navigation menu'} onClick={()=>{cancelClose();openedByHover.current=false;setActive(null);if(open)onClose();else onOpen();}}><span className="site-menu__label">{open?'Close':'Menu'}</span><span className="site-menu__icon" aria-hidden="true"><span/><span/></span></button>
  <nav id="primary-navigation" className={`site-menu__navigation${open?' is-open':''}`} data-visible={expanded||open} aria-label="Main navigation" inert={!expanded&&!open}>
   <Link className="site-menu__trigger" href="/work" onPointerEnter={event=>{if(event.pointerType==='mouse')leaveCategory();}} onClick={close} aria-current={current('/work')}>Work</Link>
   {groups.map((group,index)=><div className="site-menu__item" key={group.name}>
    {index===2&&<Link className="site-menu__trigger" href="/about" onPointerEnter={event=>{if(event.pointerType==='mouse')leaveCategory();}} onClick={close} aria-current={current('/about')}>About</Link>}
    <button ref={element=>{triggers.current[group.name]=element;}} type="button" className="site-menu__trigger" aria-expanded={open&&active===group.name} aria-controls={`nav-${group.name}`} onPointerEnter={event=>{if(event.pointerType==='mouse')preview(group.name);}} onClick={()=>select(group.name)}>{group.name}<span aria-hidden="true">{open&&active===group.name?'−':'+'}</span></button>
    <div className="site-menu__panel" id={`nav-${group.name}`} onPointerEnter={cancelClose} hidden={!open||active!==group.name}>
     <div className="site-menu__intro"><span className="eyebrow">claraverse / {group.name.toLowerCase()}</span><Link className="menu-overview" href={group.path} onClick={close} aria-current={current(group.path)}>Explore {group.name.toLowerCase()}</Link><p>{group.summary}</p></div>
     <div className="menu-links">{group.items.map(item=><Link key={item.path} href={item.path} onClick={close} aria-current={current(item.path)}>{item.name}</Link>)}</div>
    </div>
   </div>)}
  </nav>
 </div>;
}
