import Link from 'next/link';
import {PageShell,PageIntro} from '@/components/PageShell';
import {articles} from '@/lib/site-content';
export const metadata={title:'Insights — claraverse'};
export default function Insights(){return <PageShell><PageIntro eyebrow="05 / insights" title="thinking beyond the storefront." description="Notes on ecommerce engineering, customer experience and building systems that make sense."/><section className="section article-list">{articles.map((article,index)=><Link className="detail-row" href={`/insights/${article.slug}`} data-reveal key={article.slug}><span className="eyebrow">0{index+1} / {article.category}</span><div><h2>{article.title}</h2><p>{article.summary}</p></div><span className="row-arrow">↗</span></Link>)}</section></PageShell>;}
