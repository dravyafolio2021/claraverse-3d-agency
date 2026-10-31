// Illustrative activity only. No client orders or customer data are connected.
export type LatLon = [number, number];
export type MarketRegion = 'global' | 'usa' | 'europe' | 'india';
export type DemoOrder = {
  city: string; country: string; market: string; value: number; region: Exclude<MarketRegion,'global'>;
  store: string; originCity: string; originCountry: string; from: LatLon; to: LatLon;
};
export const marketRegions: {id:MarketRegion;label:string;center:LatLon}[] = [
  {id:'global',label:'All markets',center:[25,-20]},
  {id:'usa',label:'United States',center:[36,-98]},
  {id:'europe',label:'Europe',center:[49,8]},
  {id:'india',label:'India',center:[22,79]},
];
export const demoOrders: DemoOrder[] = [
  {region:'usa',store:'US concept store',originCity:'new york',originCountry:'united states',from:[40.71,-74.01],to:[34.05,-118.24],city:'los angeles',country:'united states',market:'USD',value:248},
  {region:'europe',store:'EU concept store',originCity:'london',originCountry:'united kingdom',from:[51.5,-.12],to:[52.52,13.4],city:'berlin',country:'germany',market:'EUR',value:224},
  {region:'india',store:'India concept store',originCity:'mumbai',originCountry:'india',from:[19.08,72.88],to:[12.97,77.59],city:'bengaluru',country:'india',market:'INR',value:12490},
  {region:'usa',store:'US concept store',originCity:'los angeles',originCountry:'united states',from:[34.05,-118.24],to:[41.88,-87.63],city:'chicago',country:'united states',market:'USD',value:186},
  {region:'usa',store:'US concept store',originCity:'chicago',originCountry:'united states',from:[41.88,-87.63],to:[25.76,-80.19],city:'miami',country:'united states',market:'USD',value:312},
  {region:'usa',store:'US concept store',originCity:'seattle',originCountry:'united states',from:[47.61,-122.33],to:[30.27,-97.74],city:'austin',country:'united states',market:'USD',value:164},
  {region:'usa',store:'US concept store',originCity:'new york',originCountry:'united states',from:[40.71,-74.01],to:[33.75,-84.39],city:'atlanta',country:'united states',market:'USD',value:289},
  {region:'europe',store:'EU concept store',originCity:'paris',originCountry:'france',from:[48.86,2.35],to:[52.37,4.9],city:'amsterdam',country:'netherlands',market:'EUR',value:312},
  {region:'europe',store:'EU concept store',originCity:'berlin',originCountry:'germany',from:[52.52,13.4],to:[45.46,9.19],city:'milan',country:'italy',market:'EUR',value:179},
  {region:'europe',store:'EU concept store',originCity:'amsterdam',originCountry:'netherlands',from:[52.37,4.9],to:[40.42,-3.7],city:'madrid',country:'spain',market:'EUR',value:246},
  {region:'europe',store:'EU concept store',originCity:'london',originCountry:'united kingdom',from:[51.5,-.12],to:[59.33,18.07],city:'stockholm',country:'sweden',market:'SEK',value:2480},
  {region:'india',store:'India concept store',originCity:'delhi',originCountry:'india',from:[28.61,77.21],to:[19.08,72.88],city:'mumbai',country:'india',market:'INR',value:8490},
  {region:'india',store:'India concept store',originCity:'bengaluru',originCountry:'india',from:[12.97,77.59],to:[17.39,78.49],city:'hyderabad',country:'india',market:'INR',value:6890},
  {region:'india',store:'India concept store',originCity:'mumbai',originCountry:'india',from:[19.08,72.88],to:[22.57,88.36],city:'kolkata',country:'india',market:'INR',value:11290},
  {region:'india',store:'India concept store',originCity:'delhi',originCountry:'india',from:[28.61,77.21],to:[13.08,80.27],city:'chennai',country:'india',market:'INR',value:4990},
  {region:'europe',store:'US concept store',originCity:'new york',originCountry:'united states',from:[40.71,-74.01],to:[51.5,-.12],city:'london',country:'united kingdom',market:'GBP',value:386},
  {region:'india',store:'EU concept store',originCity:'london',originCountry:'united kingdom',from:[51.5,-.12],to:[19.08,72.88],city:'mumbai',country:'india',market:'INR',value:18900},
  {region:'usa',store:'India concept store',originCity:'mumbai',originCountry:'india',from:[19.08,72.88],to:[40.71,-74.01],city:'new york',country:'united states',market:'USD',value:429},
];
// Additional destination nodes make each operating region legible at a glance.
export const customerLocations: LatLon[] = [
 [37.77,-122.42],[32.72,-117.16],[33.45,-112.07],[39.74,-104.99],[32.78,-96.8],[29.76,-95.37],[42.36,-71.06],[38.9,-77.04],[36.16,-86.78],[45.52,-122.68],[44.98,-93.27],[39.1,-94.58],
 [50.11,8.68],[48.14,11.58],[53.55,9.99],[50.85,4.35],[55.68,12.57],[47.38,8.54],[41.39,2.17],[38.72,-9.14],[53.35,-6.26],[48.21,16.37],[52.23,21.01],[43.77,11.25],
 [18.52,73.86],[23.02,72.57],[26.91,75.79],[26.85,80.95],[21.15,79.09],[22.72,75.86],[30.73,76.78],[11.02,76.96],[9.93,76.27],[23.26,77.41],[21.17,72.83],[20.3,85.82],
];
