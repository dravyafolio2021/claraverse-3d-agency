import Link from 'next/link';
import {notFound} from 'next/navigation';
import {PageShell,PageIntro} from '@/components/PageShell';
import {ProjectArt} from '@/components/ProjectArt';
import {projects} from '@/lib/site-content';
export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${projects.find(x=>x.slug===slug)?.name||'Work'} — a claraverse concept`};}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(x=>x.slug===slug);if(!project)notFound();return <PageShell><PageIntro eyebrow={`concept study / ${project.sector}`} title={`${project.name}. ${project.label}`} description="An original Claraverse commerce exploration. This is an illustrative design direction, not a commissioned client project."/><section className="section" data-reveal><div className="moving-border"><ProjectArt name={project.name} tone={project.tone}/></div></section><section className="section editorial-split" data-reveal><h2>{project.problem}</h2><div><p className="body-copy">{project.approach}</p><ul className="statement-list">{project.details.map(detail=><li key={detail}>{detail}</li>)}</ul><Link className="text-link" href="/quote">Build a direction for your brand ↗</Link></div></section></PageShell>;}
