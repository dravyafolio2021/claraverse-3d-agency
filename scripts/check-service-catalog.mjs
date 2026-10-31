import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {services,serviceAliases,resolveService,findOffering} from '../lib/services.ts';

const expected=[['Development',9],['Design',3],['Integrations',7],['Migration',5],['Growth',6]];
assert.deepEqual(services.map(service=>[service.name,service.offerings.length]),expected);
assert.equal(new Set(services.map(service=>service.slug)).size,5);
let pairs=0;
for(const service of services){
 assert.equal(resolveService(service.slug),service);
 assert.equal(new Set(service.offerings.map(offering=>offering.slug)).size,service.offerings.length);
 assert.ok(service.steps.length&&service.intro&&service.hook);
 for(const offering of service.offerings){
  assert.equal(findOffering(service,offering.slug),offering);
  assert.ok(offering.description&&/^[a-z0-9-]+$/.test(offering.slug));
  for(const other of services.filter(item=>item!==service)){
   // A specific service from another category must not become a valid enquiry choice.
   if(!other.offerings.some(item=>item.slug===offering.slug))assert.equal(findOffering(other,offering.slug),undefined);
  }
  pairs++;
 }
 const asset=await readFile(new URL(`../public/services/${service.shape}-sculpture-v1.webp`,import.meta.url));
 assert.equal(asset.toString('ascii',0,4),'RIFF');assert.ok(asset.length<150000);
}
for(const alias of serviceAliases){
 assert.ok(!services.some(service=>service.slug===alias.from));
 assert.equal(resolveService(alias.from)?.slug,alias.to);
}
assert.equal(resolveService('unknown-category'),undefined);
assert.equal(resolveService('__proto__'),undefined);
assert.equal(findOffering(undefined,'theme-development'),undefined);
console.log(JSON.stringify({categories:services.length,offerings:pairs,compatibleOldURLs:serviceAliases.length,checks:'Catalog completeness, unique anchors, category/offering pairing, legacy resolution and light artwork assets passed.'},null,2));
