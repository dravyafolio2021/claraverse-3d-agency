'use client';
import type { CSSProperties } from 'react';
import type { MarketRegion } from '@/lib/order-events';

const markets: {id:MarketRegion;label:string;short:string;note:string;color:string;angle:string}[]=[
 {id:'global',label:'All markets',short:'The world',note:'good things travel',color:'#d8cbff',angle:'-4deg'},
 {id:'usa',label:'United States',short:'USA',note:'coast to coast',color:'#ffe2ae',angle:'2.5deg'},
 {id:'europe',label:'Europe',short:'Europe',note:'across borders',color:'#bbdcf7',angle:'-2.5deg'},
 {id:'india',label:'India',short:'India',note:'big city energy',color:'#cbff65',angle:'4deg'},
];
function MarketDoodle({market}:{market:MarketRegion}){
 return <svg viewBox="0 0 64 60" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {market==='global'?<><circle cx="30" cy="29" r="20"/><ellipse cx="30" cy="29" rx="9" ry="20"/><path d="M12 22c10 5 25 5 36 0M12 36c10-4 25-4 36 0M5 47c13 6 41-5 53-24M51 9l2-5 2 5 5 2-5 2-2 5-2-5-5-2z"/><path d="m5 16 3-1M49 50l3 3"/></>:null}
  {market==='usa'?<><path d="M6 48h51M10 48V29h12v19M14 29v-7h4v7M16 22v-6M25 48V17h14v31M28 17v-5h8v5M32 12V5M43 48V32h11v16M14 35h4m-4 6h4m11-17h6m-6 7h6m-6 7h6m11 0h4m-4 5h4"/><path d="m48 7 1.5 4.5H54l-3.7 2.7 1.4 4.4-3.7-2.7-3.7 2.7 1.4-4.4-3.7-2.7h4.5zM6 54c13-3 34 3 49-1"/></>:null}
  {market==='europe'?<><path d="M9 48h46M13 48V28c0-10 9-17 19-17s19 7 19 17v20M23 48V30c0-5 4-9 9-9s9 4 9 9v18M13 28h10m18 0h10M27 11V6h10v5M9 53c13-2 31 2 45 0M18 18l5 5m18-5-4 5M6 20l-3-3m51-5 3-3"/><circle cx="51" cy="5" r="2"/><path d="M30 33v15h6V33"/></>:null}
  {market==='india'?<><path d="M8 49h48M13 49V30h38v19M17 30c0-8 8-11 15-17 7 6 15 9 15 17M32 13V6M28 7h8M25 49V38a7 7 0 0 1 14 0v11M8 49V35m48 14V35M18 36v5m28-5v5"/><circle cx="51" cy="12" r="4"/><path d="m51 3 0-2m7 5 2-2m0 8h3M9 19l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM11 54c10-3 27 2 42-1"/></>:null}
 </svg>;
}
export function MarketStickers({value,onChange}:{value:MarketRegion;onChange:(region:MarketRegion)=>void}){
 return <div className="market-stickers" role="group" aria-label="Explore our core markets">{markets.map(market=><button className={`market-sticker market-sticker--${market.id}`} key={market.id} type="button" aria-label={market.label} aria-pressed={value===market.id} onClick={()=>onChange(market.id)} style={{'--sticker-color':market.color,'--sticker-angle':market.angle} as CSSProperties}>
  <span className="market-sticker__art"><MarketDoodle market={market.id}/></span>
  <span className="market-sticker__copy"><span className="market-sticker__title market-sticker__title--wide">{market.label}</span><span className="market-sticker__title market-sticker__title--small">{market.short}</span><span className="market-sticker__note">{market.note}</span></span>
  <span className="market-sticker__spark" aria-hidden="true">✳</span>
 </button>)}</div>;
}
