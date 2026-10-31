import {Heading} from '@/components/Heading';
import Link from 'next/link';
import {PageShell,PageIntro} from '@/components/PageShell';
import {ProjectArt} from '@/components/ProjectArt';
import {projects} from '@/lib/site-content';
export const metadata={title:'Commerce explorations — claraverse'};
export default function Work(){return <PageShell><PageIntro eyebrow="03 / work & explorations" title="commerce with a point of view." description="Original storefront concepts that make our thinking tangible: how a brand feels, how a product is understood and how the journey fits together."/><section className="section project-grid">{projects.map(project=><Link className="project-link" href={`/work/${project.slug}`} data-reveal key={project.slug}><div className="moving-border"><ProjectArt name={project.name} tone={project.tone}/></div><div className="project-caption"><Heading>{project.name}</Heading><span>concept study / {project.sector} ↗</span></div><p>{project.label}</p></Link>)}</section><p className="section small-note">All projects shown here are illustrative concept studies, not client commissions. No client results or performance claims are implied.</p></PageShell>;}
