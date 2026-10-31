import {Heading} from '@/components/Heading';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {PageShell,PageIntro} from '@/components/PageShell';
import {articles} from '@/lib/site-content';
export function generateStaticParams(){return articles.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${articles.find(x=>x.slug===slug)?.title||'Insights'} — claraverse`};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const article=articles.find(x=>x.slug===slug);if(!article)notFound();return <PageShell><PageIntro eyebrow={`studio notes / ${article.category}`} title={article.title} description={article.summary}/><article className="article-body">{article.sections.map(([title,copy])=><section data-reveal key={title}><Heading>{title}</Heading><p>{copy}</p></section>)}<Link className="text-link" href="/insights">← All insights</Link></article></PageShell>;}
