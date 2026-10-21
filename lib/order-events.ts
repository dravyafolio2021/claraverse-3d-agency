// Demonstration events only. No client orders or customer data are connected.
export type LatLon = [number, number];
export type DemoOrder = {
  city: string; country: string; market: string; value: number;
  store: string; originCity: string; originCountry: string; from: LatLon; to: LatLon;
};
export const demoOrders: DemoOrder[] = [
  { store:'demo store 01', originCity:'mumbai', originCountry:'india', from:[19.08,72.88], to:[40.68,-73.94], city:'brooklyn', country:'united states', market:'USD', value:248 },
  { store:'demo store 02', originCity:'new york', originCountry:'united states', from:[40.7,-74], to:[51.5,-.1], city:'london', country:'united kingdom', market:'GBP', value:186 },
  { store:'demo store 03', originCity:'london', originCountry:'united kingdom', from:[51.5,-.1], to:[52.37,4.9], city:'amsterdam', country:'netherlands', market:'EUR', value:312 },
  { store:'demo store 01', originCity:'mumbai', originCountry:'india', from:[19.08,72.88], to:[43.7,-79.4], city:'toronto', country:'canada', market:'CAD', value:164 },
  { store:'demo store 02', originCity:'new york', originCountry:'united states', from:[40.7,-74], to:[52.5,13.4], city:'berlin', country:'germany', market:'EUR', value:224 },
  { store:'demo store 03', originCity:'london', originCountry:'united kingdom', from:[51.5,-.1], to:[1.35,103.82], city:'singapore', country:'singapore', market:'SGD', value:389 }
];
