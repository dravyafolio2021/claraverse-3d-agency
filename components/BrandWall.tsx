import Link from 'next/link';
import {brandWallBrands} from '@/lib/client-brands';
import {Heading} from './Heading';
import {BrandMark} from './BrandMark';

export function BrandWall(){
 return <section id="next" className="brand-wall" aria-labelledby="brand-wall-title" aria-describedby="brand-wall-note"><div className="brand-wall__intro"><span className="eyebrow">independent minds. connected commerce.</span><Heading id="brand-wall-title">We bring design, systems and intelligence together to help ambitious commerce businesses run better.</Heading><div className="brand-wall__aside"><p>A team for the experience your customers see.<br/>And the operation that makes it possible.</p><Link className="text-link" href="/about">Meet the studio <span>↗</span></Link></div></div><ul className="brand-wall__grid" aria-label="Placeholder brand identities">{brandWallBrands.map(brand=><li className={`client-wordmark client-wordmark--${brand.style}`} key={brand.name}><BrandMark brand={brand}/></li>)}</ul><div className="brand-wall__foot"><span>different worlds. shared ambition.</span><p id="brand-wall-note">Placeholder identities · approved client logos to follow.</p></div></section>;
}
