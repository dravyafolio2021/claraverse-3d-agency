// Symbolic store hubs and sample order journeys, never live client activity.
import type { LatLon, MarketRegion } from './order-events';
export type OperatingMarket = Exclude<MarketRegion, 'global'>;
export const networkNodes: { city: string; location: LatLon; market: OperatingMarket }[] = [
 ...([
 ['new york',40.71,-74.01],['los angeles',34.05,-118.24],['chicago',41.88,-87.63],['miami',25.76,-80.19],['austin',30.27,-97.74],['seattle',47.61,-122.33],['san francisco',37.77,-122.42],['boston',42.36,-71.06],['atlanta',33.75,-84.39],['denver',39.74,-104.99],['dallas',32.78,-96.8],['portland',45.52,-122.68],
 ] as [string,number,number][]).map(([city,lat,lon])=>({city,location:[lat,lon] as LatLon,market:'usa' as const})),
 ...([
 ['london',51.5,-.12],['amsterdam',52.37,4.9],['berlin',52.52,13.4],['paris',48.86,2.35],['milan',45.46,9.19],['madrid',40.42,-3.7],['stockholm',59.33,18.07],['frankfurt',50.11,8.68],['brussels',50.85,4.35],['copenhagen',55.68,12.57],['dublin',53.35,-6.26],['zurich',47.38,8.54],
 ] as [string,number,number][]).map(([city,lat,lon])=>({city,location:[lat,lon] as LatLon,market:'europe' as const})),
 ...([
 ['mumbai',19.08,72.88],['delhi',28.61,77.21],['bengaluru',12.97,77.59],['hyderabad',17.39,78.49],['chennai',13.08,80.27],['kolkata',22.57,88.36],['pune',18.52,73.86],['ahmedabad',23.02,72.57],['jaipur',26.91,75.79],['kochi',9.93,76.27],['lucknow',26.85,80.95],['indore',22.72,75.86],
 ] as [string,number,number][]).map(([city,lat,lon])=>({city,location:[lat,lon] as LatLon,market:'india' as const})),
];
// Metro store symbols show a regional footprint, not exact client addresses or counts.
export const primaryHubs = [0,12,24] as const;
// Twelve symbolic metro stores per market; extra destinations remain customers.
export const storeHubs = Array.from({length:36},(_,index)=>index);
const extraDestinations: [string,number,number,OperatingMarket][] = [
 ['philadelphia',39.95,-75.16,'usa'],['washington',38.91,-77.04,'usa'],['houston',29.76,-95.37,'usa'],['phoenix',33.45,-112.07,'usa'],['san diego',32.72,-117.16,'usa'],['minneapolis',44.98,-93.27,'usa'],['nashville',36.16,-86.78,'usa'],['detroit',42.33,-83.05,'usa'],
 ['barcelona',41.39,2.17,'europe'],['hamburg',53.55,9.99,'europe'],['munich',48.14,11.58,'europe'],['vienna',48.21,16.37,'europe'],['lisbon',38.72,-9.14,'europe'],['prague',50.08,14.44,'europe'],['warsaw',52.23,21.01,'europe'],['manchester',53.48,-2.24,'europe'],
 ['chandigarh',30.73,76.78,'india'],['surat',21.17,72.83,'india'],['nagpur',21.15,79.09,'india'],['coimbatore',11.02,76.96,'india'],['bhubaneswar',20.3,85.82,'india'],['visakhapatnam',17.69,83.22,'india'],['gurugram',28.46,77.03,'india'],['noida',28.54,77.39,'india'],
];
networkNodes.push(...extraDestinations.map(([city,lat,lon,market])=>({city,location:[lat,lon] as LatLon,market})));
function distance(a:LatLon,b:LatLon){const lat=(a[0]+b[0])/2*Math.PI/180;return(a[0]-b[0])**2+((a[1]-b[1])*Math.cos(lat))**2;}
export const domesticRoutes:[number,number][]=storeHubs.flatMap(hub=>{
 const destinations=networkNodes.map((node,index)=>({node,index})).filter(({node,index})=>index!==hub&&node.market===networkNodes[hub].market&&!storeHubs.some(store=>store===index)).sort((a,b)=>distance(networkNodes[hub].location,a.node.location)-distance(networkNodes[hub].location,b.node.location));
 // Local, regional and longer domestic journeys keep city clusters connected.
 return [0,Math.floor(destinations.length*.35),Math.floor(destinations.length*.75)].map(rank=>[hub,destinations[rank].index] as [number,number]);
});
export const crossMarketRoutes:[number,number][]=[[0,13],[12,26],[24,1],[0,25],[12,2],[24,14],[1,15],[14,27],[26,6],[15,25],[3,16],[25,7]];
export const commerceRoutes=[...domesticRoutes,...crossMarketRoutes];
export const metroFootprint:Record<MarketRegion,{title:string;cities:string}>= {
 global:{title:'our core markets',cities:'United States · Europe · India'},
 usa:{title:'metro focus',cities:'New York · Los Angeles · Chicago · Miami · Seattle · San Francisco'},
 europe:{title:'metro focus',cities:'London · Amsterdam · Berlin · Paris · Milan · Frankfurt'},
 india:{title:'metro focus',cities:'Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Kolkata'},
};
export function seededRandom(seed: number) { let n=seed;return()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296;}; }

// Pixel layout is independent of globe rotation and is shared with layout checks.
export function globeLayout(width:number,height:number,introBottom:number,headingBottom:number,controlsTop:number,progress:number){
 const p=Math.max(0,Math.min(1,(progress-.035)/.54));
 const settle=p*p*(3-2*p);
 const wide=Math.min(width*1.3,height*2.2);
 const top=Math.max(headingBottom+22, Math.min(height*.29,220));
 const bottom=Math.max(top+150,controlsTop-24);
 const compact=Math.max(150,Math.min(width*.86,bottom-top));
 const firstTop=Math.max(introBottom+40,height*.64);
 return {diameter:wide+(compact-wide)*settle,centerY:firstTop+wide/2+((top+bottom)/2-firstTop-wide/2)*settle,settle};
}
