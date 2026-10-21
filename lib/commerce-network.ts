/** Illustrative commerce network; never presented as live client/customer data. */
export const locations = [
  { name: 'New York', lat: 40.71, lon: -74.01 },
  { name: 'Los Angeles', lat: 34.05, lon: -118.24 },
  { name: 'Chicago', lat: 41.88, lon: -87.63 },
  { name: 'Miami', lat: 25.76, lon: -80.19 },
  { name: 'Austin', lat: 30.27, lon: -97.74 },
  { name: 'Seattle', lat: 47.61, lon: -122.33 },
  { name: 'San Francisco', lat: 37.77, lon: -122.42 },
  { name: 'Boston', lat: 42.36, lon: -71.06 },
  { name: 'Atlanta', lat: 33.75, lon: -84.39 },
  { name: 'Denver', lat: 39.74, lon: -104.99 },
  { name: 'Dallas', lat: 32.78, lon: -96.8 },
  { name: 'Portland', lat: 45.52, lon: -122.68 },
  { name: 'London', lat: 51.5, lon: -.12 },
  { name: 'Amsterdam', lat: 52.37, lon: 4.9 },
  { name: 'Berlin', lat: 52.52, lon: 13.4 },
  { name: 'Paris', lat: 48.86, lon: 2.35 },
  { name: 'Milan', lat: 45.46, lon: 9.19 },
  { name: 'Madrid', lat: 40.42, lon: -3.7 },
  { name: 'Stockholm', lat: 59.33, lon: 18.07 },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
  { name: 'Brussels', lat: 50.85, lon: 4.35 },
  { name: 'Copenhagen', lat: 55.68, lon: 12.57 },
  { name: 'Dublin', lat: 53.35, lon: -6.26 },
  { name: 'Zurich', lat: 47.38, lon: 8.54 },
  { name: 'Mumbai', lat: 19.08, lon: 72.88 },
  { name: 'Delhi', lat: 28.61, lon: 77.21 },
  { name: 'Bengaluru', lat: 12.97, lon: 77.59 },
  { name: 'Hyderabad', lat: 17.39, lon: 78.49 },
  { name: 'Chennai', lat: 13.08, lon: 80.27 },
  { name: 'Kolkata', lat: 22.57, lon: 88.36 },
  { name: 'Pune', lat: 18.52, lon: 73.86 },
  { name: 'Ahmedabad', lat: 23.02, lon: 72.57 },
  { name: 'Jaipur', lat: 26.91, lon: 75.79 },
  { name: 'Kochi', lat: 9.93, lon: 76.27 },
  { name: 'Lucknow', lat: 26.85, lon: 80.95 },
  { name: 'Indore', lat: 22.72, lon: 75.86 },
] as const;

export const networkRoutes: readonly (readonly [number, number])[] = [
 [0,1],[0,2],[1,4],[5,0],[2,3],[0,7],[4,8],[6,9],[9,10],[5,11],[2,8],[1,6],
 [12,13],[13,14],[15,16],[14,17],[12,18],[19,20],[13,21],[12,22],[16,23],[15,19],[17,15],[14,18],
 [24,26],[25,24],[26,27],[24,29],[25,28],[24,30],[31,25],[25,32],[26,33],[25,34],[24,35],[28,29],
 [0,12],[12,24],[24,0],[14,26],[6,15],[25,13],
];
export const domesticRouteCount = 36;

export function seededRandom(seed: number) {
  let value = seed;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
