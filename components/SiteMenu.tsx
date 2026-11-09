'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {services,industries,articles} from '@/lib/site-content';
import {ServicesMegaMenu} from './ServicesMegaMenu';
import {InsightsMegaMenu} from './InsightsMegaMenu';

type NavigationGroup={name:string;path:string;summary:string;items:{name:string;path:string;description?:string}[]};
const groups:NavigationGroup[]=[
 {name:'Services',path:'/services',summary:'The strategy, experience and systems behind your commerce operation.',items:services.map(item=>({name:item.name,path:`/services/${item.slug}`}))},
 {name:'Industries',path:'/industries',summary:'Four specialisms. The customer experience and the operation, considered together.',items:industries.map(item=>({name:item.name,path:`/industries/${item.slug}`,description:item.headline}))},
 {name:'Insights',path:'/insights',summary:'Perspectives on building a more connected, efficient commerce business.',items:articles.map(item=>({name:item.title,path:`/insights/${item.slug}`,description:item.category}))},
];

export function SiteMenu({open,onOpen,onClose}:{open:boolean;onOpen:()=>void;onClose:()=>void}){
 const [active,setActive]=useState<string|null>(null);
 const host=useRef<HTMLDivElement>(null),toggle=useRef<HTMLButtonElement>(null),back=useRef<HTMLButtonElement>(null),triggers=useRef<Record<string,HTMLButtonElement|null>>({});
 const pathname=usePathname();
 const closeTimer=useRef<number|null>(null),openedByHover=useRef(false),focusFrame=useRef(0);
 const focusSoon=(target:()=>HTMLElement|null|undefined)=>{cancelAnimationFrame(focusFrame.current);focusFrame.current=requestAnimationFrame(()=>target()?.focus({preventScroll:true}));};
 const cancelClose=()=>{if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}};
 const desktopHover=()=>window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)').matches;
 const close=()=>{cancelClose();openedByHover.current=false;setActive(null);onClose();};
 const preview=(name:string)=>{
  if(!desktopHover())return;
  cancelClose();
  if(open&&active===name)return;
  openedByHover.current=true;setActive(name);onOpen();
 };
 const leave=()=>{
  if(!desktopHover()||!openedByHover.current)return;
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
 useEffect(()=>()=>{if(closeTimer.current!==null)window.clearTimeout(closeTimer.current);cancelAnimationFrame(focusFrame.current);},[]);
 useEffect(()=>{
  const media=window.matchMedia('(min-width: 761px)');
  const reset=()=>{
   if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}
   const restoreFocus=Boolean(host.current?.contains(document.activeElement));
   openedByHover.current=false;setActive(null);onClose();
   if(restoreFocus)focusSoon(()=>media.matches?host.current?.querySelector<HTMLAnchorElement>('a.site-menu__trigger'):toggle.current);
  };
  media.addEventListener('change',reset);return()=>media.removeEventListener('change',reset);
 },[onClose]);
 useEffect(()=>{if(open&&active&&window.matchMedia('(max-width: 760px)').matches)back.current?.focus({preventScroll:true});},[open,active]);
 useEffect(()=>{if(!open){setActive(null);openedByHover.current=false;if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}}},[open]);
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{if(!host.current?.contains(event.target as Node)){if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}openedByHover.current=false;onClose();}};
  const escape=(event:KeyboardEvent)=>{
   if(event.key!=='Escape')return;
   event.preventDefault();
   if(closeTimer.current!==null){window.clearTimeout(closeTimer.current);closeTimer.current=null;}
   openedByHover.current=false;
   if(active){const previous=active;setActive(null);focusSoon(()=>triggers.current[previous]);if(!toggle.current?.getClientRects().length)onClose();}
   else{onClose();const next=toggle.current?.getClientRects().length?toggle.current:host.current?.querySelector<HTMLAnchorElement>('a.site-menu__trigger');next?.focus();}
  };
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[open,active,onClose]);
 const select=(name:string)=>{
  cancelClose();
  // The first click confirms a hover-opened category instead of closing it.
  if(open&&active===name&&openedByHover.current){openedByHover.current=false;return;}
  openedByHover.current=false;
  if(active===name){setActive(null);if(!toggle.current?.getClientRects().length)onClose();}
  else{setActive(name);onOpen();}
 };
 const enterCategory=(name:string)=>{
  cancelClose();openedByHover.current=false;setActive(name);onOpen();
  focusSoon(()=>host.current?.querySelector<HTMLAnchorElement>(`#nav-${name} a`));
 };
 const returnToPrimary=()=>{
  const previous=active;cancelClose();openedByHover.current=false;setActive(null);
  if(previous)focusSoon(()=>triggers.current[previous]);
 };
 const current=(path:string)=>pathname===path?'page' as const:undefined;
 return <div className="site-menu" ref={host} onPointerEnter={cancelClose} onPointerLeave={event=>{if(event.pointerType==='mouse')leave();}} onBlur={event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget as Node))close();}}>
  <button ref={toggle} type="button" className="site-menu__toggle" aria-expanded={open} aria-controls="primary-navigation" aria-label={open?'Close navigation menu':'Open navigation menu'} onClick={()=>{cancelClose();openedByHover.current=false;setActive(null);if(open)onClose();else onOpen();}}><span className="site-menu__label">{open?'Close':'Menu'}</span><span className="site-menu__icon" aria-hidden="true"><span/><span/></span></button>
  <nav id="primary-navigation" className={`site-menu__navigation${open?' is-open':''}`} data-active={Boolean(open&&active)} data-mega={open&&active==='Services'} aria-label="Main navigation">
   <div className="site-menu__primary">
    <Link className="site-menu__trigger" href="/work" data-current={pathname.startsWith('/work')} onPointerEnter={event=>{if(event.pointerType==='mouse')leaveCategory();}} onClick={close} aria-current={current('/work')}>Work</Link>
    {groups.map((group,index)=><div className="site-menu__item" key={group.name}>
     {index===2&&<Link className="site-menu__trigger" href="/about" onPointerEnter={event=>{if(event.pointerType==='mouse')leaveCategory();}} onClick={close} aria-current={current('/about')}>About</Link>}
     <button id={`nav-trigger-${group.name}`} ref={element=>{triggers.current[group.name]=element;}} type="button" className="site-menu__trigger" data-current={pathname===group.path||pathname.startsWith(`${group.path}/`)} aria-expanded={open&&active===group.name} aria-controls={`nav-${group.name}`} onPointerEnter={event=>{if(event.pointerType==='mouse')preview(group.name);}} onClick={()=>select(group.name)} onKeyDown={event=>{if(event.key!=='ArrowRight')return;event.preventDefault();enterCategory(group.name);}}>{group.name}<span aria-hidden="true" className="site-menu__expand"/></button>
    </div>)}
   </div>
   <div className="site-menu__secondary" data-mega={open&&active==='Services'} hidden={!open||!active} onPointerEnter={cancelClose}>
    <button className="site-menu__back" ref={back} type="button" aria-label="Back to main navigation" onClick={returnToPrimary}><span><i aria-hidden="true"/>Back</span><span>{active}</span></button>
    {groups.map(group=><div className={`site-menu__panel${group.name==='Services'?' site-menu__panel--services':group.name==='Insights'?' site-menu__panel--insights':''}`} id={`nav-${group.name}`} key={group.name} role="region" aria-labelledby={`nav-trigger-${group.name}`} hidden={!open||active!==group.name} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();if(window.matchMedia('(max-width: 760px)').matches)returnToPrimary();else triggers.current[group.name]?.focus();}}}>
     {group.name==='Services'?<ServicesMegaMenu pathname={pathname} onNavigate={close}/>:group.name==='Insights'?<InsightsMegaMenu pathname={pathname} onNavigate={close}/>:<><div className="site-menu__intro"><span className="eyebrow">Our specialisms</span><Link className="menu-overview" href={group.path} onClick={close} aria-current={current(group.path)}>Know your world.</Link><p>{group.summary}</p><Link className="site-menu__all" href={group.path} onClick={close}>All {group.name.toLowerCase()}</Link></div>
     <div className="menu-links">{group.items.map((item,index)=><Link key={item.path} href={item.path} onClick={close} aria-current={current(item.path)}><span className="menu-links__index" aria-hidden="true">0{index+1}</span><span className="menu-links__name">{item.name}</span>{item.description?<small>{item.description}</small>:null}</Link>)}</div></>}
    </div>)}
   </div>
  </nav>
 </div>;
}
