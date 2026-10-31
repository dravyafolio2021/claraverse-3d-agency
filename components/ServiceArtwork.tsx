import Image from 'next/image';
import type {CapabilityShape} from '@/lib/capabilities';

/** Commissioned-style sculpture assets, contained independently of the text grid. */
export function ServiceArtwork({shape,sizes='(max-width: 420px) 112px, (max-width: 760px) 140px, (max-width: 1100px) 280px, 350px'}:{shape:CapabilityShape;sizes?:string}){
 return <Image className="service-artwork" src={`/services/${shape}-sculpture-v1.webp`} alt="" width={720} height={720} sizes={sizes} loading="lazy"/>;
}
