import {Heading} from '@/components/Heading';
import Link from 'next/link';
import {SiteHeader} from './SiteHeader';
import {TechnologyLogos} from './TechnologyLogos';
import {MotionReveal} from './MotionReveal';
import {FooterWordmark} from './FooterWordmark';
export function SiteFooter(){return <footer id="site-footer" className="site-footer"><div className="footer-pitch"><span className="eyebrow">the next chapter</span><Heading className="footer-pitch__title">let’s build<br/><span>what’s next.</span></Heading><Link href="/quote" className="text-link">Tell us about your project ↗</Link></div><div className="footer-bottom"><span className="footer-studio">Shopify Studio</span><TechnologyLogos /><p>independent by design.<br/>commerce architecture & connected operations.</p></div><FooterWordmark/></footer>;}
export function PageShell({children}:{children:React.ReactNode}){return <div className="page-shell"><SiteHeader/><MotionReveal><main className="page-main">{children}</main><SiteFooter/></MotionReveal></div>;}
export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}){return <section className="page-intro" data-reveal><span className="eyebrow">{eyebrow}</span><Heading as="h1" mode="load">{title}</Heading><p>{description}</p></section>;}
