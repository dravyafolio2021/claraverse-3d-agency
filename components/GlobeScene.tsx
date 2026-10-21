'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { demoOrders, type LatLon } from '@/lib/order-events';

type GlobeProps = { activeOrder:number; paused:boolean; resetKey:number; onSelectOrder:(index:number)=>void; scrollProgress:RefObject<number> };

const LAND: LatLon[][] = [
  // Approximate continental outlines for a stylised geographic point cloud.
  [[72,-168],[71,-147],[59,-133],[52,-127],[48,-123],[42,-126],[34,-118],[31,-111],[24,-109],[17,-101],[15,-92],[9,-84],[9,-77],[17,-82],[23,-97],[29,-98],[30,-106],[40,-111],[49,-97],[55,-92],[60,-81],[66,-83],[71,-100],[73,-132]],
  [[12,-80],[12,-72],[9,-63],[7,-55],[1,-50],[-4,-45],[-8,-35],[-15,-39],[-23,-43],[-30,-50],[-35,-54],[-42,-64],[-53,-69],[-56,-74],[-38,-74],[-17,-78],[0,-79]],
  [[36,-12],[44,-10],[51,-11],[56,-7],[60,-14],[70,-12],[73,10],[71,34],[63,47],[60,58],[63,73],[70,93],[70,123],[64,151],[60,171],[49,156],[43,144],[36,139],[29,121],[21,111],[14,109],[8,104],[2,106],[-8,114],[-8,105],[0,101],[7,98],[17,98],[22,87],[10,79],[8,73],[20,72],[25,64],[29,57],[27,52],[35,49],[40,43],[42,31],[37,26],[43,15],[45,9],[42,5],[37,0]],
  [[37,-17],[36,-6],[33,12],[32,32],[24,36],[13,44],[5,43],[-2,42],[-12,35],[-22,34],[-34,20],[-35,16],[-29,11],[-19,12],[-5,8],[4,-2],[5,-10],[15,-17]],
  [[-11,113],[-14,123],[-12,132],[-12,139],[-17,147],[-25,154],[-33,151],[-39,144],[-38,130],[-32,116],[-22,113]],
  [[60,-52],[65,-41],[73,-39],[80,-43],[83,-51],[79,-60],[73,-54],[69,-47]],
  [[-13,44],[-14,49],[-23,51],[-27,47],[-24,43]],
  [[6,95],[3,101],[0,107],[-7,116],[-9,121],[-7,113],[-4,105]],
  [[13,121],[18,122],[20,125],[17,127],[10,125],[6,122]],
  [[34,129],[40,135],[45,142],[44,146],[36,141]],
  [[59,-10],[57,-5],[51,1],[50,-5],[54,-10]],
];


function insidePolygon(lat: number, lon: number, polygon: LatLon[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [y1,x1] = polygon[i];
    const [y2,x2] = polygon[j];
    if ((y1 > lat) !== (y2 > lat) && lon < (x2 - x1) * (lat - y1) / (y2 - y1) + x1) inside = !inside;
  }
  return inside;
}
function deterministicRand(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export function GlobeScene({activeOrder,paused,resetKey,onSelectOrder,scrollProgress}:GlobeProps) {
  const controls = useRef({activeOrder,paused,resetKey,onSelectOrder});
  useEffect(()=>{controls.current={activeOrder,paused,resetKey,onSelectOrder};},[activeOrder,paused,resetKey,onSelectOrder]);
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [ready,setReady] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    let disposed = false;
    let cleanup = () => {};
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 680;

    (async () => {
      try {
        const [THREE,countries,commerceMask] = await Promise.all([import('three'),fetch('/globe-land.json').then(response=>{if(!response.ok)throw new Error('Country geometry unavailable');return response.json() as Promise<{name:string;polygons:LatLon[][]}[]>;}).catch(()=>[]),new Promise<HTMLCanvasElement|null>(resolve=>{
          const icon=new Image();
          icon.onload=()=>{
            const canvas=document.createElement('canvas');canvas.width=256;canvas.height=292;
            const context=canvas.getContext('2d',{willReadFrequently:true});
            if(!context){resolve(null);return;}
            context.drawImage(icon,0,0,canvas.width,canvas.height);resolve(canvas);
          };
          icon.onerror=()=>resolve(null);icon.src='/shopify-bag.svg';
        })]);
        const polygons=(countries.length?countries.flatMap(country=>country.polygons):LAND).map(polygon=>({polygon,minLat:Math.min(...polygon.map(p=>p[0])),maxLat:Math.max(...polygon.map(p=>p[0])),minLon:Math.min(...polygon.map(p=>p[1])),maxLon:Math.max(...polygon.map(p=>p[1]))}));
        if (disposed || !host.current) return;
        const el = host.current;
        const renderer = new THREE.WebGLRenderer({antialias: !mobile,alpha:true,powerPreference:'high-performance'});
        renderer.setClearColor('#080d0b',0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.7));
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('aria-hidden','true');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42,1,.1,50);
        camera.position.set(0,0,9.2);
        const globe = new THREE.Group();
        globe.position.y = mobile ? -1.20 : -1.15;
        scene.add(globe);
        const sphereRadius = 2.35;
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(sphereRadius,72,56),
          new THREE.MeshPhongMaterial({color:'#08110c',emissive:'#061008',specular:'#20331e',shininess:12})
        );
        globe.add(core);
        scene.add(new THREE.AmbientLight('#62824b',.3));
        const lit = new THREE.DirectionalLight('#baff77',.55);
        lit.position.set(-3,4,6); scene.add(lit);

        const atm = new THREE.ShaderMaterial({
          uniforms: { uTint:{value:new THREE.Color('#adff65')} },
          vertexShader: `varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,
          fragmentShader: `uniform vec3 uTint; varying vec3 n; varying vec3 eye; void main(){float fres=pow(1.0-max(0.0,dot(normalize(n),normalize(eye))),3.2);gl_FragColor=vec4(uTint,fres*0.55);}`,
          transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.FrontSide
        });
        globe.add(new THREE.Mesh(new THREE.SphereGeometry(sphereRadius+.06,72,56),atm));

        const pointAt = (lat:number,lon:number,r:number) => {
          const p=THREE.MathUtils.degToRad(lat), l=THREE.MathUtils.degToRad(lon);
          return new THREE.Vector3(r*Math.cos(p)*Math.sin(l),r*Math.sin(p),r*Math.cos(p)*Math.cos(l));
        };

        // Geographic dots are projected onto the globe, not placed on a flat image.
        const rand = deterministicRand(941);
        const coords:number[]=[]; const weights:number[]=[];
        const maxPoints = mobile ? 4800 : 9700;
        let attempts = 0;
        while(coords.length/3 < maxPoints && attempts < 120000){
          attempts++;
          const lon = rand()*360-180; const lat = rand()*151-60;
          if (!polygons.some(({polygon,minLat,maxLat,minLon,maxLon})=>lat>=minLat&&lat<=maxLat&&lon>=minLon&&lon<=maxLon&&insidePolygon(lat,lon,polygon))) continue;
          const xyz = pointAt(lat,lon,sphereRadius+.022+rand()*.013);
          coords.push(xyz.x,xyz.y,xyz.z); weights.push(rand());
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position',new THREE.Float32BufferAttribute(coords,3));
        geo.setAttribute('aRnd',new THREE.Float32BufferAttribute(weights,1));
        const dotsMat = new THREE.ShaderMaterial({
          uniforms:{ uTime:{value:0}, uDensity:{value:mobile?1.0:1.3} },
          vertexShader:`attribute float aRnd; uniform float uTime; uniform float uDensity; varying float vLight; void main(){vLight=.42+aRnd*.55+.1*sin(uTime*.9+aRnd*40.); vec4 v=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*v;gl_PointSize=min(3.,(1.15+aRnd*1.35)*uDensity*9.2/-v.z);}`,
          fragmentShader:`varying float vLight;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.50,.12,d)*vLight;gl_FragColor=vec4(.72,1.,.47,a*.95);}`,
          transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
        });
        globe.add(new THREE.Points(geo,dotsMat));

        const gridMat = new THREE.LineBasicMaterial({color:'#719c4e',opacity:.10,transparent:true,depthWrite:false});
        const ring = (lat:number|null,lon:number|null) => {
          const pts:InstanceType<typeof THREE.Vector3>[]=[];
          for(let i=0;i<=180;i++){
            const a=i/180;
            if(lat!==null) pts.push(pointAt(lat,-180+a*360,sphereRadius+.009));
            else pts.push(pointAt(-85+a*170,lon!,sphereRadius+.009));
          }
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),gridMat);
          globe.add(line);
        };
        for(let lat=-60;lat<=60;lat+=30)ring(lat,null);
        for(let lon=-180;lon<180;lon+=30)ring(null,lon);

        const countryNames:Record<string,string>={'united states':'United States of America','united kingdom':'United Kingdom','netherlands':'Netherlands','canada':'Canada','germany':'Germany','singapore':'Singapore','india':'India','france':'France','italy':'Italy','spain':'Spain','sweden':'Sweden'};
        const countryOutlines=demoOrders.map(order=>{
          const group=new THREE.Group();
          const country=countries.find(country=>country.name===countryNames[order.country]);
          country?.polygons.forEach(polygon=>{const points=polygon.map(([lat,lon])=>pointAt(lat,lon,sphereRadius+.035));group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:'#cbff65',transparent:true,opacity:.8})));});
          globe.add(group);return group;
        });
        const arcs:{base:InstanceType<typeof THREE.Line>, flowing:InstanceType<typeof THREE.Line>, material:InstanceType<typeof THREE.ShaderMaterial>, head:InstanceType<typeof THREE.Mesh>, positions:InstanceType<typeof THREE.Vector3>[]}[]=[];
        const pickers:InstanceType<typeof THREE.Mesh>[]=[];
        const markers:InstanceType<typeof THREE.Mesh>[]=[];
        for(const [routeIndex,route] of demoOrders.entries()){
          const aa=pointAt(route.from[0],route.from[1],1).normalize();
          const bb=pointAt(route.to[0],route.to[1],1).normalize();
          const points:InstanceType<typeof THREE.Vector3>[]=[];
          const progress:number[]=[];
          for(let i=0;i<=100;i++){
            const t=i/100;
            const dir=aa.clone().lerp(bb,t).normalize();
            const altitude = .035 + Math.sin(t*Math.PI)*.09;
            points.push(dir.multiplyScalar(sphereRadius+altitude));
            progress.push(t);
          }
          const arcGeo=new THREE.BufferGeometry().setFromPoints(points);
          arcGeo.setAttribute('aProgress',new THREE.Float32BufferAttribute(progress,1));
          const base=new THREE.Line(arcGeo,new THREE.LineBasicMaterial({color:'#c4ff71',opacity:.16,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
          const material=new THREE.ShaderMaterial({
            uniforms:{uTime:{value:0},uSpeed:{value:.16+routeIndex*.012},uShift:{value:routeIndex*.14},uActive:{value:routeIndex===activeOrder?1:0}},
            vertexShader:'attribute float aProgress; varying float vProgress; void main(){vProgress=aProgress;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
            fragmentShader:`varying float vProgress;uniform float uTime;uniform float uSpeed;uniform float uShift;uniform float uActive;void main(){float head=fract(uTime*uSpeed+uShift);float behind=mod(head-vProgress+1.,1.);float intensity=(1.-smoothstep(0.,.31,behind))*.8;intensity*=smoothstep(.0,.025,vProgress)*(1.-smoothstep(.96,1.,vProgress));gl_FragColor=vec4(.75,1.,.34,intensity*(.22+.78*uActive));}`,
            transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
          });
          const flowing=new THREE.Line(arcGeo,material);
          const head=new THREE.Mesh(new THREE.SphereGeometry(.028,8,6),new THREE.MeshBasicMaterial({color:'#d8ff91'}));
          for(const [endpoint,location] of [route.from,route.to].entries()){
            const marker=new THREE.Mesh(new THREE.SphereGeometry(endpoint===1?.045:.035,12,8),new THREE.MeshBasicMaterial({color:endpoint===1?'#dcffac':'#8da887'}));
            marker.position.copy(pointAt(location[0],location[1],sphereRadius+.05));
            globe.add(marker);markers.push(marker);
            const hitTarget=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
            hitTarget.position.copy(marker.position);hitTarget.userData.orderIndex=routeIndex;
            globe.add(hitTarget);pickers.push(hitTarget);
          }
          globe.add(base,flowing,head); arcs.push({base,flowing,material,head,positions:points});
        }

        // A small halo under active routes makes the sphere feel luminous.
        const haloCanvas = document.createElement('canvas');
        haloCanvas.width = haloCanvas.height = 64;
        const haloContext = haloCanvas.getContext('2d')!;
        const haloGradient = haloContext.createRadialGradient(32,32,0,32,32,32);
        haloGradient.addColorStop(0,'rgba(255,255,255,1)');
        haloGradient.addColorStop(1,'rgba(255,255,255,0)');
        haloContext.fillStyle = haloGradient;
        haloContext.fillRect(0,0,64,64);
        const haloTexture = new THREE.CanvasTexture(haloCanvas);
        const haze = new THREE.Sprite(new THREE.SpriteMaterial({map:haloTexture,color:'#a3e648',opacity:.045,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
        haze.scale.set(7.6,7.6,1); haze.position.set(0,-1.1,-2.7);scene.add(haze);

        const resize=()=>{
          if(!el.isConnected)return;
          const w=Math.max(1,el.clientWidth),h=Math.max(1,el.clientHeight);
          renderer.setSize(w,h,false); camera.aspect=w/h;
          camera.fov=42;
          camera.position.z=Math.max(9.2,sphereRadius/(Math.tan(THREE.MathUtils.degToRad(21))*camera.aspect)*1.15);
          camera.updateProjectionMatrix();
        };
        const observer=new ResizeObserver(resize); observer.observe(el);resize();
        let raf=0; let visible = document.visibilityState==='visible',inView=true;
        const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;});intersection.observe(el);
        let yaw=0,pitch=0,dragging=false,startX=0,startY=0,lastX=0,lastY=0,moved=false;
        let selected=-1,lastReset=resetKey,targetYaw=0,animationTime=0;
        const raycaster=new THREE.Raycaster();
        const down=(e:PointerEvent)=>{
          if(e.button!==0)return;
          controls.current.onSelectOrder(controls.current.activeOrder);
          dragging=true;moved=false;startX=lastX=e.clientX;startY=lastY=e.clientY;
          el.setPointerCapture(e.pointerId);el.classList.add('is-dragging');
        };
        const move=(e:PointerEvent)=>{
          if(!dragging)return;
          const dx=e.clientX-lastX,dy=e.clientY-lastY;
          if(Math.hypot(e.clientX-startX,e.clientY-startY)>6)moved=true;
          yaw+=dx*.006;
          if(e.pointerType!=='touch')pitch=THREE.MathUtils.clamp(pitch+dy*.003,-.5,.5);
          lastX=e.clientX;lastY=e.clientY;
        };
        const release=(e:PointerEvent)=>{
          if(!dragging)return;
          dragging=false;el.classList.remove('is-dragging');
          if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);
          if(moved)return;
          const bounds=el.getBoundingClientRect();
          raycaster.setFromCamera(new THREE.Vector2((e.clientX-bounds.left)/bounds.width*2-1,-(e.clientY-bounds.top)/bounds.height*2+1),camera);
          const hit=raycaster.intersectObjects([core,...pickers],false)[0];
          if(hit&&typeof hit.object.userData.orderIndex==='number')controls.current.onSelectOrder(hit.object.userData.orderIndex);
        };
        const cancel=()=>{dragging=false;el.classList.remove('is-dragging');};
        const keyboard=(e:KeyboardEvent)=>{
          if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();controls.current.onSelectOrder(controls.current.activeOrder);yaw+=e.key==='ArrowLeft'?-.25:.25;}
          if(e.key==='Home'){e.preventDefault();yaw=0;pitch=0;}
        };
        const onVisibility=()=>{visible=document.visibilityState==='visible';};
        el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);
        el.addEventListener('pointerup',release);el.addEventListener('pointercancel',cancel);el.addEventListener('keydown',keyboard);
        document.addEventListener('visibilitychange',onVisibility);
        const clock=new THREE.Clock();
        let lastFrame=0,lastElapsed=0;
        const animate=()=>{
          if(disposed)return;
          raf=requestAnimationFrame(animate);
          if(!visible||!inView)return;
          const elapsed=clock.getElapsedTime();
          if(elapsed-lastFrame<(mobile?1/30:1/60))return;
          lastFrame=elapsed;
          const delta=Math.min(.1,elapsed-lastElapsed);lastElapsed=elapsed;
          if(!controls.current.paused)animationTime+=delta;
          const t=animationTime;
          if(selected!==controls.current.activeOrder){
            selected=controls.current.activeOrder;yaw=0;pitch=0;
            targetYaw=-THREE.MathUtils.degToRad(demoOrders[selected].to[1]);
            targetYaw=globe.rotation.y+Math.atan2(Math.sin(targetYaw-globe.rotation.y),Math.cos(targetYaw-globe.rotation.y));
          }
          if(lastReset!==controls.current.resetKey){yaw=0;pitch=0;lastReset=controls.current.resetKey;}
          const easing=reduced?1:1-Math.exp(-delta*5);
          globe.rotation.y=THREE.MathUtils.lerp(globe.rotation.y,targetYaw+yaw,easing);
          globe.rotation.x=THREE.MathUtils.lerp(globe.rotation.x,-.10+pitch,easing);
          const scroll=Math.min(1,Math.max(0,scrollProgress.current/.82));
          const rise=scroll*scroll*(3-2*scroll);
          const viewHeight=2*camera.position.z*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
          globe.position.y=THREE.MathUtils.lerp(-viewHeight*.57,-viewHeight*.04,rise);
          globe.scale.setScalar(THREE.MathUtils.lerp(1.08,.94,rise));
          dotsMat.uniforms.uTime.value=t;
          countryOutlines.forEach((outline,index)=>{outline.visible=index===selected;});
          for(const [index,arc] of arcs.entries()){
            const active=index===selected;
            arc.material.uniforms.uTime.value=t;
            arc.material.uniforms.uActive.value=active?1:0;
            (arc.base.material as InstanceType<typeof THREE.LineBasicMaterial>).opacity=active?.55:.07;
            arc.head.scale.setScalar(active?1.7:.65);
            markers[index*2+1].scale.setScalar(active?1.5+Math.sin(t*3)*.2:.8);
            const h=((t*arc.material.uniforms.uSpeed.value+arc.material.uniforms.uShift.value)%1+1)%1;
            const i=Math.min(99,Math.floor(h*100));const fraction=h*100-i;
            arc.head.position.copy(arc.positions[i]).lerp(arc.positions[i+1],fraction);
          }
          renderer.render(scene,camera);
          if(label.current){
            const point=markers[selected*2+1].getWorldPosition(new THREE.Vector3());
            const normal=point.clone().sub(globe.getWorldPosition(new THREE.Vector3())).normalize();
            const front=normal.dot(camera.position.clone().sub(point).normalize())>.08;
            point.project(camera);
            label.current.style.left=`${(point.x*.5+.5)*el.clientWidth}px`;
            const projectedY=(-point.y*.5+.5)*el.clientHeight;
            const below=projectedY<el.clientHeight*.5;
            label.current.dataset.placement=below?'below':'above';
            label.current.style.top=`${projectedY+(below?18:-18)}px`;
            label.current.style.opacity=front&&scrollProgress.current>.22?'1':'0';
          }
        };
        animate();setReady(true);
        cleanup=()=>{
          cancelAnimationFrame(raf); observer.disconnect();intersection.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',release);el.removeEventListener('pointercancel',cancel);el.removeEventListener('keydown',keyboard);document.removeEventListener('visibilitychange',onVisibility);
          scene.traverse((obj)=>{
            if('geometry' in obj && obj.geometry instanceof THREE.BufferGeometry)obj.geometry.dispose();
            if('material' in obj){const m=obj.material as InstanceType<typeof THREE.Material>|InstanceType<typeof THREE.Material>[]; (Array.isArray(m)?m:[m]).forEach(mat=>mat.dispose());}
          });
          haloTexture.dispose();renderer.dispose();renderer.domElement.remove();
        };
      }catch(e){ console.warn('WebGL globe unavailable; displaying CSS fallback.',e); }
    })();
    return ()=>{ disposed=true;cleanup(); };
  }, []);

  return <div className="globe-container" ref={host} role="group" tabIndex={0} aria-label="Interactive globe of demo store orders. Use left and right arrow keys to rotate, or Home to reset." aria-describedby="globe-instructions">
    <div ref={label} className="globe-location" aria-hidden="true"><span>#{1001+activeOrder} · customer destination</span><strong>{demoOrders[activeOrder].country}</strong><small>{demoOrders[activeOrder].city} · {new Intl.NumberFormat('en-US',{style:'currency',currency:demoOrders[activeOrder].market,currencyDisplay:'narrowSymbol',maximumFractionDigits:0}).format(demoOrders[activeOrder].value)}</small></div>
    <div className={`globe-fallback ${ready?'globe-fallback--hidden':''}`} aria-hidden="true"><div className="globe-fallback__surface"/><div className="globe-fallback__orbit globe-fallback__orbit--a"/><div className="globe-fallback__orbit globe-fallback__orbit--b"/><div className="globe-fallback__orbit globe-fallback__orbit--c"/></div>
  </div>;
}
