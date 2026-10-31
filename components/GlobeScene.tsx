'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { type LatLon, type MarketRegion } from '@/lib/order-events';
import { commerceRoutes, domesticRoutes, globeLayout, networkNodes, primaryHubs, seededRandom, storeHubs } from '@/lib/commerce-network';

import { marketFocusProfiles, marketFocusView } from '@/lib/globe-focus';
import {decodeGlobePoints} from '@/lib/globe-points';
import {createGlobeMotion,beginGlobeGesture,dragGlobe,endGlobeGesture,focusGlobeMotion,nudgeGlobeMotion,stepGlobeMotion} from '@/lib/globe-interaction';

type GlobeProps={focusKey:number;region:MarketRegion;paused:boolean;resetKey:number;onSelectRegion:(region:MarketRegion)=>void;scrollProgress:RefObject<number>};

export function GlobeScene({focusKey,region,paused,resetKey,onSelectRegion,scrollProgress}:GlobeProps){
 const host=useRef<HTMLDivElement>(null),interaction=useRef<HTMLDivElement>(null),controls=useRef({focusKey,region,paused,resetKey,onSelectRegion});
 const [ready,setReady]=useState(false);
 useEffect(()=>{controls.current={focusKey,region,paused,resetKey,onSelectRegion};},[focusKey,region,paused,resetKey,onSelectRegion]);
 useEffect(()=>{
  if(!host.current)return;
  let disposed=false;
  setReady(false);
  const started=performance.now(),abort=new AbortController(),teardown:(()=>void)[]=[()=>abort.abort()];
  const cleanup=()=>{for(const release of teardown.splice(0).reverse())release();};
  (async()=>{
   try{
    const mobile=innerWidth<700;
    const[THREE,buffer]=await Promise.all([import('@/lib/three-globe'),fetch(`/globe/land-${mobile?'mobile':'desktop'}-v1.bin`,{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error('Geography unavailable');return r.arrayBuffer();})]);
    if(disposed||!host.current||!interaction.current)return;
    const surface=interaction.current;
    const samples=decodeGlobePoints(buffer),el=host.current,renderer=new THREE.WebGLRenderer({alpha:true,antialias:!mobile,powerPreference:'low-power'});
    teardown.push(()=>{renderer.dispose();renderer.domElement.remove();});
    renderer.setClearColor('#080d0b',0);renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.25:1.5));
    renderer.domElement.setAttribute('aria-hidden','true');el.appendChild(renderer.domElement);
    // An orthographic lens keeps the opening horizon circular and predictable,
    // even when its centre is well below the viewport. No clipped sub-canvas.
    const camera=new THREE.OrthographicCamera(-8,8,5,-5,.1,70);camera.position.z=20;
    const scene=new THREE.Scene(),world=new THREE.Group(),radius=2.35;scene.add(world);
    teardown.push(()=>{const geometries=new Set<InstanceType<typeof THREE.BufferGeometry>>(),materials=new Set<InstanceType<typeof THREE.Material>>();scene.traverse(obj=>{if(obj instanceof THREE.InstancedMesh)obj.dispose();if('geometry'in obj)geometries.add(obj.geometry as InstanceType<typeof THREE.BufferGeometry>);if('material'in obj){const m=obj.material as InstanceType<typeof THREE.Material>|InstanceType<typeof THREE.Material>[];for(const material of Array.isArray(m)?m:[m])materials.add(material);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());});world.rotation.order='XYZ';world.rotation.set(.28,0,0);
    const point=(lat:number,lon:number,r=radius)=>{const a=lat*Math.PI/180,b=lon*Math.PI/180;return new THREE.Vector3(r*Math.cos(a)*Math.sin(b),r*Math.sin(a),r*Math.cos(a)*Math.cos(b));};
    const core=new THREE.Mesh(new THREE.SphereGeometry(radius,64,48),new THREE.MeshPhongMaterial({color:'#09170d',emissive:'#051007',shininess:14,specular:'#2c4721'}));world.add(core);
    scene.add(new THREE.AmbientLight('#7c9b57',.48));const light=new THREE.DirectionalLight('#c6ff88',.7);light.position.set(-4,7,12);scene.add(light);
    const atmosphere=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
     vertexShader:'varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normalize(position));gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
     fragmentShader:'varying vec3 vNormal;void main(){float rim=pow(1.-max(0.,vNormal.z),3.5);gl_FragColor=vec4(.57,.94,.28,rim*.46);}' });
    world.add(new THREE.Mesh(new THREE.SphereGeometry(radius+.025,64,48),atmosphere));
    const random=seededRandom(931);
    const dotsGeometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(samples.positions,3)).setAttribute('aWeight',new THREE.Float32BufferAttribute(samples.weights,1));
    el.dataset.landPoints=String(samples.count);
    world.add(new THREE.Points(dotsGeometry,new THREE.ShaderMaterial({transparent:true,depthWrite:false,
     vertexShader:'attribute float aWeight;varying float weight;void main(){weight=aWeight;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=1.1+aWeight*1.2;}',
     fragmentShader:'varying float weight;void main(){float dotShape=1.-smoothstep(.08,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.66,.91,.37,dotShape*(.4+weight*.45));}' })));
    const gridMaterial=new THREE.LineBasicMaterial({color:'#b4ef74',transparent:true,opacity:.065,depthWrite:false}),gridPoints:InstanceType<typeof THREE.Vector3>[]=[];
    for(let lat=-60;lat<=60;lat+=30)for(let i=0;i<180;i++)gridPoints.push(point(lat,-180+i*2,radius+.006),point(lat,-178+i*2,radius+.006));
    for(let lon=-180;lon<180;lon+=30)for(let i=0;i<90;i++)gridPoints.push(point(-90+i*2,lon,radius+.006),point(-88+i*2,lon,radius+.006));
    world.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(gridPoints),gridMaterial));

    const routeSamples=commerceRoutes.map(([from,to],index)=>{
     const a=point(...networkNodes[from].location,1),b=point(...networkNodes[to].location,1),angle=a.angleTo(b),sin=Math.sin(angle);
     return Array.from({length:97},(_,i)=>{const t=i/96;return a.clone().multiplyScalar(Math.sin((1-t)*angle)/sin).add(b.clone().multiplyScalar(Math.sin(t*angle)/sin)).multiplyScalar(radius+.025+Math.sin(Math.PI*t)*(index<domesticRoutes.length?.045:.075));});
    });
    const routeGeometry=new THREE.BufferGeometry().setFromPoints(routeSamples.flatMap(curve=>curve.slice(0,-1).flatMap((v,i)=>[v,curve[i+1]])));
    world.add(new THREE.LineSegments(routeGeometry,new THREE.LineBasicMaterial({color:'#b7ee70',transparent:true,opacity:.085,depthWrite:false})));
    const nodesGeometry=new THREE.BufferGeometry().setFromPoints(networkNodes.map(n=>point(...n.location,radius+.038)));
    const arrival=new THREE.Float32BufferAttribute(new Float32Array(networkNodes.length).fill(-10),1);nodesGeometry.setAttribute('aArrival',arrival);
    const timeUniform={value:0};
    world.add(new THREE.Points(nodesGeometry,new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uTime:timeUniform},
     vertexShader:'attribute float aArrival;uniform float uTime;varying float pulse;void main(){pulse=max(0.,1.-(uTime-aArrival)/1.4);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=3.5+pulse*5.;}',
     fragmentShader:'varying float pulse;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(.8,1.,.51,(1.-smoothstep(.08,.5,d))*(.65+pulse*.35));}' })));
    const marketId={global:0,usa:1,europe:2,india:3},marketUniform={value:0};
    const hubPickers:InstanceType<typeof THREE.Mesh>[]=[],ringData:{position:InstanceType<typeof THREE.Vector3>;quaternion:InstanceType<typeof THREE.Quaternion>;size:number;color:InstanceType<typeof THREE.Color>;market:MarketRegion}[]=[];
    const glyphPositions:number[]=[],glyphColors:number[]=[],glyphMarkets:number[]=[];
    const hubRings=new THREE.InstancedMesh(new THREE.RingGeometry(.041,.045,24),new THREE.MeshBasicMaterial({transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}),storeHubs.length);
    hubRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);hubRings.frustumCulled=false;world.add(hubRings);
    const ringMatrix=new THREE.Matrix4(),ringScale=new THREE.Vector3(),ringColor=new THREE.Color();
    const pickerGeometry=new THREE.SphereGeometry(1,8,6),pickerMaterial=new THREE.MeshBasicMaterial();
    for(const index of storeHubs){
     const normal=point(...networkNodes[index].location,1),position=point(...networkNodes[index].location,radius+.047),quaternion=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),normal),primary=primaryHubs.some(id=>id===index),market=networkNodes[index].market,color=new THREE.Color({usa:'#ffe2ae',europe:'#bbdcf7',india:'#cbff65'}[market]);
     const scale=primary?.052:.024,segments:number[][]=[[-1,-1,1,-1],[1,-1,1,.35],[1,.35,-1,.35],[-1,.35,-1,-1],[-1.25,.35,-.85,1.05],[-.85,1.05,.85,1.05],[.85,1.05,1.25,.35],[-1.25,.35,1.25,.35],[-.4,.35,-.4,.83],[.4,.35,.4,.83],[-.2,-1,-.2,-.2],[-.2,-.2,.4,-.2],[.4,-.2,.4,-1]];
     for(const[x1,y1,x2,y2]of segments)for(const[x,y]of[[x1,y1],[x2,y2]]){const vertex=new THREE.Vector3(x*scale,y*scale,0).applyQuaternion(quaternion).add(position);glyphPositions.push(vertex.x,vertex.y,vertex.z);glyphColors.push(color.r,color.g,color.b);glyphMarkets.push(marketId[market]);}
     ringData.push({position,quaternion,size:primary?2.13:1,color,market});
     const picker=new THREE.Mesh(pickerGeometry,pickerMaterial);picker.position.copy(position);picker.scale.setScalar(primary?.13:.085);picker.userData.market=market;
     // Invisible objects still participate in Raycaster intersections, but no
     // longer submit thirty-six transparent sphere draws on every frame.
     picker.visible=false;world.add(picker);hubPickers.push(picker);
    }
    const glyphGeometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(glyphPositions,3)).setAttribute('aColor',new THREE.Float32BufferAttribute(glyphColors,3)).setAttribute('aMarket',new THREE.Float32BufferAttribute(glyphMarkets,1));
    world.add(new THREE.LineSegments(glyphGeometry,new THREE.ShaderMaterial({transparent:true,uniforms:{uMarket:marketUniform},vertexShader:'attribute vec3 aColor;attribute float aMarket;uniform float uMarket;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=uMarket<.5||abs(aMarket-uMarket)<.1?1.:.35;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vColor;varying float vAlpha;void main(){gl_FragColor=vec4(vColor,vAlpha);\n#include <colorspace_fragment>\n}'})));
    const capacity=mobile?48:72,trailLength=12,flights=Array.from({length:capacity},(_,i)=>{const duration=3.5+random()*5;return{live:i<(mobile?30:44),route:(i*7)%commerceRoutes.length,born:-random()*duration,duration};});
    const trails=new THREE.BufferGeometry(),heads=new THREE.BufferGeometry();
    const trailPosition=new THREE.BufferAttribute(new Float32Array(capacity*trailLength*2*3),3).setUsage(THREE.DynamicDrawUsage),trailAlpha=new THREE.BufferAttribute(new Float32Array(capacity*trailLength*2),1).setUsage(THREE.DynamicDrawUsage);
    const headPosition=new THREE.BufferAttribute(new Float32Array(capacity*3),3).setUsage(THREE.DynamicDrawUsage),headAlpha=new THREE.BufferAttribute(new Float32Array(capacity),1).setUsage(THREE.DynamicDrawUsage);
    trails.setAttribute('position',trailPosition).setAttribute('aAlpha',trailAlpha);heads.setAttribute('position',headPosition).setAttribute('aAlpha',headAlpha);
    world.add(new THREE.LineSegments(trails,new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
     vertexShader:'attribute float aAlpha;varying float alpha;void main(){alpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying float alpha;void main(){gl_FragColor=vec4(.74,1.,.38,alpha);}' })));
    world.add(new THREE.Points(heads,new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
     vertexShader:'attribute float aAlpha;varying float alpha;void main(){alpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=4.4;}',fragmentShader:'varying float alpha;void main(){gl_FragColor=vec4(.86,1.,.61,alpha*(1.-smoothstep(.12,.5,length(gl_PointCoord-.5))));}' })));
    const vector=new THREE.Vector3(),raycaster=new THREE.Raycaster();
    let width=1,height=1,introBottom=500,headingBottom=190,controlsTop=700;
    const stage=el.closest('.hero-sticky');
    const resize=()=>{
     width=Math.max(1,el.clientWidth);height=Math.max(1,el.clientHeight);renderer.setSize(width,height,false);
     camera.left=-5*width/height;camera.right=5*width/height;camera.top=5;camera.bottom=-5;camera.updateProjectionMatrix();
     const top=el.getBoundingClientRect().top;
     introBottom=(stage?.querySelector('.hero-statement')?.getBoundingClientRect().bottom??height*.65)-top;
     headingBottom=(stage?.querySelector('.commerce-heading')?.getBoundingClientRect().bottom??190)-top;
     controlsTop=(stage?.querySelector('.globe-explorer')?.getBoundingClientRect().top??height-150)-top;
     const fallback=globeLayout(width,height,introBottom,headingBottom,controlsTop,scrollProgress.current);el.style.setProperty('--fallback-diameter',`${fallback.diameter}px`);el.style.setProperty('--fallback-top',`${fallback.centerY-fallback.diameter/2}px`);
    };
    const observer=new ResizeObserver(resize);teardown.push(()=>observer.disconnect());observer.observe(el);for(const selector of['.hero-statement','.commerce-heading','.globe-explorer']){const part=stage?.querySelector(selector);if(part)observer.observe(part);}resize();
    document.fonts.ready.then(()=>{if(!disposed)resize();});
    let inView=true,visible=!document.hidden,raf=0,moved=false,startX=0,startY=0,lastX=0,lastY=0,lastPointerTime=0,activePointer:number|null=null,cursorX=0,cursorY=0;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,motion=createGlobeMotion(scrollProgress.current);
    let lastRegion:MarketRegion='global',lastReset=resetKey,lastFocus=focusKey,zoom=1,offsetX=0,offsetY=0,simulationTime=0,nextLaunch=0,lastElapsed=performance.now(),lastFrame=0,painted=false,surfaceLayout='';
    const focus=(market:MarketRegion)=>{const view=marketFocusProfiles[market];focusGlobeMotion(motion,view.yaw,view.pitch,world.rotation.y,scrollProgress.current,performance.now());cursorX=cursorY=0;};
    const pointerRay=(event:PointerEvent)=>{const box=el.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((event.clientX-box.left)/box.width*2-1,-(event.clientY-box.top)/box.height*2+1),camera);};
    const finish=(inertia=true)=>{
     if(!motion.dragging)return;
     endGlobeGesture(motion,performance.now(),inertia&&!reduced);
     const pointer=activePointer;activePointer=null;surface.classList.remove('is-dragging');
     if(pointer!==null&&surface.hasPointerCapture(pointer))surface.releasePointerCapture(pointer);
    };
    const down=(event:PointerEvent)=>{
     if(!event.isPrimary||activePointer!==null||surface.dataset.enabled!=='true'||![0,1,2].includes(event.button))return;
     pointerRay(event);if(!raycaster.intersectObject(core,false).length)return;
     if(event.pointerType!=='touch'){event.preventDefault();surface.focus({preventScroll:true});}
     activePointer=event.pointerId;moved=false;startX=lastX=event.clientX;startY=lastY=event.clientY;lastPointerTime=event.timeStamp;
     beginGlobeGesture(motion,performance.now(),event.shiftKey||event.button===1||event.button===2);
     cursorX=cursorY=0;surface.setPointerCapture(event.pointerId);surface.classList.add('is-dragging');
    };
    const move=(event:PointerEvent)=>{
     if(motion.dragging&&event.pointerId===activePointer){
      const dx=event.clientX-lastX,dy=event.clientY-lastY;
      moved=moved||Math.hypot(event.clientX-startX,event.clientY-startY)>5;
      dragGlobe(motion,dx,dy,(event.timeStamp-lastPointerTime)/1000,{allowPitch:event.pointerType!=='touch',panWidth:width*(controls.current.region==='global'?.08:.18),panHeight:height*(controls.current.region==='global'?.025:.12)});
      lastX=event.clientX;lastY=event.clientY;lastPointerTime=event.timeStamp;
     }else if(event.pointerType==='mouse'&&!reduced){
      const box=surface.getBoundingClientRect();cursorX=THREE.MathUtils.clamp((event.clientX-box.left)/box.width-.5,-.5,.5);cursorY=THREE.MathUtils.clamp((event.clientY-box.top)/box.height-.5,-.5,.5);
     }
    };
    const up=(event:PointerEvent)=>{
     if(event.pointerId!==activePointer)return;
     const pan=motion.panning;finish(moved&&!pan);
     if(moved||pan)return;
     pointerRay(event);const hit=raycaster.intersectObjects([core,...hubPickers],false)[0];
     if(hit?.object.userData.market)controls.current.onSelectRegion(hit.object.userData.market as MarketRegion);
    };
    const cancel=()=>finish(false);
    const leave=()=>{if(!motion.dragging)cursorX=cursorY=0;};
    const contextMenu=(event:MouseEvent)=>event.preventDefault();
    const key=(event:KeyboardEvent)=>{
     const directions:Record<string,[number,number]>={ArrowLeft:[-.18,0],ArrowRight:[.18,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]};
     if(directions[event.key]){event.preventDefault();const[yaw,pitch]=directions[event.key];nudgeGlobeMotion(motion,yaw,pitch,performance.now());cursorX=cursorY=0;}
     if(event.key==='Home'){event.preventDefault();focus(controls.current.region);}
    };
    const resume=()=>{if(visible&&inView&&!disposed&&!raf)raf=requestAnimationFrame(animate);else if(!visible||!inView){cancelAnimationFrame(raf);raf=0;}};
    const visibility=()=>{visible=!document.hidden;lastElapsed=performance.now();resume();};
    const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;lastElapsed=performance.now();resume();});intersection.observe(el);
    surface.addEventListener('pointerdown',down);surface.addEventListener('pointermove',move);surface.addEventListener('pointerup',up);surface.addEventListener('pointercancel',cancel);surface.addEventListener('lostpointercapture',cancel);surface.addEventListener('pointerleave',leave);surface.addEventListener('keydown',key);surface.addEventListener('contextmenu',contextMenu);document.addEventListener('visibilitychange',visibility);
    el.dataset.customerNodes=String(networkNodes.length);el.dataset.networkRoutes=String(commerceRoutes.length);el.dataset.storeHubs=String(storeHubs.length);el.dataset.lens='orthographic';
    const sampleRoute=(curve:InstanceType<typeof THREE.Vector3>[],value:number)=>{const at=THREE.MathUtils.clamp(value,0,.9999)*96,i=Math.floor(at);vector.copy(curve[i]).lerp(curve[i+1],at-i);};
    const animate=()=>{
     raf=0;if(disposed||!visible||!inView)return;raf=requestAnimationFrame(animate);const now=performance.now();const fps=motion.dragging?(mobile?45:60):scrollProgress.current<.4?24:mobile?30:45;if(now-lastFrame<1000/fps)return;lastFrame=now;const delta=Math.min(.05,(now-lastElapsed)/1000);lastElapsed=now;
     if(controls.current.region!==lastRegion||controls.current.focusKey!==lastFocus){lastRegion=controls.current.region;lastFocus=controls.current.focusKey;focus(lastRegion);}
     if(controls.current.resetKey!==lastReset){lastReset=controls.current.resetKey;finish(false);focusGlobeMotion(motion,0,.28,world.rotation.y,scrollProgress.current,now);cursorX=cursorY=0;}
     if(!controls.current.paused)simulationTime+=delta;
     stepGlobeMotion(motion,{progress:scrollProgress.current,delta,now,regional:controls.current.region!=='global',autoRotate:!controls.current.paused&&!reduced,scrollRotate:!reduced,inertia:!reduced});
     const damping=motion.dragging?16:7;
     world.rotation.y=THREE.MathUtils.damp(world.rotation.y,motion.yaw+cursorX*.035,damping,delta);world.rotation.x=THREE.MathUtils.damp(world.rotation.x,THREE.MathUtils.clamp(motion.pitch+cursorY*.025,-1.15,1.15),damping,delta);
     const layout=globeLayout(width,height,introBottom,headingBottom,controlsTop,scrollProgress.current);
     const view=marketFocusView(controls.current.region,width,layout.diameter);
     // The scroll horizon remains unchanged; regional zoom begins in the settled view.
     const focusAmount=THREE.MathUtils.smoothstep(layout.settle,.9,1);
     zoom=THREE.MathUtils.damp(zoom,1+(view.zoom-1)*focusAmount,4,delta);
     offsetX=THREE.MathUtils.damp(offsetX,view.offsetX*focusAmount,4,delta);offsetY=THREE.MathUtils.damp(offsetY,view.offsetY*focusAmount,4,delta);
     const diameter=layout.diameter*zoom,centerX=width/2+offsetX+motion.panX,centerY=layout.centerY-offsetY+motion.panY;
     world.scale.setScalar(diameter/height*10/(radius*2));world.position.set((offsetX+motion.panX)/height*10,(.5-centerY/height)*10,0);
     // A dedicated circular hit target follows the rendered globe, not the viewport.
     const nextSurface=[centerX,centerY,diameter].map(value=>value.toFixed(1)).join(':');
     if(nextSurface!==surfaceLayout){surfaceLayout=nextSurface;surface.style.left=`${centerX}px`;surface.style.top=`${centerY}px`;surface.style.width=surface.style.height=`${diameter}px`;}
     const enabled=scrollProgress.current>=.4;
     if(surface.dataset.enabled!==String(enabled)){surface.dataset.enabled=String(enabled);surface.tabIndex=enabled?0:-1;surface.setAttribute('aria-hidden',String(!enabled));surface.inert=!enabled;if(!enabled)finish(false);}
     // A regional close-up blends through a broad oval falloff. A horizontal
     // strip mask visibly sliced the sphere into a rectangle at both edges.
     const focusFade=THREE.MathUtils.smoothstep(zoom,1,1.7)*focusAmount;
     if(focusFade>.001){
      const lensWidth=Math.min(width*.54,Math.max(layout.diameter*1.2,width*.38));
      const lensHeight=Math.max(90,(controlsTop-headingBottom-34)*.56);
      const edgeAlpha=(1-focusFade).toFixed(4);
      renderer.domElement.style.maskImage=`radial-gradient(ellipse ${lensWidth}px ${lensHeight}px at 50% ${layout.centerY}px,black 0%,black 58%,rgba(0,0,0,${(.78+.22*(1-focusFade)).toFixed(4)}) 72%,rgba(0,0,0,${(.24+.76*(1-focusFade)).toFixed(4)}) 88%,rgba(0,0,0,${edgeAlpha}) 100%)`;
     }else renderer.domElement.style.maskImage='none';
     timeUniform.value=simulationTime;
     if(!controls.current.paused&&simulationTime>=nextLaunch){const free=flights.find(f=>!f.live);if(free){const cross=random()>.78;free.route=cross?domesticRoutes.length+Math.floor(random()*(commerceRoutes.length-domesticRoutes.length)):Math.floor(random()*domesticRoutes.length);free.born=simulationTime;free.duration=cross?7+random()*4:3+random()*4;free.live=true;}nextLaunch=simulationTime+.1+random()*.2;}
     let activeFlights=0;
     flights.forEach((flight,index)=>{
      const progress=(simulationTime-flight.born)/flight.duration;if(flight.live&&progress>=1){flight.live=false;arrival.setX(commerceRoutes[flight.route][1],simulationTime);arrival.needsUpdate=true;}
      const live=flight.live&&progress>=0&&progress<1;if(live)activeFlights++;const [source,destination]=commerceRoutes[flight.route],selected=controls.current.region;const emphasis=selected==='global'||networkNodes[source].market===selected||networkNodes[destination].market===selected?1:.3;
      if(!live){headAlpha.setX(index,0);(trailAlpha.array as Float32Array).fill(0,index*trailLength*2,(index+1)*trailLength*2);return;}
      const curve=routeSamples[flight.route];
      sampleRoute(curve,progress);headPosition.setXYZ(index,vector.x,vector.y,vector.z);headAlpha.setX(index,live?emphasis:0);
      for(let i=0;i<trailLength;i++)for(let end=0;end<2;end++){const amount=(i+end)/trailLength,at=progress-(1-amount)*.16,slot=(index*trailLength+i)*2+end;sampleRoute(curve,at);trailPosition.setXYZ(slot,vector.x,vector.y,vector.z);trailAlpha.setX(slot,live&&at>0?amount*amount*.95*emphasis:0);}
     });
     headPosition.needsUpdate=headAlpha.needsUpdate=trailPosition.needsUpdate=trailAlpha.needsUpdate=true;
     marketUniform.value=marketId[controls.current.region];
     ringData.forEach((ring,i)=>{const pulse=(simulationTime*.3+i*.13)%1,focused=controls.current.region==='global'||controls.current.region===ring.market;ringScale.setScalar(ring.size*(1+pulse*.65));ringMatrix.compose(ring.position,ring.quaternion,ringScale);hubRings.setMatrixAt(i,ringMatrix);ringColor.copy(ring.color).multiplyScalar((focused?1:.23)*(1-pulse));hubRings.setColorAt(i,ringColor);});
     hubRings.instanceMatrix.needsUpdate=true;if(hubRings.instanceColor)hubRings.instanceColor.needsUpdate=true;
     // Lightweight diagnostics describe the visible scene, not client data.
     renderer.render(scene,camera);if(!painted){painted=true;el.dataset.initMs=String(Math.round(performance.now()-started));setReady(true);}
     if(Math.floor(now/500)!==Number(el.dataset.sampleTick)){el.dataset.sampleTick=String(Math.floor(now/500));el.dataset.activeFlights=String(activeFlights);el.dataset.globeDiameter=String(Math.round(layout.diameter));el.dataset.globeCenterY=String(Math.round(layout.centerY));el.dataset.yaw=world.rotation.y.toFixed(3);el.dataset.zoom=zoom.toFixed(3);el.dataset.focusMarket=controls.current.region;el.dataset.interaction='drag-pan-scroll';el.dataset.dragging=String(motion.dragging);el.dataset.drawCalls=String(renderer.info.render.calls);}
    };
    teardown.push(()=>{cancelAnimationFrame(raf);intersection.disconnect();surface.removeEventListener('pointerdown',down);surface.removeEventListener('pointermove',move);surface.removeEventListener('pointerup',up);surface.removeEventListener('pointercancel',cancel);surface.removeEventListener('lostpointercapture',cancel);surface.removeEventListener('pointerleave',leave);surface.removeEventListener('keydown',key);surface.removeEventListener('contextmenu',contextMenu);finish(false);surface.dataset.enabled='false';surface.inert=true;surface.tabIndex=-1;surface.setAttribute('aria-hidden','true');document.removeEventListener('visibilitychange',visibility);});
    animate();
   }catch(error){const cancelled=disposed||abort.signal.aborted;cleanup();if(!cancelled)console.warn('Globe unavailable; showing the static fallback.',error);}
  })();
  return()=>{disposed=true;cleanup();};
 },[]);
 return <div className="globe-container" ref={host}><div className={`globe-fallback ${ready?'globe-fallback--hidden':''}`} aria-hidden="true"><img src="/globe/poster-v1.svg" alt="" width="600" height="600" fetchPriority="high"/></div><div ref={interaction} className="globe-interaction" data-enabled="false" role="group" tabIndex={-1} aria-hidden="true" aria-label="Interactive commerce globe. Drag to rotate, Shift-drag or right-drag to move. On touch screens, swipe sideways to rotate. Arrow keys turn and tilt; Home recenters the selected market." aria-describedby="globe-instructions"/></div>;
}
