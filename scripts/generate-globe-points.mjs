import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {performance} from 'node:perf_hooks';

function randomSequence(seed){let n=seed;return()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296;};}
function inside(lat,lon,poly){let found=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const[y1,x1]=poly[i],[y2,x2]=poly[j];if((y1>lat)!==(y2>lat)&&lon<(x2-x1)*(lat-y1)/(y2-y1)+x1)found=!found;}return found;}
export function sampleLand(countries,mobile){
 const polygons=countries.flatMap(c=>c.polygons).map(poly=>({poly,minLat:Math.min(...poly.map(p=>p[0])),maxLat:Math.max(...poly.map(p=>p[0])),minLon:Math.min(...poly.map(p=>p[1])),maxLon:Math.max(...poly.map(p=>p[1]))}));
 const random=randomSequence(931),points=[],step=mobile?1.45:1.05;
 for(let lat=-58;lat<80;lat+=step)for(let lon=-180;lon<180;lon+=step/Math.max(.2,Math.cos(lat*Math.PI/180))){
  const a=lat+random()*.6,b=lon+random()*.6;if(!polygons.some(p=>a>=p.minLat&&a<=p.maxLat&&b>=p.minLon&&b<=p.maxLon&&inside(a,b,p.poly)))continue;
  const rad=a*Math.PI/180,angle=b*Math.PI/180;
  points.push([Math.cos(rad)*Math.sin(angle),Math.sin(rad),Math.cos(rad)*Math.cos(angle),random()]);
 }
 return points;
}
export function encodePoints(points){
 const bytes=Buffer.alloc(8+points.length*8);bytes.write('CLP1');bytes.writeUInt32LE(points.length,4);
 points.forEach((point,i)=>{const at=8+i*8;for(let axis=0;axis<3;axis++)bytes.writeInt16LE(Math.round(point[axis]*32767),at+axis*2);bytes.writeUInt16LE(Math.round(point[3]*65535),at+6);});return bytes;
}
function poster(points){
 const dots=points.flatMap(([x,y,z,w])=>{const ny=y*Math.cos(.28)-z*Math.sin(.28),nz=y*Math.sin(.28)+z*Math.cos(.28);if(nz<0)return[];return`M${(300+x*280).toFixed(1)} ${(300-ny*280).toFixed(1)}h${(.5+w*.6).toFixed(1)}`;}).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><radialGradient id="surface" cx="40%" cy="25%"><stop stop-color="#1e3516"/><stop offset="1" stop-color="#09170d"/></radialGradient></defs><circle cx="300" cy="300" r="281" fill="url(#surface)" stroke="#84b64b" stroke-opacity=".5"/><ellipse cx="300" cy="300" rx="280" ry="65" fill="none" stroke="#b4ef74" stroke-opacity=".08"/><ellipse cx="300" cy="300" rx="115" ry="280" fill="none" stroke="#b4ef74" stroke-opacity=".08"/><path d="${dots}" fill="none" stroke="#a8e85e" stroke-opacity=".72" stroke-width="1.4" stroke-linecap="round"/></svg>`;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const countries=JSON.parse(fs.readFileSync('public/globe-land.json','utf8')),output='public/globe';fs.mkdirSync(output,{recursive:true});const report={sourceBytes:fs.statSync('public/globe-land.json').size};
 for(const [name,mobile]of[['desktop',false],['mobile',true]]){const start=performance.now(),points=sampleLand(countries,mobile),bytes=encodePoints(points);fs.writeFileSync(`${output}/land-${name}-v1.bin`,bytes);report[name]={points:points.length,bytes:bytes.length,generationMs:Math.round((performance.now()-start)*100)/100};if(mobile)fs.writeFileSync(`${output}/poster-v1.svg`,poster(points));}
 fs.writeFileSync(`${output}/manifest.json`,JSON.stringify(report,null,2)+'\n');console.log(report);
}
