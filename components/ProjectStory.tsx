import Link from 'next/link';
import type {CSSProperties} from 'react';
import {projects} from '@/lib/site-content';
import {portfolioDirections,portfolioSceneStyle} from '@/lib/portfolio-content';
import {projectStories} from '@/lib/project-stories';
import {Heading} from './Heading';
import {ProjectJourney} from './ProjectJourney';
import {ProjectStoryMotion} from './ProjectStoryMotion';

type Project=typeof projects[number];

function StorefrontCover({project}:{project:Project}){
 const direction=portfolioDirections[project.slug];
 return <div className="case-cover" data-nav-surface="dark" style={portfolioSceneStyle(project.slug)}>
  <div className="case-cover__image case-parallax" aria-hidden="true"><div className="folio-scene"/></div>
  <div className="case-cover__signature" aria-hidden="true"><span>{direction.category}</span><p>{direction.line}</p></div>
  <div className="case-cover__window" aria-hidden="true"><div className="case-cover__bar"><b>{project.name}</b><span>collection&nbsp;&nbsp; our world</span><span>bag (0)</span></div><div className="case-cover__shop"><div className="folio-scene"/><div><span>{direction.category}</span><p>{direction.line}</p><small>explore the collection</small></div></div><div className="case-cover__foot"><span>considered in every detail.</span><span>claraverse / concept series</span></div></div>
  <span className="case-cover__stamp">A commerce direction by Claraverse</span>
 </div>;
}

export function ProjectStory({project}:{project:Project}){
 const story=projectStories[project.slug];
 const direction=portfolioDirections[project.slug];
 const next=projects[(projects.findIndex(item=>item.slug===project.slug)+1)%projects.length];
 return <ProjectStoryMotion key={project.slug}><article className={`case-study case-study--${project.slug}`} style={{'--case-accent':story.accent} as CSSProperties}>
  <header className="case-opening case-inset">
   <div className="case-opening__eyebrow"><Link href="/work">All work</Link><span>Concept series / {project.sector}</span></div>
   <div className="case-opening__title"><Heading as="h1" mode="load">{project.name}</Heading><div><span className="case-kicker">The idea</span><p>{story.headline}</p></div></div>
   <div className="case-opening__meta"><dl><div><dt>Focus</dt><dd>{project.sector}</dd></div><div><dt>Our perspective</dt><dd>Experience + connected commerce</dd></div><div><dt>Scope</dt><dd>{direction.scope.join(' · ')}</dd></div></dl><p>Original concept study.<br/>A design direction, not a commissioned client project.</p></div>
  </header>
  <figure className="case-hero"><StorefrontCover project={project}/><figcaption><span>01 / The creative direction</span><span>{project.label}</span></figcaption></figure>

  <section id="brief" className="case-chapter case-inset">
   <div className="case-chapter__label"><span className="eyebrow">01 / The brief</span><span className="case-kicker">The question behind the experience</span></div>
   <div className="case-brief"><Heading>{project.problem}</Heading><div><p>{story.premise}</p><p className="case-brief__intent">{project.approach}</p></div></div>
   <div className="case-shift"><div><span className="case-kicker">The starting point</span><p>{story.shift[0]}</p></div><div><span className="case-kicker">The direction</span><p>{story.shift[1]}</p></div></div>
  </section>

  <section id="direction" className="case-chapter case-inset">
   <div className="case-chapter__label"><span className="eyebrow">02 / The decisions</span><span className="case-kicker">Every detail needs a reason</span></div>
   <div className="case-section-heading"><Heading>The thinking takes shape.</Heading><p>Three decisions that give the direction its character—and the experience its purpose.</p></div>
   <div className="case-direction-board" data-nav-surface="light" style={portfolioSceneStyle(project.slug)}><div className="case-direction-board__image" data-nav-surface="dark" aria-hidden="true"><div className="folio-scene"/><span>{direction.category}</span></div><div className="case-direction-board__specimen"><span className="case-kicker">Visual direction / {project.name}</span><span className="case-direction-board__word" aria-hidden="true">{project.name}</span><p>{direction.line}</p><div className="case-direction-board__palette" aria-hidden="true"><i/><i/><i/></div><span className="case-direction-board__note">Character in the foreground.<br/>Clarity in every detail.</span></div></div>
   <div className="case-decisions">{story.decisions.map((decision,index)=><div className="case-decision" key={decision.title}><span className="case-decision__number">0{index+1}</span><h3>{decision.title}</h3><div><p>{decision.reason}</p><p><span className="case-kicker">The design move</span>{decision.move}</p></div></div>)}</div>
  </section>

  <section id="experience" className="case-chapter case-experience">
   <div className="case-inset"><div className="case-chapter__label"><span className="eyebrow">03 / The experience</span><span className="case-kicker">Follow the customer</span></div><div className="case-section-heading"><Heading>Every step, considered.</Heading><p>Explore four moments, from first impression to the next interaction.</p></div></div>
   <ProjectJourney slug={project.slug} name={project.name} stages={story.journey}/>
  </section>

  <section id="operation" className="case-chapter case-inset">
   <div className="case-chapter__label"><span className="eyebrow">04 / The operation</span><span className="case-kicker">The intelligence underneath</span></div>
   <div className="case-section-heading"><Heading>What makes the experience work.</Heading><p>The storefront is one expression of the business. This proposed operating model connects the information and decisions behind it.</p></div>
   <div className="case-system"><div className="case-system__core"><span className="case-kicker">Commerce foundation</span><span className="case-system__brand">{project.name}</span><p>Customer experience<br/><span>connected to the operation</span></p></div><ol className="case-system__nodes">{story.operations.map((operation,index)=><li key={operation.name}><span className="case-system__dot" aria-hidden="true"/><span className="case-kicker">0{index+1}</span><h3>{operation.name}</h3><p>{operation.copy}</p></li>)}</ol><p className="case-system__note">Proposed relationships · implementation and integration scope to be defined against a real business.</p></div>
  </section>

  <section id="validation" className="case-chapter case-inset case-validation">
   <div className="case-chapter__label"><span className="eyebrow">05 / The next step</span><span className="case-kicker">From direction to evidence</span></div>
   <div className="case-section-heading"><Heading>A direction worth testing.</Heading><p>Good execution needs evidence. These are the questions we would take into testing before calling this concept a working business solution.</p></div>
   <div className="case-validation__grid">{story.validation.map((item,index)=><div key={item.title}><span className="case-kicker">0{index+1} / What we would validate</span><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
   <div className="case-takeaway"><span className="case-kicker">The point of view</span><p>{story.headline}</p><Link href="/quote" className="text-link">Let’s shape your commerce</Link></div>
  </section>
 </article>
 <aside className="case-next case-inset" aria-labelledby="case-next-title"><div className="case-next__heading"><span className="eyebrow">Keep exploring</span><Link href="/work" className="text-link">All work</Link></div><Link href={`/work/${next.slug}`} className="case-next__link" data-nav-surface="dark" style={portfolioSceneStyle(next.slug)} aria-label={`Next concept: ${next.name}, ${next.sector}`}><div className="case-next__image case-parallax" aria-hidden="true"><div className="folio-scene"/></div><div><span className="case-kicker">Next story / {next.sector}</span><Heading id="case-next-title">{next.name}</Heading><p>{projectStories[next.slug].headline}</p><span className="case-next__action">Explore the story</span></div></Link></aside>
 </ProjectStoryMotion>;
}
