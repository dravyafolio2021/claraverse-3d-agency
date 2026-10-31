import { marketRegions, type LatLon, type MarketRegion } from './order-events';
import { networkNodes } from './commerce-network';

// Match the globe's XYZ rotation: longitude turns first, then latitude tilts.
// Project every metro so the regional camera fits the whole operating footprint.
export function projectMarketPoint(location:LatLon,center:LatLon){
 const radians=Math.PI/180,lat=location[0]*radians,longitude=(location[1]-center[1])*radians,tilt=center[0]*radians;
 return {x:Math.cos(lat)*Math.sin(longitude),y:Math.sin(lat)*Math.cos(tilt)-Math.cos(lat)*Math.cos(longitude)*Math.sin(tilt),z:Math.sin(lat)*Math.sin(tilt)+Math.cos(lat)*Math.cos(longitude)*Math.cos(tilt)};
}

export const marketFocusProfiles=Object.fromEntries(marketRegions.map(market=>{
 const center:LatLon=market.id==='global'?[.28*180/Math.PI,0]:market.center;
 const points=networkNodes.filter(node=>node.market===market.id).map(node=>projectMarketPoint(node.location,center));
 const xs=points.map(point=>point.x),ys=points.map(point=>point.y);
 return [market.id,{yaw:-center[1]*Math.PI/180,pitch:center[0]*Math.PI/180,
  minX:points.length?Math.min(...xs):0,maxX:points.length?Math.max(...xs):0,
  minY:points.length?Math.min(...ys):0,maxY:points.length?Math.max(...ys):0}];
})) as Record<MarketRegion,{yaw:number;pitch:number;minX:number;maxX:number;minY:number;maxY:number}>;

export function marketFocusView(market:MarketRegion,width:number,diameter:number){
 if(market==='global')return {zoom:1,offsetX:0,offsetY:0};
 const bounds=marketFocusProfiles[market];
 const zoom=Math.max(1,Math.min(3.2,width*.78/((bounds.maxX-bounds.minX)*diameter/2),1.1/(bounds.maxY-bounds.minY)));
 return {zoom,offsetX:-(bounds.minX+bounds.maxX)/2*diameter/2*zoom,offsetY:-(bounds.minY+bounds.maxY)/2*diameter/2*zoom};
}
