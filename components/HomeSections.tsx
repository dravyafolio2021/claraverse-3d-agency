import Link from 'next/link';
import {services,projects} from '@/lib/site-content';
import {ProjectArt} from './ProjectArt';
import {MotionReveal} from './MotionReveal';
import {SiteFooter} from './PageShell';
export function HomeSections(){return <MotionReveal>
 <section id="next" className="section studio-intro" data-reveal><span className="eyebrow">01 / independent commerce thinking</span><h2>the storefront is just<br/><span>the beginning.</span></h2><div className="intro-columns"><p>We architect the operation behind the experience. Shopify, ERP, inventory, fulfilment, customer data and AI — connected into a system that helps your business run clearly, efficiently and across markets.</p><Link className="text-link" href="/about">Meet Claraverse ↗</Link></div></section>
 <section className="section services-section"><div className="section-heading" data-reveal><span className="eyebrow">02 / what we do</span><h2>intelligence, built into<br/><span>the operation.</span></h2></div><div>{services.map(service=><Link href={`/services/${service.slug}`} className="service-row" data-reveal key={service.slug}><span>{service.number}</span><h3>{service.name}</h3><span className="row-arrow">↗</span></Link>)}</div></section>
 <section className="section"><div className="section-heading split-heading" data-reveal><div><span className="eyebrow">03 / commerce explorations</span><h2>different worlds.<br/><span>the same care.</span></h2></div><Link className="text-link" href="/work">Explore the concepts ↗</Link></div><div className="project-grid">{projects.slice(0,2).map(project=><Link href={`/work/${project.slug}`} className="project-link" data-reveal key={project.slug}><div className="moving-border"><ProjectArt name={project.name} tone={project.tone}/></div><div className="project-caption"><h3>{project.name}</h3><span>concept study / {project.sector} ↗</span></div></Link>)}</div><p className="small-note">Original concept studies, created to explore our approach. These are not client commissions.</p></section>
 <SiteFooter/>
 </MotionReveal>;}
