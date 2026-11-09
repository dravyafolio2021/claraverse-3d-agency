import Link from 'next/link';
import {industries} from '@/lib/site-content';
import {studioPrinciples,studioProcess,studioEngagements} from '@/lib/studio-story';
import {industryPages} from '@/lib/industry-pages';
import {portfolioSceneStyle} from '@/lib/portfolio-content';
import {Heading} from './Heading';
import {StudioCounters} from './StudioCounters';
import {ServiceArtwork} from './ServiceArtwork';
import {AboutPageMotion} from './AboutPageMotion';

export function AboutPage(){
 return <AboutPageMotion>
  <header className="about-opening">
   <span className="eyebrow">About Claraverse / Shopify Studio</span>
   <Heading as="h1" mode="load">Independent minds.<br/>Connected commerce.</Heading>
   <div className="about-opening__context"><div className="about-opening__signature"><span aria-hidden="true">✳</span><p>Design. Systems. Intelligence.<br/>{' '}Considered together.</p></div><div><p>We’re an ecommerce intelligence agency for Beauty, Fashion, Wellness and Petcare. We connect the experience your customers see with the architecture, integrations and everyday operations that make it possible.</p><Link href="/quote" className="text-link">Let’s talk about your business</Link></div></div>
  </header>

  <section className="interior-section about-perspective" aria-labelledby="about-perspective-title">
   <span className="eyebrow">Our priority</span><div><Heading id="about-perspective-title">Your business, considered as a whole.</Heading><div className="about-perspective__copy"><p>A compelling storefront starts a relationship. Clear product information, reliable availability and connected fulfilment help carry it through. We bring those decisions into the same conversation.</p><p>We work with your team to understand how the business runs, make the next step clear and build an experience the operation can support.</p></div></div>
  </section>

  <section className="interior-section about-numbers" aria-label="Claraverse studio figures"><StudioCounters/></section>

  <section className="interior-section about-principles" aria-labelledby="about-principles-title">
   <div className="interior-section__heading"><div><span className="eyebrow">What brings the work together</span><Heading id="about-principles-title">Good thinking.<br/>Followed through.</Heading></div><p>Six principles that connect the thinking to the work.</p></div>
   <div className="about-principles__grid">{studioPrinciples.map(principle=><article key={principle.number} data-about-scene><div className={`about-principle__visual about-principle__visual--${principle.number}`}><span className="eyebrow">{principle.number} / {principle.theme}</span><div className="about-principle__art" data-studio-parallax aria-hidden="true"><ServiceArtwork shape={principle.shape} sizes="(max-width: 700px) 240px, 320px"/></div><div className="about-principle__signals" aria-label={`${principle.theme} in practice`}>{principle.signals.map(signal=><span key={signal}>{signal}</span>)}</div></div><div className="about-principle__caption"><Heading as="h3">{principle.title}</Heading><p>{principle.copy}</p></div></article>)}</div>
   <Link href="/services" className="text-link about-section-link">Explore our services</Link>
  </section>

  <section className="interior-section about-process" aria-labelledby="about-process-title">
   <div className="interior-section__heading"><div><span className="eyebrow">A way forward</span><Heading id="about-process-title">A clear path.<br/>Room to adapt.</Heading></div><p>Agree the important milestones and responsibilities early. Shape the sequence around your business, the dependencies and what the work reveals.</p></div>
   <ol>{studioProcess.map(step=><li key={step.number}><div className="about-process__name"><span className="eyebrow">{step.number}</span><Heading as="h3">{step.name}</Heading></div><div className="about-process__story"><h4>{step.line}</h4><p>{step.copy}</p><Link href={step.href} className="text-link">{step.link}</Link></div><div className="about-process__outputs"><span className="eyebrow">What takes shape</span><ul>{step.outputs.map(output=><li key={output}>{output}</li>)}</ul></div></li>)}</ol>
  </section>

  <section className="interior-section about-worlds" aria-labelledby="about-worlds-title">
   <div className="interior-section__heading"><div><span className="eyebrow">A focused practice</span><Heading id="about-worlds-title">Four worlds.<br/>A connected perspective.</Heading></div><p>Four sectors. Distinct customer needs. One connected approach.</p></div>
   <nav className="about-worlds__grid" aria-label="Claraverse industry specialisms">{industries.map((industry,index)=>{const art=industryPages[industry.slug];return <Link href={`/industries/${industry.slug}`} key={industry.slug} className={`about-worlds__tile about-worlds__tile--${industry.slug}`} style={art.project?portfolioSceneStyle(art.project):undefined} data-about-scene><div className="about-worlds__image" data-studio-parallax aria-hidden="true">{art.project?<div className="folio-scene"/>:<ServiceArtwork shape={art.shape} sizes="(max-width: 700px) 380px, 640px"/>}</div><span className="eyebrow">0{index+1} / Our specialisms</span><div className="about-worlds__caption"><span className="about-worlds__name">{industry.name}</span><span className="about-worlds__line">{industry.headline}</span><span className="about-worlds__action">Explore the industry</span></div></Link>;})}</nav>
  </section>

  <section className="interior-section about-engagements" aria-labelledby="about-engagements-title">
   <div className="interior-section__heading"><div><span className="eyebrow">Working together</span><Heading id="about-engagements-title">The right shape<br/>for the work ahead.</Heading></div><p>A focused outcome, connected workstreams or a cycle of improvement.</p></div>
   <div className="about-engagements__grid">{studioEngagements.map(engagement=><article key={engagement.number} data-about-scene><div className={`about-engagement__visual about-engagement__visual--${engagement.number}`}><span className="eyebrow">{engagement.number} / A way to work</span><div className="about-engagement__art" data-studio-parallax aria-hidden="true"><ServiceArtwork shape={engagement.shape} sizes="(max-width: 700px) 260px, 340px"/></div><ol className="about-engagement__flow" aria-label={`${engagement.name} workflow`}>{engagement.steps.map(step=><li key={step}>{step}</li>)}</ol></div><div className="about-engagement__caption"><Heading as="h3">{engagement.name}</Heading><p className="about-engagements__for">{engagement.for}</p><p>{engagement.copy}</p></div></article>)}</div>
   <div className="about-engagements__note"><p>Scope, responsibilities and terms are agreed together.</p><Link href="/quote" className="text-link">Discuss your scope</Link></div>
  </section>
 </AboutPageMotion>;
}
