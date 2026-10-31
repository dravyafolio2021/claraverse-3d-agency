import type {CSSProperties} from 'react';

export const portfolioDirections:Record<string,{line:string;category:string;scope:string[];scene:number;sheet:string}>={
 form:{line:'everyday, reimagined.',category:'the everyday collection',scope:['Brand experience','Collection architecture','Connected inventory'],scene:0,sheet:'/portfolio/commerce-scenes-v1.webp'},
 ritual:{line:'a little more ritual.',category:'care, with intention',scope:['Routine-led discovery','Product intelligence','Replenishment journeys'],scene:1,sheet:'/portfolio/commerce-scenes-v1.webp'},
 dwelling:{line:'space to feel at home.',category:'objects for slower living',scope:['Considered discovery','Structured product data','Delivery experience'],scene:2,sheet:'/portfolio/commerce-scenes-v1.webp'},
 gather:{line:'a better daily ritual.',category:'small-batch, well considered',scope:['Subscriptions','Product provenance','Repeat-order journeys'],scene:0,sheet:'/portfolio/commerce-scenes-v2.webp'},
 signal:{line:'feel every detail.',category:'sound, without compromise',scope:['Product comparison','Technical product data','Connected support'],scene:1,sheet:'/portfolio/commerce-scenes-v2.webp'},
 terrain:{line:'take the long way.',category:'equipment for the outside',scope:['Activity-led discovery','Product variants','Seasonal inventory'],scene:2,sheet:'/portfolio/commerce-scenes-v2.webp'},
};

export function portfolioSceneStyle(slug:string):CSSProperties{
 const {scene,sheet}=portfolioDirections[slug]??portfolioDirections.form;
 return {'--scene-x':`${scene*50}%`,'--scene-index':scene,'--scene-image':`url("${sheet}")`} as CSSProperties;
}

// A six-file fan stays bounded: the opposite file rests behind the centre
// instead of pushing a third position beyond the right edge.
export function folderPlacement(index:number,active:number,count:number){
 let distance=(index-active+count)%count;
 if(distance>count/2)distance-=count;
 const opposite=count%2===0&&distance===count/2;
 const slot=opposite?.3:distance,depth=Math.abs(distance);
 return {x:slot*34,angle:opposite?-3:slot*5,y:depth*13,layer:10-depth,depth};
}
