import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const cache=new Map(),base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../lib');
function dataModule(name){
 const filename=path.resolve(base,name.endsWith('.ts')?name:`${name}.ts`);
 if(cache.has(filename))return cache.get(filename).exports;
 const module={exports:{}};cache.set(filename,module);
 const source=ts.transpileModule(readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 new Function('require','module','exports',source)(relative=>dataModule(path.resolve(path.dirname(filename),relative)),module,module.exports);
 return module.exports;
}
const {services}=dataModule('services');
const {serviceBriefs,categoryPages}=dataModule('service-pages');
const {industries,projects,articles}=dataModule('site-content');
const {industryPages}=dataModule('industry-pages');
const {articleDirections,articleMinutes}=dataModule('editorial');
const {studioMetrics}=dataModule('studio-metrics');
assert.deepEqual(industries.map(item=>item.slug),['beauty','fashion','wellness','petcare']);
assert.deepEqual(projects.map(item=>item.slug),['form','ritual'],'Unrelated draft concepts must not be published.');
assert.equal(studioMetrics.find(item=>item.id==='industries').value,industries.length);
assert.equal(studioMetrics.find(item=>item.id==='industries').suffix,'');
const paths=new Set();
for(const service of services){
 assert.ok(categoryPages[service.slug],`Missing category page ${service.slug}`);
 assert.equal(categoryPages[service.slug].flow.length,4);
 assert.ok(projects.some(item=>item.slug===categoryPages[service.slug].project));
 for(const offering of service.offerings){
  const path=`${service.slug}/${offering.slug}`,brief=serviceBriefs[path];
  assert.ok(brief,`Missing specific brief ${path}`);
  assert.equal(brief.signals.length,3);assert.equal(brief.deliverables.length,3);assert.equal(brief.inputs.length,3);
  assert.ok(brief.headline.length>12);assert.ok(!paths.has(path));paths.add(path);
 }
}
assert.equal(Object.keys(serviceBriefs).length,paths.size,'No orphan service briefs.');
for(const industry of industries){
 const page=industryPages[industry.slug];assert.ok(page);
 for(const path of page.services)assert.ok(paths.has(path),`Invalid industry service link ${path}`);
 if(page.project)assert.ok(projects.some(item=>item.slug===page.project));
 assert.equal(page.priorities.length,3);
 assert.equal(page.services.length,page.serviceNotes.length,`Missing sector-specific service context for ${industry.slug}`);
 assert.equal(page.journey.length,4);assert.equal(page.features.length,4);assert.equal(page.process.length,4);
 assert.equal(new Set(page.faqs.map(item=>item.question)).size,page.faqs.length);
 for(const step of page.journey){assert.ok(step.name&&step.connection);assert.equal(step.customer.length,2);assert.equal(step.operation.length,2);}
 assert.ok(page.hero.includes('Shopify'));assert.ok(page.intro.length>80);
}
for(const article of articles){assert.ok(articleDirections[article.slug]);assert.equal(articleDirections[article.slug].takeaways.length,3);assert.ok(articleMinutes(article)>=1);}
console.log(`Page catalog passed: ${services.length} hubs, ${paths.size} specific services, ${industries.length} industries and ${articles.length} articles; cross-links and content complete.`);
