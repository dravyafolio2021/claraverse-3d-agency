'use client';
import Link from 'next/link';
import {useState} from 'react';
import {articles} from '@/lib/site-content';
import {articleDirections,articleMinutes} from '@/lib/editorial';
import {ServiceArtwork} from './ServiceArtwork';

/** A direct reading index; the shared preview responds to pointer and keyboard focus. */
export function InsightsMegaMenu({pathname,onNavigate}:{pathname:string;onNavigate:()=>void}){
 const [previewSlug,setPreviewSlug]=useState(()=>articles.find(article=>pathname===`/insights/${article.slug}`)?.slug??articles[0].slug);
 const preview=articles.find(article=>article.slug===previewSlug)??articles[0];
 return <div className="insights-menu">
  <div className="insights-menu__intro">
   <div><span className="eyebrow">Studio journal</span><h2>A clearer perspective.</h2></div>
   <p>Ideas for a better-connected commerce business.</p>
   <Link className="insights-menu__all" href="/insights" onClick={onNavigate} aria-current={pathname==='/insights'?'page':undefined}>All insights</Link>
  </div>
  <ul className="insights-menu__list">
   {articles.map(article=>{
    const href=`/insights/${article.slug}`;
    return <li key={article.slug}>
     <Link className="insights-menu__story" href={href} onClick={onNavigate} onPointerEnter={event=>{if(event.pointerType==='mouse')setPreviewSlug(article.slug);}} onFocus={()=>setPreviewSlug(article.slug)} data-previewed={previewSlug===article.slug} aria-current={pathname===href?'page':undefined}>
      <span className="insights-menu__topic">{article.category}</span>
      <h3>{article.title.charAt(0).toUpperCase()+article.title.slice(1)}</h3>
      <span className="insights-menu__time">{articleMinutes(article)} min read</span>
     </Link>
    </li>;
   })}
  </ul>
  <div className="insights-menu__preview" aria-hidden="true">
   <div className="insights-menu__art">
    {articles.map(article=><div className="insights-menu__art-layer" key={article.slug} data-active={previewSlug===article.slug}><ServiceArtwork shape={articleDirections[article.slug].shape} sizes="180px"/></div>)}
   </div>
   <span className="insights-menu__preview-label">{articleDirections[preview.slug].label}</span>
   <p>{preview.summary}</p>
  </div>
 </div>;
}
