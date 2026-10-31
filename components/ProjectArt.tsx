import {portfolioDirections,portfolioSceneStyle} from '@/lib/portfolio-content';
export function ProjectArt({name,tone}:{name:string;tone:string}){
 const direction=portfolioDirections[name];
 return <div className={`project-art project-art--${tone} ${direction?'project-art--photographic':''}`} style={direction?portfolioSceneStyle(name):undefined} aria-label={`${name} conceptual storefront direction`}>
  {direction?<div className="folio-scene" aria-hidden="true"/>:null}
  <div className="art-browser"><i/><i/><i/><span>concept storefront / claraverse</span></div><div className="art-brand">{name}<span>{direction?.category??'objects of intention.'}</span></div>{!direction?<div className="art-object"/>:null}<div className="art-caption"><span>{direction?.line??'designed to be experienced.'}</span><span>discover the collection ↗</span></div>
 </div>;
}
