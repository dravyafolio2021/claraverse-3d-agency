import type {ClientBrand} from '@/lib/client-brands';

export function BrandSymbol({symbol}:{symbol:string}){
 return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
  {symbol==='compass'?<><path d="m20 3 4.5 12.5L37 20l-12.5 4.5L20 37l-4.5-12.5L3 20l12.5-4.5z" fill="currentColor" stroke="none"/><circle cx="20" cy="20" r="3" fill="var(--ink)" stroke="none"/></>:null}
  {symbol==='sun'?<><circle cx="20" cy="20" r="10"/><path d="M20 1v5m0 28v5M1 20h5m28 0h5M6.5 6.5l3.5 3.5m20 20 3.5 3.5M6.5 33.5l3.5-3.5m20-20 3.5-3.5"/></>:null}
  {symbol==='slash'?<><path d="M4 30 17 8h8L12 30zm15 0L32 8h5L24 30z" fill="currentColor" stroke="none"/></>:null}
  {symbol==='petal'?<><ellipse cx="20" cy="20" rx="7" ry="17"/><ellipse cx="20" cy="20" rx="7" ry="17" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="7" ry="17" transform="rotate(120 20 20)"/></>:null}
  {symbol==='field'?<><path d="M5 6h30v28H5zM5 15h30M5 24h30M15 6v28M25 6v28"/></>:null}
  {symbol==='orbit'?<><circle cx="20" cy="20" r="7" fill="currentColor" stroke="none"/><ellipse cx="20" cy="20" rx="18" ry="10" transform="rotate(-35 20 20)"/></>:null}
 </svg>;
}

export function BrandMark({brand}:{brand:ClientBrand}){return brand.logo?<img src={brand.logo} alt={brand.name} width="150" height="44"/>:<><BrandSymbol symbol={brand.symbol}/><span>{brand.name}</span></>;}
