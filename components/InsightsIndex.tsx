'use client';
import {useState} from 'react';
import Link from 'next/link';
import {articles} from '@/lib/site-content';
import {articleDirections,articleMinutes} from '@/lib/editorial';
import {Heading} from './Heading';
import {ServiceArtwork} from './ServiceArtwork';
const categories=['all',...new Set(articles.map(article=>article.category))];
export function InsightsIndex(){
 const [category,setCategory]=useState('all'),[query,setQuery]=useState('');
 const visible=articles.filter(article=>(category==='all'||article.category===category)&&`${article.title} ${article.summary}`.toLowerCase().includes(query.toLowerCase().trim()));
 return <section className="interior-section insights-library" aria-label="Studio notes"><div className="insights-library__controls"><div role="group" aria-label="Filter notes by topic">{categories.map(item=><button type="button" key={item} aria-pressed={item===category} onClick={()=>setCategory(item)}>{item==='all'?'All notes':item}</button>)}</div><label><span className="sr-only">Search studio notes</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Find a topic"/></label></div><p className="insights-library__count" role="status">{visible.length} {visible.length===1?'note':'notes'} to explore</p><div className="insights-library__grid">{visible.map((article,index)=><Link key={article.slug} href={`/insights/${article.slug}`} className={`insight-card${index===0?' insight-card--feature':''}`}><div className="insight-card__art" aria-hidden="true"><span>{articleDirections[article.slug].label}</span><ServiceArtwork shape={articleDirections[article.slug].shape} sizes="(max-width: 700px) 220px, 360px"/><small>claraverse / studio notes</small></div><div className="insight-card__content"><span className="eyebrow">{article.category} / ~{articleMinutes(article)} min read</span><Heading>{article.title}</Heading><p>{article.summary}</p><span className="text-link">Read the note</span></div></Link>)}</div>{!visible.length?<div className="insights-library__empty"><h2>No notes match this search.</h2><p>Try a different topic or explore all studio notes.</p><button type="button" className="text-link" onClick={()=>{setQuery('');setCategory('all');}}>Show all notes</button></div>:null}</section>;
}
