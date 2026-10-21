import Link from 'next/link';
import {SiteHeader} from './SiteHeader';
import {TechnologyLogos} from './TechnologyLogos';
import {MotionReveal} from './MotionReveal';
export function SiteFooter(){return <footer className="site-footer"><div className="footer-pitch"><span className="eyebrow">the next chapter</span><p>let’s build<br/><span>what’s next.</span></p><Link href="/quote" className="text-link">Tell us about your project ↗</Link></div><div className="footer-bottom"><Link href="/" className="footer-brand">claraverse.<small>Shopify Studio</small></Link><TechnologyLogos /><p>independent by design.<br/>commerce architecture & connected operations.</p></div></footer>;}
export function PageShell({children}:{children:React.ReactNode}){return <div className="page-shell"><SiteHeader/><MotionReveal><main className="page-main">{children}</main><SiteFooter/></MotionReveal></div>;}
export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}){return <section className="page-intro" data-reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></section>;}
