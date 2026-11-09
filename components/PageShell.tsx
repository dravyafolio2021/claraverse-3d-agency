import {Heading} from '@/components/Heading';
import Link from 'next/link';
import {TechnologyLogos} from './TechnologyLogos';
import {MotionReveal} from './MotionReveal';
import {FooterWordmark} from './FooterWordmark';
import {services} from '@/lib/services';
import {industries} from '@/lib/site-content';
export function SiteFooter(){return <footer id="site-footer" className="site-footer"><div className="footer-pitch"><span className="eyebrow">the next chapter</span><Heading className="footer-pitch__title">let’s build<br/><span>what’s next.</span></Heading><Link href="/quote" className="text-link">Tell us about your project</Link></div><nav className="footer-directory" aria-label="Explore Claraverse"><div><h3>The studio</h3>{[['/work','Work'],['/about','About'],['/insights','Insights'],['/faq','Questions'],['/contact','Contact']].map(([href,label])=><Link href={href} key={href}>{label}</Link>)}</div><div><h3>Services</h3>{services.map(service=><Link href={`/services/${service.slug}`} key={service.slug}>{service.name}</Link>)}</div><div><h3>Industries</h3>{industries.map(industry=><Link href={`/industries/${industry.slug}`} key={industry.slug}>{industry.name}</Link>)}</div></nav><div className="footer-bottom"><span className="footer-studio">Shopify Studio</span><TechnologyLogos /><p>independent by design.<br/>commerce architecture & connected operations.</p></div><FooterWordmark/></footer>;}
export function PageShell({children}:{children:React.ReactNode}){return <div className="page-shell"><MotionReveal><main className="page-main">{children}</main><SiteFooter/></MotionReveal></div>;}
export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}){return <section className="page-intro" data-reveal><span className="eyebrow">{eyebrow}</span><Heading as="h1" mode="load">{title}</Heading><p>{description}</p></section>;}
