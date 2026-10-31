import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import {performance} from 'node:perf_hooks';
import {stripTypeScriptTypes} from 'node:module';
import * as THREE from 'three';
import {sampleLand} from './generate-globe-points.mjs';

const urlCache=new Map();
function moduleUrl(file){
 file=path.resolve(file);if(urlCache.has(file))return urlCache.get(file);
 let source=stripTypeScriptTypes(fs.readFileSync(file,'utf8'));
 source=source.replace(/(from\s+['"])(\.\.?\/[^'"]+)(['"])/g,(_,start,relative,end)=>start+moduleUrl(path.resolve(path.dirname(file),relative+'.ts'))+end);
 const url='data:text/javascript;base64,'+Buffer.from(source).toString('base64');urlCache.set(file,url);return url;
}
const {decodeGlobePoints}=await import(moduleUrl('lib/globe-points.ts'));
const network=await import(moduleUrl('lib/commerce-network.ts'));
const {marketFocusView}=await import(moduleUrl('lib/globe-focus.ts'));
const median=values=>[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
const round=x=>Math.round(x*100)/100;
const countries=JSON.parse(fs.readFileSync('public/globe-land.json','utf8'));
const report={date:'2026-10-26',scope:'Local CPU, asset and production-bundle audit. No browser Core Web Vitals or GPU/FPS measurement.',geography:{},portfolio:{},threeChunks:{},checks:[]};
for(const[name,mobile]of[['desktop',false],['mobile',true]]){
 const bytes=fs.readFileSync(`public/globe/land-${name}-v1.bin`),buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
 const before=[],after=[];let expected,decoded;
 for(let run=0;run<5;run++){let start=performance.now();expected=sampleLand(countries,mobile);before.push(performance.now()-start);start=performance.now();decoded=decodeGlobePoints(buffer);after.push(performance.now()-start);}
 assert.equal(decoded.count,expected.length);
 for(let i=0;i<decoded.count;i++){for(let axis=0;axis<3;axis++)assert(Math.abs(decoded.positions[i*3+axis]-expected[i][axis]*2.364)<.000038);assert(Math.abs(decoded.weights[i]-expected[i][3])<.000008);}
 for(const bad of [new ArrayBuffer(0),buffer.slice(0,16)])assert.throws(()=>decodeGlobePoints(bad));
 report.geography[name]={points:decoded.count,beforeBytes:179824,afterBytes:bytes.length,beforeGzip:zlib.gzipSync(fs.readFileSync('public/globe-land.json')).length,afterGzip:zlib.gzipSync(bytes).length,beforeCpuMedianMs:round(median(before)),afterCpuMedianMs:round(median(after))};
}
assert.equal(network.storeHubs.length,36);assert.equal(network.networkNodes.length,60);assert.equal(network.commerceRoutes.length,120);
for(const[from,to]of network.commerceRoutes){const make=([lat,lon])=>new THREE.Vector3(Math.cos(lat*Math.PI/180)*Math.sin(lon*Math.PI/180),Math.sin(lat*Math.PI/180),Math.cos(lat*Math.PI/180)*Math.cos(lon*Math.PI/180));assert(Math.abs(Math.sin(make(network.networkNodes[from].location).angleTo(make(network.networkNodes[to].location))))>1e-8);}
for(const market of ['global','usa','europe','india'])for(const width of [320,390,768,1440,1920]){const view=marketFocusView(market,width,Math.min(width*.86,450));assert(Object.values(view).every(Number.isFinite));}
const picker=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),new THREE.MeshBasicMaterial());picker.position.z=2.4;picker.visible=false;picker.updateMatrixWorld();const ray=new THREE.Raycaster(new THREE.Vector3(0,0,10),new THREE.Vector3(0,0,-1));assert(ray.intersectObjects([picker]).length>0);picker.geometry.dispose();picker.material.dispose();
for(const name of ['commerce-scenes-v1','commerce-scenes-v2'])report.portfolio[name]={beforeBytes:fs.statSync(`public/portfolio/${name}.png`).size,afterBytes:fs.statSync(`public/portfolio/${name}.webp`).size};
const chunks=fs.readdirSync('.next-check/static/chunks').filter(name=>/^(bd904a5c|b536a0f1)\./.test(name)&&name.endsWith('.js'));
assert.equal(chunks.length,2,'Inspect current Three chunks before comparing to this baseline.');
report.threeChunks={scope:'Two shared Three.js core/renderer chunks; excludes common app/runtime code',beforeBytes:379024+333363,beforeGzip:100505+79459,afterBytes:0,afterGzip:0};
for(const name of chunks){const bytes=fs.readFileSync('.next-check/static/chunks/'+name);report.threeChunks.afterBytes+=bytes.length;report.threeChunks.afterGzip+=zlib.gzipSync(bytes).length;}
report.scene={beforeRenderableGroups:132,afterRenderableGroups:10,scope:'Structural upper bound inferred from scene objects, not measured GPU draw calls. Actual runtime calls are available in globe-container data-draw-calls.'};
report.checks=['All quantized points preserve original positions within 0.000038 scene units and weights within 0.000008.','Malformed/truncated geography is rejected.','36 symbolic stores, 60 nodes and 120 routes preserved.','All markets return finite focus views at mobile and desktop widths.','Hidden pickers remain raycastable with installed Three.js.'];
fs.mkdirSync('docs/audits',{recursive:true});fs.writeFileSync('docs/audits/performance-2026-10-26.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
